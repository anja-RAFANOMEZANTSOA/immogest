const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const db     = require('../config/db');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, role, telephone } = req.body;
    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    }
    const [existing] = await db.query(
      'SELECT id FROM utilisateurs WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    const hash = await bcrypt.hash(mot_de_passe, 10);
    const [result] = await db.query(
      `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, telephone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nom, prenom, email, hash, role || 'proprietaire', telephone || null]
    );
    res.status(201).json({
      message: 'Compte créé avec succès !',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Erreur register :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    if (!email || !mot_de_passe) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    const [users] = await db.query(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    );
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({
      message: 'Connexion réussie !',
      token,
      user: {
        id:     user.id,
        nom:    user.nom,
        prenom: user.prenom,
        email:  user.email,
        role:   user.role
      }
    });
  } catch (error) {
    console.error('Erreur login :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, nom, prenom, email, role, telephone, created_at FROM utilisateurs WHERE id = ?',
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error('Erreur getProfile :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { register, login, getProfile };
