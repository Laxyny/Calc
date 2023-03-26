<?php

// Inclusion du fichier database.php pour utiliser les fonctions de la base de données
require_once 'historique.php';

// Si une opération est envoyée en POST
if (isset($_POST['operation'])) {
    // Récupération de l'opération envoyée depuis la page HTML
    $operation = $_POST['operation'];

    // Remplacer le caractère "." par l'opérateur "+"
    $operation = str_replace(".", "+", $operation);

    // Vérification de la division par zéro
    if (preg_match('/\/\s*0/', $operation)) {
        $resultat = 'Erreur';
    } else {
        // Calcul de l'opération en utilisant la fonction eval()
        $resultat = @eval("return $operation;");

        // Si erreur de syntaxe dans l'opération, on renvoie un message d'erreur
        if ($resultat === false) {
            $resultat = 'Erreur';
        } else {
            // Lorsque le nombre est une décimale, on l'arrondit à 2 chiffres après la virgule
            if (is_float($resultat)) {
                $resultat = round($resultat, 2);
            } else {
                $resultat = (int) $resultat;
            }
        }
    }

    // Enregistrement de l'opération dans la base de données
    $conn = create_database_connection();
    save_operation($conn, $operation, $resultat);

    // Création de l'objet JSON pour la réponse
    $response = array(
        'result' => $resultat,
        'status' => 'success'
    );

    // Envoi au format JSON
    echo json_encode($response);
    //echo json_encode($resultat);
}

// Si une requête GET est reçue avec le paramètre previous_operations
if (isset($_GET['previous_operations']) && $_GET['previous_operations'] == "true") {
    // Récupération des opérations précédentes depuis la base de données
    $conn = create_database_connection();
    echo get_previous_operations($conn);
}

?>