-- Creation de la base de données
CREATE DATABASE IF NOT EXISTS calculatrice;

-- On crée un utilisateur "calc" avec un mot de passe "mdp_bdd"
CREATE USER 'calc'@'localhost' IDENTIFIED BY 'mdp_bdd';

-- On donne tous les droits à l'utilisateur "calc" sur la base de données "calculatrice"
GRANT ALL PRIVILEGES ON calculatrice.* TO 'calc'@'localhost';

-- On utilise la base calculatrice
USE calculatrice;

-- Creation de la table operations si elle n'existe pas
CREATE TABLE IF NOT EXISTS operations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation VARCHAR(255) NOT NULL,
    resultat DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
