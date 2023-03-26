//Récupération des variables des buttons
var clear = document.querySelectorAll('.clear'); //clear
var equal = document.querySelectorAll('.equal'); //egal
var num = document.querySelectorAll('.number'); //chiffres
var op = document.querySelectorAll('.operator'); //opérateurs

// Sauvegarde de l'opération en cours lorsqu'on clique sur un bouton ou sur le clavier
var operation = ""

//Changer la couleur des buttons lors du click et revenir à la couleur d'origine lorsque le click est relaché
//Numéros
for (var i = 0; i < num.length; i++) {
  num[i].addEventListener('mousedown', function () {
    this.style.backgroundColor = "#8D8D8D";
  });
  num[i].addEventListener('mouseup', function () {
    this.style.backgroundColor = "#F5F5F5";
  });
}

//Opérateurs
for (var i = 0; i < op.length; i++) {
  op[i].addEventListener('mousedown', function () {
    this.style.backgroundColor = "#8D8D8D";
  });
  op[i].addEventListener('mouseup', function () {
    this.style.backgroundColor = "#F5F5F5";
  });
}

//Clear
for (var i = 0; i < clear.length; i++) {
  clear[i].addEventListener('mousedown', function () {
    this.style.backgroundColor = "#C20003";
  });
  clear[i].addEventListener('mouseup', function () {
    this.style.backgroundColor = "#F5F5F5";
  });
}

//Egal
for (var i = 0; i < equal.length; i++) {
  equal[i].addEventListener('mousedown', function () {
    this.style.backgroundColor = "#07AA04";
  });
  equal[i].addEventListener('mouseup', function () {
    this.style.backgroundColor = "#F5F5F5";
  });
}

//afficher les chiffres dans l'affichage à droite et décaller a gauche les chiffres déjà affichés
for (var i = 0; i < num.length; i++) {
  num[i].addEventListener('click', function () {
    document.querySelector('.Affichage').innerHTML += this.innerHTML;
  });
}

//afficher les opérateurs dans l'affichage à droite et décaller a gauche les chiffres déjà affichés et laisser un espace entre les chiffres et les opérateurs
for (var i = 0; i < op.length; i++) {
  op[i].addEventListener('click', function () {
    document.querySelector('.Affichage').innerHTML += " " + this.innerHTML + " ";

  });
}

//effacer l'affichage du form et du input
for (var i = 0; i < clear.length; i++) {
  clear[i].addEventListener('click', function () {
    document.querySelector('.Affichage').innerHTML = "";
    operation = "";
  });
}

//Ajouter le numéro ou l'operateur lorsque le bouton est cliqué dans l'operation
for (var i = 0; i < num.length; i++) {
  num[i].addEventListener('click', function () {
    operation += this.innerHTML;
    console.log('chiffre');
  });
}

// Pour les opérateurs
for (var i = 0; i < op.length; i++) {
  op[i].addEventListener('click', function () {
    var operator = this.innerHTML;
    if (operator === "+") {
      operator = ".";
    }
    operation += operator;
    console.log('operateur');
  });
}

// Quand le bouton égal est clické
for (var i = 0; i < equal.length; i++) {
  equal[i].addEventListener('click', function () {
    document.querySelector('.Affichage').innerHTML += " = ";
    console.log('click');
    calcul();
  });
}

//stockage des touches du clavier enfoncées
var keysPressed = {};

//ajout des événements de touche
function keyDown(event) {
  keysPressed[event.key] = true;
  handleKeys();
}

// suppression des événements de touche
function keyUp(event) {
  delete keysPressed[event.key];
}

//fonction qui vérifie si une touche est enfoncée
function handleKeys() {
  if (keysPressed["0"]) {
    document.querySelector('.Affichage').innerHTML += "0";
    operation += "0";
  }
  if (keysPressed["1"]) {
    document.querySelector('.Affichage').innerHTML += "1";
    operation += "1";
  }
  if (keysPressed["2"]) {
    document.querySelector('.Affichage').innerHTML += "2";
    operation += "2";
  }
  if (keysPressed["3"]) {
    document.querySelector('.Affichage').innerHTML += "3";
    operation += "3";
  }
  if (keysPressed["4"]) {
    document.querySelector('.Affichage').innerHTML += "4";
    operation += "4";
  }
  if (keysPressed["5"]) {
    document.querySelector('.Affichage').innerHTML += "5";
    operation += "5";
  }
  if (keysPressed["6"]) {
    document.querySelector('.Affichage').innerHTML += "6";
    operation += "6";
  }
  if (keysPressed["7"]) {
    document.querySelector('.Affichage').innerHTML += "7";
    operation += "7";
  }
  if (keysPressed["8"]) {
    document.querySelector('.Affichage').innerHTML += "8";
    operation += "8";
  }
  if (keysPressed["9"]) {
    document.querySelector('.Affichage').innerHTML += "9";
    operation += "9";
  }
  if (keysPressed["+"]) {
    document.querySelector('.Affichage').innerHTML += " + ";
    operation += ".";
  }
  if (keysPressed["-"]) {
    document.querySelector('.Affichage').innerHTML += " - ";
    operation += "-";
  }
  if (keysPressed["*"]) {
    document.querySelector('.Affichage').innerHTML += " x ";
    operation += "*";
  }
  if (keysPressed["/"]) {
    document.querySelector('.Affichage').innerHTML += " / ";
    operation += "/";
  }
  if (keysPressed["."]) {
    document.querySelector('.Affichage').innerHTML += ".";
    operation += ".";
  }
  if (keysPressed["Enter"]) {
    document.querySelector('.Affichage').innerHTML += " = ";
    calcul();
  }
}

