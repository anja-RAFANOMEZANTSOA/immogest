const db = require('../config/db');

const getContrats = async (req, res) => {
  try {
    const [contrats] = await db.query(
      `SELECT c.*, b.titre AS bien_titre, b.adresse,
              u.nom, u.prenom, u.email
       FROM contrats c
       JOIN biens b ON c.bien_id = b.id
       JOIN locataires l ON c.locataire_id = l.id
       JOIN utilisateurs u ON l.utilisateur_id = u.id
       WHERE b.proprietaire_id = ?
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );
    res.json(contrats);
  } catch (error) {
    console.error('Erreur getContrats :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const createContrat = async (req, res) => {
  try {
    const {
      bien_id, locataire_id, date_debut,
      date_fin, loyer, depot_garantie
    } = req.body;

    if (!bien_id || !locataire_id || !date_debut || !loyer) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const [bien] = await db.query(
      'SELECT id FROM biens WHERE id = ? AND proprietaire_id = ?',
      [bien_id, req.user.id]
    );
    if (bien.length === 0) {
      return res.status(403).json({ message: 'Ce bien ne vous appartient pas.' });
    }

    const [actif] = await db.query(
      "SELECT id FROM contrats WHERE bien_id = ? AND statut = 'actif'",
      [bien_id]
    );
    if (actif.length > 0) {
      return res.status(400).json({
        message: 'Ce bien a déjà un contrat actif.'
      });
    }

    const [result] = await db.query(
      `INSERT INTO contrats
        (bien_id, locataire_id, date_debut, date_fin, loyer, depot_garantie, statut)
       VALUES (?, ?, ?, ?, ?, ?, 'actif')`,
      [bien_id, locataire_id, date_debut,
       date_fin || null, loyer, depot_garantie || null]
    );

    await db.query(
      "UPDATE biens SET statut = 'loue' WHERE id = ?",
      [bien_id]
    );

    res.status(201).json({
      message: 'Contrat créé avec succès !',
      contratId: result.insertId
    });
  } catch (error) {
    console.error('Erreur createContrat :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const terminerContrat = async (req, res) => {
  try {
    const [contrat] = await db.query(
      `SELECT c.*, b.proprietaire_id FROM contrats c
       JOIN biens b ON c.bien_id = b.id
       WHERE c.id = ?`,
      [req.params.id]
    );
    if (contrat.length === 0) {
      return res.status(404).json({ message: 'Contrat non trouvé.' });
    }
    if (contrat[0].proprietaire_id !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit.' });
    }

    await db.query(
      "UPDATE contrats SET statut = 'termine' WHERE id = ?",
      [req.params.id]
    );

    await db.query(
      "UPDATE biens SET statut = 'disponible' WHERE id = ?",
      [contrat[0].bien_id]
    );

    res.json({ message: 'Contrat terminé. Bien remis en disponible.' });
  } catch (error) {
    console.error('Erreur terminerContrat :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getContrats, createContrat, terminerContrat };
