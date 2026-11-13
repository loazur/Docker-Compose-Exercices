# TP Docker Compose

## Prérequis

- Docker avec le plugin Docker Compose (`docker compose`)

## Créer le secret PostgreSQL

À la racine du projet, créer le fichier `db_password.txt` avec uniquement le
mot de passe PostgreSQL, sans espace ni retour à la ligne supplémentaire :

```txt
motdepasse
```

## Lancer la pile

```sh
docker compose up -d
```

Cette commande démarre :

- PostgreSQL (`db`) ;
- l'API Node.js (`api`) ;
- le frontend React (`frontend`).

Vérifier l'état des services :

```sh
docker compose ps
```

## Accéder aux services

Depuis la machine hôte :

- API : <http://localhost:5000/status>
- Frontend : <http://localhost:3000>

Le service `db` n'est pas publié sur l'hôte. Il est accessible uniquement par
les services connectés au réseau interne.

## Tester l'isolation réseau

Le frontend peut joindre l'API, mais ne peut pas joindre directement
PostgreSQL :

```sh
docker compose exec frontend ping -c 2 api
docker compose exec frontend ping -c 2 db
```

La première commande doit fonctionner et la seconde doit échouer.

## Arrêter la pile

Arrêter et supprimer les conteneurs, les réseaux et le volume PostgreSQL :

```sh
docker compose down -v
```

> L'option `-v` supprime les données PostgreSQL stockées dans le
> volume `pg_data`.
