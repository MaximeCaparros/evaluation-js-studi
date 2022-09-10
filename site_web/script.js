var scoreRound;
var scoreGlobal;
var joueurActuel; // 0 ou 1

// Lancement de la partie
gameon();

/**
 * Initialisation ou Ré-initialiser de la partie
 */
function gameon() {
	// Initialisation ou Ré-initialiser des variables global
	scoreGlobal = [0, 0];
	joueurActuel = 0;
	scoreRound = 0;
	game = true;

	// Initialisation ou Ré-initialiser des éléments graphiques
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.getElementById('turn-0').textContent = '0';
	document.getElementById('turn-1').textContent = '0';

	document.getElementById('id-0').textContent = 'Joueur 1';
	document.getElementById('id-1').textContent = 'Joueur 2';

	document.querySelector('.player-0-box').classList.remove('winner');
	document.querySelector('.player-1-box').classList.remove('winner');

	document.querySelector('.player-0-box').classList.remove('point');
	document.querySelector('.player-1-box').classList.remove('point');

	document.querySelector('.player-0-box').classList.add('point');

}

	


/**
 * Test si la partie est fini
 * @return  true si la partie est fini, false sinon
 */
function finDeJeu() {
	if (scoreGlobal[joueurActuel] >= 100) {
		return true;
	}

	return false;
};

/**
 * Change de joueur
 */
function nextPlayer() {
	scoreRound = 0;
	joueurActuel = ++joueurActuel % 2;

	//Initialisation des éléments graphiques 
	document.getElementById('turn-0').textContent = '0';
	document.getElementById('turn-1').textContent = '0';
	document.querySelector('.player-0-box').classList.toggle('point');
	document.querySelector('.player-1-box').classList.toggle('point');
	document.querySelector('.dice').style.display = 'none';

	
}
var lancer = document.querySelector('.btn-roll');
/**
 * Bouton qui effectue un roll de dice vers ROUND
 */
lancer.addEventListener("click", function () {
		//Verifie si la partie est en cours
		if (game) {

			// Génrration valeur de dé
			valueD = Math.floor(Math.random() * 6) + 1;

			// affichage dé

			document.querySelector('.dice').style.display = 'block';

			document.querySelector('.dice').src = 'images/dice-' + valueD + '.png';

			// Si la valeur du dé est a 1
			// Alors rajoute la valeur dans le ROUND
			// Sinon pour faire un changement de joueur si tel est le cas
			if (valueD != 1) {

				scoreRound += valueD;

				document.querySelector('#turn-' + joueurActuel).textContent = scoreRound;

			} else {

				nextPlayer();
			}
		}
	});


var btnHold = document.querySelector(".btn-hold");
/**
 * Bouton pour envoyer les points ROUND vers le GLOBAL
 */
btnHold.addEventListener("click", function () {
	//Verifie si la partie est en cours
	if (game) {
		scoreGlobal[joueurActuel] += scoreRound;
		document.getElementById('score-' + joueurActuel).textContent = scoreGlobal[joueurActuel];
		// Si la partie est finie
		// Alors designe la gagnant en bloquant la game
		// Sinon prochain tour
		if (finDeJeu()) {
			document.querySelector('#id-' + joueurActuel).textContent = 'Gagnant !';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + joueurActuel + '-box').classList.add('winner');
			document.querySelector('.player-' + joueurActuel + '-box').classList.remove('point');
			game = false;

		}
		else {
			nextPlayer();
		}
	}
});

var btnReplay = document.querySelector(".btn-new");
/**
 * Bouton pour initialiser de la game
 */
btnReplay.addEventListener("click", function () {
	gameon();
});