//Relier au php avec ajax
//Relier au php avec ajax
function calcul() {
  // Créer une requête HTTP
  var xhr = new XMLHttpRequest();
  // Envoyer la requête
  xhr.open('POST', 'calcul.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('operation=' + operation);
  // Récupérer la réponse
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

      // Supprimer les caractères supplémentaires qui peuvent être ajoutés par PHP
      var jsonResponseIndex = xhr.responseText.lastIndexOf('}') + 1;
      var cleanedResponseText = xhr.responseText.slice(0, jsonResponseIndex);

      try {
        // Convertir la réponse en JSON
        var responseJSON = JSON.parse(cleanedResponseText);
        document.querySelector('.Affichage').innerHTML = responseJSON.result; // Mettez à jour l'affichage avec le résultat uniquement
        operation = "";

        // Actualiser l'historique des opérations après chaque opération réussie
        getPreviousOperations();

      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }
}
//Relier au php avec ajax
function calcul() {
  // Créer une requête HTTP
  var xhr = new XMLHttpRequest();
  // Envoyer la requête
  xhr.open('POST', 'calcul.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('operation=' + operation);
  // Récupérer la réponse
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

      // Supprimer les caractères supplémentaires qui peuvent être ajoutés par PHP
      var jsonResponseIndex = xhr.responseText.lastIndexOf('}') + 1;
      var cleanedResponseText = xhr.responseText.slice(0, jsonResponseIndex);

      try {
        // Convertir la réponse en JSON
        var responseJSON = JSON.parse(cleanedResponseText);
        document.querySelector('.Affichage').innerHTML = responseJSON.result; // Mettez à jour l'affichage avec le résultat uniquement
        operation = "";

        // Actualiser l'historique des opérations après chaque opération réussie
        getPreviousOperations();

      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }
}

// Ajouter du contenu à l'affichage
function addToDisplay(content) {
  document.querySelector('.Affichage').innerHTML += content;
}

// Afficher l'opération de l'historique dans l'affichage
function displayHistoryOperation(event) {
  const operationWithResult = event.target.getAttribute('data-operation');
  
  // Enlever le résultat du calcul et ne garder que l'opération
  const operationOnly = operationWithResult.split('=')[0].trim();
  
  document.querySelector('.Affichage').innerHTML = operationOnly;
  
  // Mettre à jour la variable 'operation'
  operation = operationOnly.replace(/\s/g, '').replace('.', '+'); // Préparez l'opération pour être complétée si nécessaire
}

//Sauvegarder les opérations dans une base de données
function getPreviousOperations() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "calcul.php?previous_operations=true", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var operations = JSON.parse(xhr.responseText);
      var operationsHTML = "";

      for (var i = 0; i < operations.length; i++) {
        // Ajoutez l'attribut data-operation aux éléments de l'historique
        operationsHTML += `<span data-operation="${operations[i].operation}">${operations[i].operation}</span> = ${operations[i].resultat}<br>`;
      }

      document.getElementById("previous-operations").innerHTML = operationsHTML;

      // Ajoutez un événement click aux éléments de l'historique
      const historyItems = document.querySelectorAll('#previous-operations span');
      for (let i = 0; i < historyItems.length; i++) {
        historyItems[i].addEventListener('click', displayHistoryOperation);
        // Ajouter au calcul en cours lors d'un clic sur un élément de l'historique pour le compléter
        historyItems[i].addEventListener('click', function() {
          operation = operations[i].operation.replace(/\s/g, '').replace('+', '.'); // Préparez l'opération pour être complétée si nécessaire
          console.log(operation);
        });
      }
    }
  };
  xhr.send();
}

getPreviousOperations();