# MSPR6-2 - 

## Pré-requis

Assurez-vous d'avoir **Node.js** et **npm** installés sur votre machine.

Il y a un deuxieme read me crée automatiquement par angular ici : MSPR6-2/frontend/README.md

hésitez pas à le consulter si besoin.

### Installer Angular CLI :
Pour faciliter la gestion de la partie front-end du projet, installez globalement Angular CLI avec la commande suivante :

```bash
npm install -g @angular/cli
```
PS : Nous sommes en Angular 19.2
---

## Installation

### Installer le backend :

```bash
cd backend
npm install
npm install dotenv@^16.5.0 express@^5.1.0 mysql2@^3.14.0
```

### Installer le frontend :

Assurez-vous d'avoir Angular CLI installé globalement comme mentionné ci-dessus.

```bash
cd frontend
npm install
```

---

## Lancer le projet

### Lancer le projet côté back-end :

```bash
cd backend 
node app.js
```

### Lancer le projet côté front-end :

```bash
cd frontend
ng serve
```

---

## À remplir :

- Ajouter des informations supplémentaires sur la configuration bdd.
- Préciser les étapes pour déployer l'application en prod ( ayoub ).
- Mettre nos changements et nos migrations.
- Mettre a jour le Trello dès que possible.