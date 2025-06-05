from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

model = joblib.load("modele_propagation_rf.pkl")
scaler = joblib.load("scaler_propagation_rf.pkl")

app = FastAPI(title="API IA - Prédiction de la propagation COVID-19 (J+3)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PropagationInput(BaseModel):
    nouveaux_cas: float
    nouveaux_deces: float
    nouveaux_gueris: float
    moyenne_3j_cas: float
    moyenne_3j_deces: float
    moyenne_3j_gueris: float
    croissance_cas: float
    ratio_gueris_cas: float

@app.post("/predict_propagation")
def predict_propagation(data: PropagationInput):
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
    return { "nouveaux_cas_Jplus3_predits": round(prediction, 2) }
