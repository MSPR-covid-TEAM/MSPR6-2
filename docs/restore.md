# ♻️ Restauration de la base de données MySQL

## 🎯 Objectif
Restaurer une base de données distante hébergée sur Alwaysdata à partir d’un fichier `.sql` généré par `backup.sh`, sans avoir à installer MySQL localement.

---

## 📁 Pré-requis
- Docker doit être installé sur la machine
- Le fichier `.sql` de sauvegarde doit être présent dans le dossier `backups/`
- Le script `restore.sh` doit se trouver à la racine du projet

---

## ▶️ Commande de restauration
Dans le terminal, exécute :
```bash

chmod +x restore.sh
./restore.sh nom_du_fichier.sql