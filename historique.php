<?php

// Crée une connexion à la base de données et retourne l'objet de connexion
function create_database_connection()
{
    // adresse, nom utilisateur, mdp et nom de la base de données
    $servername = "localhost";
    $username = "calc";
    $password = "mdp_bdd";
    $dbname = "calculatrice";

    // connexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérifie si la connexion a réussi, sinon affiche un message d'erreur et termine le script
    if ($conn->connect_error) {
        die("Erreur de connexion " . $conn->connect_error);
    }

    // Retourne l'objet de connexion
    return $conn;
}

// Récupère les 10 dernières opérations depuis la base de données
function get_previous_operations($conn)
{
    $sql = "SELECT operation, resultat FROM operations ORDER BY id DESC LIMIT 10"; // Récupère les 10 dernières opérations
    $result = mysqli_query($conn, $sql);

    // Création d'un tableau vide pour stocker les opérations
    $operations = [];

    // Si le nombre de lignes retournées par la requête est supérieur à 0
    if (mysqli_num_rows($result) > 0) {
        // Parcours les lignes de résultats et les ajoute au tableau $operations
        while ($row = mysqli_fetch_assoc($result)) {
            $operations[] = $row;
        }
    }

    // Retourne le tableau des opérations au format JSON
    return json_encode($operations);
}

// Sauvegarde une opération et son résultat dans la base de données
function save_operation($conn, $operation, $resultat)
{
    $sql = "INSERT INTO operations (operation, resultat) VALUES (?, ?)"; // Requête SQL
    $stmt = $conn->prepare($sql); // Prépare la requête
    $stmt->bind_param("sd", $operation, $resultat); // Lie les paramètres à la requête
    $stmt->execute(); // Exécute la requête
}

?>