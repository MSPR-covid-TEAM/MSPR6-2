from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Charger le modèle et le scaler
model = joblib.load("modele_rf_covid.pkl")
scaler = joblib.load("scaler_rf_covid.pkl")

# Création de l'application FastAPI
app = FastAPI(title="API IA - Prédiction Pandémie COVID")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Définition du schéma d'entrée avec Pydantic
class DonneesEntree(BaseModel):
    nouveaux_cas: float
    nouveaux_deces: float
    nouveaux_gueris: float
    moyenne_3j_cas: float
    moyenne_3j_deces: float
    moyenne_3j_gueris: float
    croissance_cas: float
    ratio_gueris_cas: float

# Dictionnaire de correspondance des classes
classe_mapping = {0: "bas", 1: "moyen", 2: "eleve"}

@app.post("/predict")
def predire_classe(data: DonneesEntree):
    # Transformation des données en tableau et standardisation
    tableau = np.array([[
        data.nouveaux_cas,
        data.nouveaux_deces,
        data.nouveaux_gueris,
        data.moyenne_3j_cas,
        data.moyenne_3j_deces,
        data.moyenne_3j_gueris,
        data.croissance_cas,
        data.ratio_gueris_cas
    ]])

    tableau_normalise = scaler.transform(tableau)
    prediction = model.predict(tableau_normalise)[0]
    classe = classe_mapping.get(prediction, "inconnu")

    return {
        "classe_predite": classe,
        "valeur_numerique": int(prediction)
    }