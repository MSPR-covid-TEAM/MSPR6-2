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
git clone https://github.com/MSPR-covid-TEAM/MSPR6-2.git
cd MSPR6-2
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

### pour lancer en local vous devez modifier la variable présente dans le docker-compose.yml 

```bash
CONFIG: development  # development (en local) ou production ( pour push sur le main )
```

### 1. Build les images

```bash
docker-compose up --build
```

### 2. Lancer les conteneurs

```bash
docker-compose up
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

---

## 💬 Auteurs

- 📅 Année 2025 – dans le cadre du MSPR
