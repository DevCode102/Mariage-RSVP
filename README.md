# Stevie & Anderson — Site de mariage RSVP

Site Next.js pour annoncer le mariage de **Stevie & Anderson**, collecter les confirmations de présence, et consulter les réponses dans un dashboard admin.

## Fonctionnalités

- Landing page avec compte à rebours (26 novembre 2026, 16h)
- Programme (Bangang / Bafoussam)
- Formulaire RSVP (amis des mariés)
- Dashboard admin protégé par mot de passe (`/admin`)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite (local) / PostgreSQL (prod Vercel)
- Déploiement : Vercel

## Démarrage local

1. Installer les dépendances :

```bash
npm install
```

2. Copier les variables d'environnement :

```bash
cp .env.example .env
```

Par défaut, `DATABASE_URL` pointe vers **PostgreSQL** (Prisma Postgres / Neon / Vercel).

   - `ADMIN_PASSWORD` — mot de passe du dashboard
   - `AUTH_SECRET` — secret aléatoire long pour signer le cookie de session
   - `BLOB_READ_WRITE_TOKEN` — token Vercel Blob pour uploader les images
   - `GEMINI_API_KEY` — clé Google AI Studio pour le conseiller de style

3. Créer les tables :

```bash
npx prisma db push
```

4. Lancer le serveur :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).  
Admin : [http://localhost:3000/admin](http://localhost:3000/admin).

## Déploiement Vercel

1. Pousser le dépôt sur GitHub et importer le projet dans Vercel.
2. Ajouter les variables d'environnement : `DATABASE_URL` (Postgres), `ADMIN_PASSWORD`, `AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`, `GEMINI_API_KEY`.
3. Après le premier déploiement, exécuter si besoin :

```bash
npx prisma db push
```

Le script `build` exécute `prisma generate` automatiquement.

## Remplacer les photos

Les placeholders sont dans `public/images/` :

- `couple-1.svg`, `couple-2.svg` — photos du couple
- `ouest-cameroun.svg` — image culture Ouest Cameroun

Remplacez-les par vos fichiers (jpg/png/webp) et mettez à jour les chemins dans `src/app/page.tsx` si les noms changent.
