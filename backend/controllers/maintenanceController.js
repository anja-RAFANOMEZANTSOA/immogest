const db = require('../config/db');

const getMaintenance = async (req, res) => {
  try {
    let query, params;

    if (req.user.role === 'proprietaire') {
      query = `
  SELECT m.*, b.titre AS bien_titre,
         u.nom, u.prenom
  FROM maintenance m
  JOIN biens b ON m.bien_id = b.id
  LEFT JOIN locataires l ON m.locataire_id = l.id
  LEFT JOIN utilisateurs u ON l.utilisateur_id = u.id
  WHERE b.proprietaire_id = ?
  ORDER BY m.date_creation DESC`;
      params = [req.user.id];
    } else {
      query = `
        SELECT m.*, b.titre AS bien_titre
        FROM maintenance m
        JOIN biens b ON m.bien_id = b.id
        JOIN locataires l ON m.locataire_id = l.id
        WHERE l.utilisateur_id = ?
        ORDER BY m.date_creation DESC`;
      params = [req.user.id];
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erreur getMaintenance :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};
const createMaintenance = async (req, res) => {
  try {
    const { bien_id, titre, description, priorite, locataire_id } = req.body;
    if (!bien_id || !titre) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    let locataireId = locataire_id || null;

    if (req.user.role === 'locataire') {
      const [locataire] = await db.query(
        'SELECT id FROM locataires WHERE utilisateur_id = ?',
        [req.user.id]
      );
      if (locataire.length === 0) {
        return res.status(403).json({ message: 'Profil locataire non trouvé.' });
      }
      locataireId = locataire[0].id;
    }

    const [result] = await db.query(
      `INSERT INTO maintenance
        (bien_id, locataire_id, titre, description, priorite, statut)
       VALUES (?, ?, ?, ?, ?, 'en_attente')`,
      [bien_id, locataireId, titre, description || null, priorite || 'moyenne']
    );
    res.status(201).json({
      message: 'Demande envoyée avec succès !',
      maintenanceId: result.insertId
    });
  } catch (error) {
    console.error('Erreur createMaintenance :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const updateStatut = async (req, res) => {
  try {
    const { statut } = req.body;
    const statutsValides = ['en_attente', 'en_cours', 'resolu'];

    if (!statutsValides.includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide.' });
    }

    const dateResolution = statut === 'resolu' ? new Date() : null;

    await db.query(
      'UPDATE maintenance SET statut = ?, date_resolution = ? WHERE id = ?',
      [statut, dateResolution, req.params.id]
    );

    res.json({ message: 'Statut mis à jour.' });
  } catch (error) {
    console.error('Erreur updateStatut :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getMaintenance, createMaintenance, updateStatut };