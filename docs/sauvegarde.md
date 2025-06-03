# 🔄 Sauvegarde et restauration de la base de données MySQL

## 🧠 Objectif
Permettre de sauvegarder et de restaurer la base de données `mspr_bdd` hébergée sur Alwaysdata **sans installer MySQL localement**, uniquement via **Docker**.

---

## 📦 Sauvegarde – `backup.sh`

### 🔧 Pré-requis :
- Avoir Docker installé sur la machine
- Le script `backup.sh` à la racine du projet
- Un dossier `backups/` pour stocker les fichiers `.sql`

### ▶️ Lancer la sauvegarde :
```bash
chmod +x backup.sh
./backup.sh
