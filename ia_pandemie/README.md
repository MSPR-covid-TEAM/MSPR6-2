# Installation et génération des fichiers `modele_rf_covid.pkl` et `scaler_rf_covid.pkl`

Ce guide explique comment préparer l'environnement, générer les fichiers du modèle IA et lancer l'API FastAPI pour prédire la classe pandémique (bas, moyen, élevé).

---

## ✅ Prérequis
- Python 3.10 ou 3.11 (de préférence, pas 3.13)
- Pip

---

## 1. Cloner ou accéder au dossier
Assure-toi d'avoir un dossier contenant au minimum :

```
ia_pandemie
├── api.py
```

---

## 2. Installer les dépendances

Installe manuellement :
```bash
pip install fastapi uvicorn pandas scikit-learn joblib
```

---

## 3. Générer les fichiers du modèle

Lance :
```bash
python train_model.py
```

---

## 4. Lancer l'API
Dans le même dossier que `api.py` :
```bash
uvicorn api:app --reload
##Ou bien si uvicorn par reconnu faire :
python -m uvicorn api:app --reload
```

Vérifie que l'API tourne sur :
> http://localhost:8000

Et teste-la sur :
> http://localhost:8000/docs

---

## 5. Utilisation depuis Angular
Tu peux maintenant utiliser l'API depuis ton frontend Angular via le service HTTP.

**Assure-toi que le CORS est activé dans `api.py` avec `CORSMiddleware`.**