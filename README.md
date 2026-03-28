# 🏢 ImmoGest — Plateforme de Gestion Immobilière

## 📋 Description
ImmoGest est une plateforme web de gestion immobilière permettant aux propriétaires de gérer leurs biens, locataires, contrats, loyers et demandes de maintenance.

## 🚀 Technologies utilisées
- **Frontend** : React.js + Vite + CSS
- **Backend** : Node.js + Express.js
- **Base de données** : MySQL
- **Authentification** : JWT (JSON Web Token)

## ✨ Fonctionnalités
- ✅ Authentification (inscription / connexion) avec JWT
- ✅ Gestion des biens immobiliers (CRUD)
- ✅ Gestion des locataires
- ✅ Gestion des contrats de bail
- ✅ Suivi des paiements de loyers
- ✅ Demandes de maintenance
- ✅ Espace locataire dédié
- ✅ Documents (baux, quittances)

## ⚙️ Installation

### Prérequis
- Node.js
- MySQL
- npm

### 1. Cloner le projet
```bash
git clone https://github.com/anja-RAFANOMEZANTSOA/immogest.git
cd immogest
```

### 2. Backend
```bash
cd backend
npm install
```

Créez un fichier `.env` dans le dossier `backend` :
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=immogest
JWT_SECRET=immogest_secret_super_longue_cle_2026
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Démarrez le backend :
```bash
node server.js
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Base de données
Importez le fichier SQL dans MySQL via DBeaver ou phpMyAdmin.

## 🌐 Accès
- Frontend : http://localhost:5173
- Backend API : http://localhost:5000/api

## 👤 Auteur
**RAFANOMEZANTSOA Anja**