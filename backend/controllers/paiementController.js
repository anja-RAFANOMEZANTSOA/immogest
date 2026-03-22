const db = require('../config/db');

const getPaiements = async (req, res) => {
  try {
    const [paiements] = await db.query(
      `SELECT p.*, c.loyer AS loyer_contrat,
              b.titre AS bien_titre,
              u.nom, u.prenom
       FROM paiements p
       JOIN contrats c ON p.contrat_id = c.id
       JOIN biens b ON c.bien_id = b.id
       JOIN locataires l ON c.locataire_id = l.id
       JOIN utilisateurs u ON l.utilisateur_id = u.id
       WHERE b.proprietaire_id = ?
       ORDER BY p.date_paiement DESC`,
      [req.user.id]
    );
    res.json(paiements);
  } catch (error) {
    console.error('Erreur getPaiements :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const createPaiement = async (req, res) => {
  try {
    const { contrat_id, montant, date_paiement, mois_concerne } = req.body;

    if (!contrat_id || !montant || !date_paiement || !mois_concerne) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const [contrat] = await db.query(
      `SELECT c.id FROM contrats c
       JOIN biens b ON c.bien_id = b.id
       WHERE c.id = ? AND b.proprietaire_id = ?`,
      [contrat_id, req.user.id]
    );
    if (contrat.length === 0) {
      return res.status(403).json({ message: 'Contrat non autorisé.' });
    }

    const [result] = await db.query(
      `INSERT INTO paiements (contrat_id, montant, date_paiement, mois_concerne, statut)
       VALUES (?, ?, ?, ?, 'paye')`,
      [contrat_id, montant, date_paiement, mois_concerne]
    );

    res.status(201).json({
      message: 'Paiement enregistré avec succès !',
      paiementId: result.insertId
    });
  } catch (error) {
    console.error('Erreur createPaiement :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const getMesPaiements = async (req, res) => {
  try {
    const [paiements] = await db.query(
      `SELECT p.*, b.titre AS bien_titre, b.adresse
       FROM paiements p
       JOIN contrats c ON p.contrat_id = c.id
       JOIN biens b ON c.bien_id = b.id
       JOIN locataires l ON c.locataire_id = l.id
       WHERE l.utilisateur_id = ?
       ORDER BY p.date_paiement DESC`,
      [req.user.id]
    );
    res.json(paiements);
  } catch (error) {
    console.error('Erreur getMesPaiements :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getPaiements, createPaiement, getMesPaiements };