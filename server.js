// Importation des modules nécessaires
import cors from "cors"; // Permet de gérer les politiques CORS pour autoriser les requêtes provenant d'autres domaines.
import express from "express"; // Framework léger pour créer un serveur web facilement.

import boardgames from "./data/boardgames.json"; // Importation d'un fichier JSON contenant des données sur des jeux de société.

// Définition du port sur lequel l'application sera lancée. Par défaut, 8080 est utilisé.
// On peut aussi spécifier un port via une variable d'environnement (ex. PORT=9000 npm start).
const port = process.env.PORT || 8080; // Définit le port à utiliser.
const app = express(); // Initialise une instance de l'application Express.

// Ajout de middlewares pour configurer le serveur
app.use(cors()); // Active CORS pour permettre les requêtes cross-origin.
app.use(express.json()); // Permet de parser les requêtes avec un corps au format JSON.

console.log('Hello from the server side'); // Affiche un message dans la console pour indiquer que le serveur est en cours d'exécution.

// Définition des routes
// Route principale : affiche un message simple lorsqu'on visite la racine du serveur ("/").
app.get("/", (req, res) => {
  res.send("Hello Technigo!"); // Envoie un message en réponse à la requête.
});

// Route "/test" : une route de test simple qui renvoie un message.
app.get("/test", (req, res) => {
  res.send("Hello from test"); // Envoie un message en réponse à la requête sur "/test".
});

// Route "/boardgames" : retourne la liste complète des jeux de société ou filtre par catégorie.
app.get("/boardgames", (req, res) => {
  const category = req.query.category; // Récupère la catégorie depuis les paramètres de requête.
  
  if (category) {
    // Filtre les jeux de société par catégorie si un paramètre de catégorie est fourni.
    const filteredGames = boardgames.filter(game => game.category.toLowerCase() === category.toLowerCase());
    res.json(filteredGames);
  } else {
    // Renvoie tous les jeux de société si aucune catégorie n'est spécifiée.
    res.json(boardgames);
  }
});

// Route dynamique "/boardgames/:id" : permet de récupérer un jeu spécifique en fonction de son ID.
app.get("/boardgames/:id", (req, res) => {
  const id = req.params.id; // Récupère l'ID envoyé dans l'URL en tant que paramètre.

  // Recherche le jeu correspondant dans le tableau des jeux de société en comparant l'ID.
  const boardgame = boardgames.find((game) => game.id === +id); // +id transforme l'ID en nombre.
  
  if (boardgame) {
    res.status(200).json(boardgame); // Si un jeu correspondant est trouvé, renvoie un statut 200 (OK) avec le jeu en JSON.
  } else {
    res.status(404).json({ error: "No game found with that id" }); // Si aucun jeu ne correspond, renvoie une erreur 404 avec un message.
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Affiche un message avec le lien pour accéder au serveur.
});
