
# IA de Prédiction de la Propagation COVID-19 - MSPR TPRE502

Ce projet a été développé dans le cadre de la MSPR TPRE502 du programme DEVIA FS. Il s'agit d'une application Angular intégrée à une IA prédictive via une API FastAPI.

## 🎯 Objectif

Prédire le nombre de cas à J+3 d'une pandémie à partir de données observées sur une journée :
- Nouveaux cas
- Décès
- Guérisons
- Moyennes glissantes
- Taux de croissance
- Ratio guérison/cas

## 🧠 IA utilisée

- **Modèle** : Random Forest Regressor
- **Données** : `donnees_propagation_Jplus3.csv`
- **Normalisation** : StandardScaler
- **Score R²** : > 0.91
- **Évaluation** : MAE, RMSE, R² affichés dans console à l'entraînement

## 🛠 Structure

```
📁 ia_pandemie/
  ├── train_model_propagation.py
  ├── api_propagation_ia.py
  ├── modele_propagation_rf.pkl
  ├── scaler_propagation_rf.pkl

📁 frontend/ (Angular)
  ├── features/
      └── propagation/
          ├── propagation.component.ts
          ├── propagation.component.html
          ├── propagation.component.css
```

## 🚀 Lancer le projet

### Backend - API IA
```bash
cd ia_pandemie
python train_model_propagation.py       # Entraîne le modèle si besoin
uvicorn api_propagation_ia:app --reload
```

### Frontend - Angular
```bash
cd frontend
npm install
ng serve
```

---

## 👨‍💻 Utilisation

1. Ajustez les curseurs pour entrer les valeurs connues
2. Cliquez sur **“Prédire la propagation”**
3. Observez le résultat (nombre de cas estimé à J+3) et le graphique généré

Un bouton “Plus d’informations” vous explique comment fonctionne l’IA.

---

## 📈 Affichage graphique

Un graphique à barres est généré avec :
- Les cas actuels
- La prédiction à J+3

> *Ajouté avec Chart.js, automatiquement mis à jour après chaque prédiction.*

---

## 📚 Fichiers clés

- `train_model_propagation.py` : script d'entraînement
- `api_propagation_ia.py` : API FastAPI pour la prédiction
- `propagation.component.ts/html/css` : interface utilisateur Angular
