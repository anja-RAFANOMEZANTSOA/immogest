const db = require('../config/db');

const getLocataires = async (req, res) => {
  try {
const [locataires] = await db.query(
  `SELECT l.*, u.nom, u.prenom, u.email, u.telephone
   FROM locataires l
   JOIN utilisateurs u ON l.utilisateur_id = u.id
   ORDER BY u.nom ASC`
);
    );
    res.json(locataires);
  } catch (error) {
    console.error('Erreur getLocataires :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const getLocataireById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT l.*, u.nom, u.prenom, u.email, u.telephone
       FROM locataires l
       JOIN utilisateurs u ON l.utilisateur_id = u.id
       WHERE l.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Locataire non trouvé.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur getLocataireById :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const createLocataire = async (req, res) => {
  try {
    const {
      nom, prenom, email, telephone,
      numero_cni, date_naissance, profession, revenu_mensuel,
      mot_de_passe
    } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const bcrypt = require('bcryptjs');

    const [existing] = await db.query(
      'SELECT id FROM utilisateurs WHERE email = ?', [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);

    const [userResult] = await db.query(
      `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, telephone)
       VALUES (?, ?, ?, ?, 'locataire', ?)`,
      [nom, prenom, email, hash, telephone || null]
    );

    const [locResult] = await db.query(
      `INSERT INTO locataires (utilisateur_id, numero_cni, date_naissance, profession, revenu_mensuel)
       VALUES (?, ?, ?, ?, ?)`,
      [userResult.insertId, numero_cni || null,
       date_naissance || null, profession || null,
       revenu_mensuel || null]
    );

    res.status(201).json({
      message: 'Locataire créé avec succès !',
      locataireId: locResult.insertId,
      userId: userResult.insertId
    });
  } catch (error) {
    console.error('Erreur createLocataire :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { getLocataires, getLocataireById, createLocataire };