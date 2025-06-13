# ia_pandemie/Dockerfile

FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir fastapi uvicorn pandas scikit-learn joblib

# 🔁 Exécute le script d'entraînement pendant le build
RUN python train_model_propagation.py

EXPOSE 8000

CMD ["sh", "-c", "python train_model_propagation.py && uvicorn api_propagation_ia:app --host 0.0.0.0 --port 8000"]

