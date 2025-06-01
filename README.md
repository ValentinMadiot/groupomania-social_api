<div align="center">  
  <a href="https://groupomania-vm.vercel.app/signup" target="_blank">  
    <img src=".docs/preview.png" alt="Aperçu du projet Groupomania">  
  </a>
  </br></br>  
  <h3 align="center">📱 Groupomania - Projet Scolaire</h3>  
</div>

## <br /> 📌 Sommaire

&nbsp;&nbsp;&nbsp; 🎨 &nbsp; [**Introduction**](#introduction)<br />
&nbsp;&nbsp;&nbsp; 🛠️ &nbsp; [**Technologies**](#technologies)<br />
&nbsp;&nbsp;&nbsp; 🎯 &nbsp; [**Fonctionnalités**](#fonctionnalités)<br />
&nbsp;&nbsp;&nbsp; 🚧 &nbsp; [**Mise à Jour**](#upgrade)<br />
&nbsp;&nbsp;&nbsp; 🚀 &nbsp; [**Installation**](#installation)

## <br /> <a name="introduction">🎨 Introduction</a>

Ce projet consiste en la création d’un **réseau social d’entreprise** pour les employés de Groupomania, avec une interface moderne, un système d’authentification sécurisé et la gestion des publications multimédia.

Le projet repose sur une stack **MERN** complète :

- **MongoDB** pour la base de données
- **Express** pour le serveur et les routes API
- **React** pour l’interface utilisateur
- **Node.js** pour la logique backend

Le **backend** expose une **API REST** permettant l’inscription, la connexion (JWT), ainsi que les opérations **CRUD** sur les publications, avec gestion des rôles (utilisateur/admin) et des likes.

Le **frontend** React consomme cette API, permet de publier du texte et des images, de modifier ou supprimer ses posts, et de naviguer dans un fil d’actualité responsive.

Les **images** sont gérées dynamiquement : stockées en local pendant le développement, et sur **Cloudinary** en production pour des performances et une gestion optimales.

📂 Pour plus de détails, consultez le [dossier](.docs/).

## <br /> <a name="technologies">🛠️ Technologies</a>

### Backend

- Node.js, Express, MongoDB (Mongoose)
- Authentification JWT (jsonwebtoken + bcrypt)
- Upload d’images : `Multer` + `Cloudinary` (prod) ou disque local (dev)
- Sécurité : Helmet, CORS, password-validator, validator

### Frontend

- React, React Router, Context API
- Formulaires avec feedback utilisateur (erreurs précises côté client et serveur)
- Responsive design

### Déploiement

- Render (API) : https://groupomania-social-api.onrender.com
- Vercel (Frontend) : https://groupomania-vm.vercel.app

## <br /> <a name="fonctionnalités">🎯 Fonctionnalités</a>

- Authentification (JWT) : Inscription, Connexion, Session persistante
- Création de post : Texte + Image
- Modification & Suppression d'un post
- Like unique par utilisateur
- Nettoyage automatique des images supprimés (sur Cloudinary ou en local)
- Feedback utilisateur en temps réel (ex: email invalide, mdp faible)
- Rôle Admin : Suppression & édition de n’importe quel post
- Détection environnement : `development` ou `production`

## <br /> <a name="upgrade">🚧 Mise à Jour</a>

### Gestion intelligente des images

- Mode développement : upload local dans `/public/images` avec suppression automatique lors des updates ou deletes
- Mode production : upload sur Cloudinary (CDN, compression, preview dynamique, nettoyage automatique)

### Expérience utilisateur optimisée

- Messages d’erreur explicites affichés côté backend et frontend
- Preview dynamique des images lors de la modification d’un post

### Architecture claire et maintenable

- `/api/` → API Express + MongoDB
- `/client/` → Application React

### Déploiement cloud optimisé

- Render pour le backend
- Vercel pour le frontend

## <br /> <a name="installation">🚀 Installation</a>

### ✅ Pré-requis

- 🛠️ **[Git](https://git-scm.com/)**
- 🔧 **[Node.js](https://nodejs.org/fr/)**
- 📦 **[npm](https://www.npmjs.com/)**
- 🍃 **[MongoDB](https://www.mongodb.com/)** (Atlas ou local)

### 📥 Cloner le projet

```bash
git clone https://github.com/ValentinMadiot/groupomania-social_api.git
```

### 📝 Configuration des variables d’environnement

#### Backend (API)

Renommer `.env.exemple` en `.env`

```env
# PORT
PORT=4200

# IDENTIFIANT BASE DE DONNEES (MongoDB)
MONGODB_URI_DEV=
MONGODB_URI_PROD=

# PASSWORD JWT (JSON Web Token)
JWT_TOKEN=
JWT_TIME=24h

# IDENTIFIANT CLOUDINARY (Production Uniquement)
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

#### Frontend (Client)

Renommer `.env.exemple` en `.env`

```env
REACT_APP_API_URL=http://localhost:4200
REACT_APP_PUBLIC_FOLDER=http://localhost:4200/public/images/
```

### ▶️ Lancer l’application

#### Backend (port : 4200)

```bash
cd api
npm install
npm start
```

#### Frontend (port : 3000)

```bash
cd client
npm install
npm start
```
