# 🌍 MSPR - Analyse et Prédiction COVID avec Docker, Node.js & Angular

> Projet de fin d'études – Containerisation d'une application Angular + Express.js + MySQL  
> Inclut API backend, interface frontend, tests automatisés, CI GitHub Actions, sauvegarde BDD

---

## 📁 Structure du projet

```
.
├── backend/              # API Express (Node.js)
│   ├── routes/
│   ├── tests/
│   ├── Dockerfile
│   └── .env              # infos BDD (non commit)
├── frontend/             # App Angular
│   ├── src/
│   ├── angular.json
│   └── Dockerfile
├── backups/              # Fichiers .sql de sauvegarde
├── scripts/
│   ├── backup.sh
│   └── restore.sh
├── docs/                 # Documentation technique
└── .github/workflows/ci.yml # CI GitHub Actions
```

---

## 🚀 Installation manuelle (dev local)

### 1. Cloner le repo

```bash
git clone https://github.com/tonutilisateur/tonprojet.git
cd tonprojet
```

### 2. Lancer le backend

```bash
cd backend
npm install
node app.js
```

> ✅ L'API tourne sur `http://localhost:3000`

### 3. Lancer le frontend

```bash
cd frontend
npm install
ng serve
```

> ✅ L'app Angular est sur `http://localhost:4200`

---

## 🐳 Lancer avec Docker (API + frontend)

### 1. Build les images

```bash
docker build -t mspr-backend ./backend
docker build -t mspr-frontend ./frontend
```

### 2. Lancer les conteneurs

```bash
docker run -d -p 3000:3000 mspr-backend
docker run -d -p 4200:80 mspr-frontend
```

---

## ✅ Tests backend

```bash
cd backend
npm test
```

> 📦 Les tests utilisent `mocha`, `chai` et `supertest`

---

## 🔁 Sauvegarde & restauration de la base

**Base MySQL distante (Alwaysdata)**

### Sauvegarder :

```bash
./scripts/backup.sh
```

> Crée un fichier `.sql` dans `/backups/`

### Restaurer :

```bash
./scripts/restore.sh nom_du_fichier.sql
```

---

## 🧪 CI/CD - GitHub Actions

- À chaque `push` ou `PR` sur `main` :
  - `npm install`
  - `npm test`
  - `ng build`
- Voir `.github/workflows/ci.yml`

---

## 📦 Variables d’environnement (.env)

> ⚠️ Ce fichier ne doit **jamais** être versionné (`.gitignore` déjà configuré)

```env
DB_HOST=mysql-mspr.alwaysdata.net
DB_PORT=3306
DB_USER=mspr
DB_PASSWORD=******
DB_MSPR_CLEAN=mspr_clean
DB_MSPR_BDD=mspr_bdd
```

---

## 💬 Auteurs

- 🎓 Projet réalisé par [Ton Nom]
- 📅 Année 2025 – dans le cadre du MSPR 6.2