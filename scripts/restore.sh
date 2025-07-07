#!/bin/bash

# Charger les variables d'environnement
set -a
[ -f ../backend/.env ] && . ../backend/.env
set +a

if [ -z "$1" ]; then
  echo "Usage : ./restore.sh nom_du_fichier.sql"
  echo "Exemple : ./restore.sh backup-mspr_bdd-2025-06-03-22h05.sql"
  exit 1
fi

BACKUP_FILE="../backups/$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Fichier de sauvegarde introuvable : $BACKUP_FILE"
  exit 1
fi

echo "Restauration de $BACKUP_FILE dans la base $DB_NAME..."

docker run --rm \
  -v $(pwd)/../backups:/backups \
  mysql:8 \
  sh -c "exec mysql -h$DB_HOST -P$DB_PORT -u$DB_USER -p$DB_PASSWORD $DB_NAME < /backups/$1"

if [ $? -eq 0 ]; then
  echo "Restauration terminée"
else
  echo "Erreur lors de la restauration"