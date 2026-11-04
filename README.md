# Compta Quest

Application mobile d’apprentissage ludique de la comptabilité SYSCOHADA révisée, développée avec Expo, React Native et TypeScript.

## Fonctionnalités

- Parcours d’imputation comptable avec sélection des comptes au débit et au crédit.
- Explications pédagogiques, vies et points d’expérience.
- Progression sauvegardée localement pour une utilisation hors ligne.
- Catalogue consultable de 100 comptes répartis dans les huit classes.

Le catalogue et les exercices fournis sont des exemples pédagogiques. Ils ne remplacent pas le plan comptable officiel ni la vérification des règles applicables dans le pays concerné.

## Démarrage

Prérequis : Node.js et npm.

```powershell
npm.cmd install
npm.cmd run start
```

Dans Expo, scannez le QR code avec Expo Go ou choisissez une cible Android, iOS ou web.

## Vérifications

```powershell
npm.cmd run typecheck
npx.cmd expo-doctor
npm.cmd audit
```

## Technologies

- Expo SDK 58 et React Native
- TypeScript en mode strict
- NativeWind et Tailwind CSS
- Zustand avec stockage local AsyncStorage
