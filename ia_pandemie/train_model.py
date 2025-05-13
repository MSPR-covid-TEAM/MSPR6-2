import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

# Charger le CSV enrichi
df = pd.read_csv("donnees_pandemie_avec_features.csv")

# Définir X et y
features = [
    'nouveaux_cas', 'nouveaux_deces', 'nouveaux_gueris',
    'moyenne_3j_cas', 'moyenne_3j_deces', 'moyenne_3j_gueris',
    'croissance_cas', 'ratio_gueris_cas'
]
X = df[features]
y = df['classe_cas_actif_num']

# Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Entraînement
X_train, _, y_train, _ = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Sauvegarde
joblib.dump(model, "modele_rf_covid.pkl")
joblib.dump(scaler, "scaler_rf_covid.pkl")
print("✅ Modèle et scaler régénérés avec succès")