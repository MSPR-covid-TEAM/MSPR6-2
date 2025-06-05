import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import numpy as np

df = pd.read_csv("donnees_propagation_Jplus3.csv")

features = [
    'nouveaux_cas', 'nouveaux_deces', 'nouveaux_gueris',
    'moyenne_3j_cas', 'moyenne_3j_deces', 'moyenne_3j_gueris',
    'croissance_cas', 'ratio_gueris_cas'
]
X = df[features]
y = df['nouveaux_cas_Jplus3']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=70, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print("MAE:", round(mean_absolute_error(y_test, predictions), 2))
print("RMSE:", round(np.sqrt(mean_squared_error(y_test, predictions)), 2))
print("R²:", round(r2_score(y_test, predictions), 3))

joblib.dump(model, "modele_propagation_rf.pkl")
joblib.dump(scaler, "scaler_propagation_rf.pkl")
print("\nModèle et scaler sauvegardés avec succès.")
