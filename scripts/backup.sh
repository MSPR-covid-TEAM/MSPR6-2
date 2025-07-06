#!/bin/bash

# === Configuration en dur ===
DB_HOST="mysql-mspr.alwaysdata.net"
DB_PORT=3306
DB_USER="mspr"
DB_PASSWORD="GMW2bwi1"
DB_NAME="mspr_bdd"

# === Préparation du dossier ===
BACKUP_DIR="../backups"
mkdir -p "$BACKUP_DIR"  # crée le dossier s’il n'existe pas

DATE=$(date +"%Y-%m-%d-%Hh%Mm")
BACKUP_FILE="$BACKUP_DIR/backup-${DB_NAME}-${DATE}.sql"

echo "📦 Sauvegarde de la base $DB_NAME dans $BACKUP_FILE..."

docker run --rm \
  -v $(pwd):/backup \
  mysql:8 \
  sh -c "exec mysqldump -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASSWORD $DB_NAME" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Sauvegarde terminée : $BACKUP_FILE"
else
  echo "❌ Erreur lors de la sauvegarde"
fi
