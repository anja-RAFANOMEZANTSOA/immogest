CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('proprietaire', 'locataire', 'admin') DEFAULT 'proprietaire',
  telephone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS biens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proprietaire_id INT NOT NULL,
  titre VARCHAR(200) NOT NULL,
  adresse VARCHAR(300),
  ville VARCHAR(100),
  type ENUM('appartement', 'maison', 'local') DEFAULT 'appartement',
  surface DECIMAL(10,2),
  loyer DECIMAL(10,2) NOT NULL,
  charges DECIMAL(10,2) DEFAULT 0,
  statut ENUM('disponible', 'loue', 'travaux') DEFAULT 'disponible',
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proprietaire_id) REFERENCES utilisateurs(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS locataires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL UNIQUE,
  numero_cni VARCHAR(50),
  date_naissance DATE,
  profession VARCHAR(100),
  revenu_mensuel DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contrats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bien_id INT NOT NULL,
  locataire_id INT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE,
  loyer DECIMAL(10,2) NOT NULL,
  depot_garantie DECIMAL(10,2),
  statut ENUM('actif', 'termine', 'resilie') DEFAULT 'actif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bien_id) REFERENCES biens(id) ON DELETE RESTRICT,
  FOREIGN KEY (locataire_id) REFERENCES locataires(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS paiements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contrat_id INT NOT NULL,
  montant DECIMAL(10,2) NOT NULL,
  date_paiement DATE NOT NULL,
  mois_concerne DATE NOT NULL,
  statut ENUM('paye', 'en_attente', 'en_retard') DEFAULT 'paye',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contrat_id) REFERENCES contrats(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS maintenance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bien_id INT NOT NULL,
  locataire_id INT,
  titre VARCHAR(200) NOT NULL,
  description TEXT,
  priorite ENUM('basse', 'moyenne', 'haute') DEFAULT 'moyenne',
  statut ENUM('en_attente', 'en_cours', 'resolu') DEFAULT 'en_attente',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_resolution TIMESTAMP NULL,
  FOREIGN KEY (bien_id) REFERENCES biens(id) ON DELETE CASCADE,
  FOREIGN KEY (locataire_id) REFERENCES locataires(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bien_id INT NOT NULL,
  type ENUM('bail', 'quittance', 'etat_lieux', 'autre') DEFAULT 'autre',
  nom_fichier VARCHAR(300),
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bien_id) REFERENCES biens(id) ON DELETE CASCADE
);