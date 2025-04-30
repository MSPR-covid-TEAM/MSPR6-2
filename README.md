# MSPR6-2

--------------------------------------------

# Les installs

Install backen :
```bash
cd backend
npm install
npm install dotenv@^16.5.0 express@^5.1.0 mysql2@^3.14.0
```

Lancer le projet côté back 
```bash
cd backend 
node app.js
```

Lancer le projet côté front 
```bash
cd frontend
ng serve
```


--------------------------------------------

# API CRUD

> `http://localhost:4200` n'est que le lien en local


## 1. Create

**CREATE** `http://localhost:4200/stats/create`


## 2. Read
### 2.1. All

**GET** `http://localhost:4200/stats/`

### 2.2. Show

**GET** `http://localhost:4200/stats/{id}`
## 3. Update

**PUT** `http://localhost:4200/stats/{id}`

**Body JSON** 
```json
    "nouveaux_cas": 1,
    "id_pays":1,
    "id_pandemie": 1,
    "date": 1,
    "nouveaux_cas": 1,
    "nouveaux_deces": 1,
    "nouveaux_gueris": 1,
    "cas_actifs": 1
```
> **Attention** : tous les champs ne sont pas obligatoires
## 4. Delete

**DELETE** `http://localhost:4200/stats/{id}`
