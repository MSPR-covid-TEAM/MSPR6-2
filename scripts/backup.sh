#!/bin/bash

BACKUP_DIR="../backups"

# Charger les variables d'environnement
set -a
[ -f ../backend/.env ] && . ../backend/.env
set +a

mkdir -p "$BACKUP_DIR"

DATE=$(date +"%Y-%m-%d-%Hh%Mm")
BACKUP_FILE="$BACKUP_DIR/backup-${DB_NAME}-${DATE}.sql"

echo "Sauvegarde de la base $DB_NAME dans $BACKUP_FILE..."

docker run --rm \
  -v $(pwd):/backup \
  mysql:8 \
  sh -c "exec mysqldump -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASSWORD $DB_NAME" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Sauvegarde terminée : $BACKUP_FILE"
else
  echo "Erreur lors de la sauvegarde"
fi