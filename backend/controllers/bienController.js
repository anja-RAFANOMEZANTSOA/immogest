const db = require('../config/db');

const getBiens = async (req, res) => {
  try {
    const [biens] = await db.query(
      'SELECT * FROM biens WHERE proprietaire_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(biens);
  } catch (error) {
    console.error('Erreur getBiens :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const getBienById = async (req, res) => {
  try {
    const [biens] = await db.query(
      'SELECT * FROM biens WHERE id = ? AND proprietaire_id = ?',
      [req.params.id, req.user.id]
    );
    if (biens.length === 0) {
      return res.status(404).json({ message: 'Bien non trouvé.' });
    }
    res.json(biens[0]);
  } catch (error) {
    console.error('Erreur getBienById :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const createBien = async (req, res) => {
  try {
    const {
      titre, adresse, ville, type,
      surface, loyer, charges, description
    } = req.body;

    if (!titre || !adresse || !ville || !type || !loyer) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const [result] = await db.query(
      `INSERT INTO biens
        (proprietaire_id, titre, adresse, ville, type, surface, loyer, charges, statut, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'disponible', ?)`,
      [req.user.id, titre, adresse, ville, type,
       surface || null, loyer, charges || 0, description || null]
    );

    res.status(201).json({
      message: 'Bien créé avec succès !',
      bienId: result.insertId
    });
  } catch (error) {
    console.error('Erreur createBien :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const updateBien = async (req, res) => {
  try {
    const {
      titre, adresse, ville, type,
      surface, loyer, charges, statut, description
    } = req.body;

    const [check] = await db.query(
      'SELECT id FROM biens WHERE id = ? AND proprietaire_id = ?',
      [req.params.id, req.user.id]
    );
    if (check.length === 0) {
      return res.status(404).json({ message: 'Bien non trouvé.' });
    }

    await db.query(
      `UPDATE biens SET
        titre=?, adresse=?, ville=?, type=?,
        surface=?, loyer=?, charges=?, statut=?, description=?
       WHERE id = ?`,
      [titre, adresse, ville, type,
       surface, loyer, charges, statut, description,
       req.params.id]
    );

    res.json({ message: 'Bien mis à jour avec succès !' });
  } catch (error) {
    console.error('Erreur updateBien :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const deleteBien = async (req, res) => {
  try {
    const [contrats] = await db.query(
      "SELECT id FROM contrats WHERE bien_id = ? AND statut = 'actif'",
      [req.params.id]
    );
    if (contrats.length > 0) {
      return res.status(400).json({
        message: 'Impossible de supprimer : ce bien a un contrat actif.'
      });
    }

    const [result] = await db.query(
      'DELETE FROM biens WHERE id = ? AND proprietaire_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bien non trouvé.' });
    }

    res.json({ message: 'Bien supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur deleteBien :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getBiens, getBienById, createBien, updateBien, deleteBien };