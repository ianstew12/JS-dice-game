//dieSix generates random # 0-1, multiplies by 6, adds 1, rounds down
//	var dieSix = Math.floor(Math.random()*6+1);

//game: role all dice. If there is a match, you get points determined
//by the number of sides of the dice that matched (e.g. if the 4-sided
//matches with the 10-sided, you get 4+10 points)
"use strict"; 
function rollDieFour(){
	return Math.floor(Math.random()*4+1);
}
function rollDieSix(){
	return Math.floor(Math.random()*6+1);
}
function rollDieEight(){
	return Math.floor(Math.random()*8+1);
}
function rollDieTen(){
	return Math.floor(Math.random()*10+1);
}
function rollDieTwelve(){
	return Math.floor(Math.random()*12+1);
}
function rollDieTwenty(){
	return Math.floor(Math.random()*20+1);
}
function rollCustomizedDie(sides){					//would this work?
	return Math.floor(Math.randon()*sides+1);
}

function rollDice(){	//this has become the game function
	var result4= rollDieFour();
	var result6= rollDieSix();
	var result8= rollDieEight();
	var result10= rollDieTen();
	var result12=rollDieTwelve();
	var result20= rollDieTwenty(); 
	var fourMatch = checkMatchesFour(result4, result6, result8, result10, result12, result20);
	var sixMatch = checkMatchesSix(result4, result6, result8, result10, result12, result20);
	var eightMatch = checkMatchesEight(result4, result6, result8, result10, result12, result20)
	var tenMatch = checkMatchesTen(result4, result6, result8, result10, result12, result20);
	var twelveMatch=checkMatchesTwelve(result4, result6, result8, result10, result12, result20);
	var twentyMatch=checkMatchesTwenty(result4, result6, result8, result10, result12, result20);

	return scoreTally(fourMatch,sixMatch,eightMatch,tenMatch,twelveMatch,twentyMatch);
	//scoreTally returns the score, so if I return this I am returning the score. I need
	//to return this so my array in playerScores is not undefined
}

function checkMatchesFour(result4, result6, result8, result10, result12, result20){

	if (result4===result6||result4===result8||result4===result10||
		result4===result12||result4===result20){
			return true;
	}
	else{return false;}
}

function checkMatchesSix(result4, result6, result8, result10, result12, result20){
	if (result6===result4||result6===result8||result6===result10||
		result6===result12||result6===result20){
			return true;
	}
	else{return false;}
}

function checkMatchesEight(result4, result6, result8, result10, result12, result20){
	if (result8===result4||result8===result6||result8===result10||
		result8===result12||result8===result20){
				return true;
	}
	else{return false;}
}

function checkMatchesTen(result4, result6, result8, result10, result12, result20){
	if (result10===result4||result10===result6||result10===result8||
		result10===result12||result10===result20){
				return true;
	}
	else{return false;}
}

function checkMatchesTwelve(result4, result6, result8, result10, result12, result20){
	if (result12===result4||result12===result6||result12===result8||
		result12===result10||result12===result20){
			return true;
	}
	else{return false;}
}

function checkMatchesTwenty(result4, result6, result8, result10, result12, result20){
	if (result20===result4||result20===result6||result20===result8||
		result20===result10||result20===result12){
			return true;
	}
	else{return false;}
}

function scoreTally(checkMatchesFour,checkMatchesSix,checkMatchesEight,	//booleans
					checkMatchesTen,checkMatchesTwelve,checkMatchesTwenty){
	var score=0
	if (checkMatchesFour){score+=4};
	if (checkMatchesSix){score+=6};
	if (checkMatchesEight){score+=8};			//does not yet include snake eyes 
	if (checkMatchesTen){score+=10};
	if (checkMatchesTwelve){score+=12};
	if (checkMatchesTwenty){score+=20};

	console.log(score)
return score;
}


function playerSetup(){
	var numberOpponents = parseInt(prompt("Do you want to play against 0, 1, or 2 added opponents?"));
	//better practice: current setup or var = addedOpp then next line numberOpp=added+1
	var numberOpponents = numberOpponents + 1; //always vs at least one 
	var playerYou = "playerYou";
	var plaidStripes = "plaidStripes";
	var thirdPlayer = "Matching Pro";
	var fourthPlayer ="Matching Crusher";
	var allPlayers = [playerYou, plaidStripes];
	
	while ((numberOpponents>3)||(numberOpponents<0)|| !numberOpponents) {
	//can't be an if statement or second false input accepted. !numberOpponents required a number be input
		alert("that\'s not a valid number of extra opponents");
		var numberOpponents = parseInt(prompt("Do you want to play against 0, 1, or 2 added opponents?"));
		var numberOpponents = numberOpponents + 1;	
	}
	if (numberOpponents===2){
		allPlayers.push(thirdPlayer);
	}
	if (numberOpponents===3){
		allPlayers.push(thirdPlayer, fourthPlayer); //I can push multiple elements onto array at once, in order
	}
	var opponentsMessage = "";
	for (var i=1; i<allPlayers.length; i++){ 	//starting at i=i to not include myself (i=0) as opponent 
		opponentsMessage = opponentsMessage + allPlayers[i] + ", ";  //for now ignoring comma after last entry
	}
	console.log(allPlayers);
	alert("alright, you\'ll play against " + opponentsMessage)
	return allPlayers
}
//Now I have an array with all the players in the game. The next step: get each player to roll
//record each player's roll
//compare results, return who was highest
//alert of winner

function allPlayersRoll(allPlayers){
	var playerScores=[];
	for (var i=0; i<allPlayers.length;i++){
		playerScores.push(rollDice(i));
	}
	return playerScores;
}



function compareScores(playerScores){
	//starting with array of string scores, need to find index of highest score 
	//convert array values to numbers
	for (var i=0;i<playerScores.length;i++){
		playerScores[i]=parseInt(playerScores[i]);
	}
	console.log(playerScores);
	var winningScore = Math.max(...playerScores);	//array spread operator 
	var winnerIndex = playerScores.indexOf(winningScore);
	console.log(winnerIndex);
	return winnerIndex;	
}

function declareWinner(winnerIndex, allPlayers){
	var champion = allPlayers[winnerIndex];
	console.log(champion);
	return champion
}
// PROGRAM FLOW (ACTUALLY RUNNING THE PROGRAM)
var players = playerSetup();			//playerSetup returns an array of players 
var allScores= allPlayersRoll(players);	//players are passed into allPlayersRoll, giving an array of scores
var highestScorersIndex =compareScores(allScores);//scores are passed in to determine highest scorer's index
var theChamp = declareWinner(highestScorersIndex, players); //finds name of player who won
alert(theChamp + " won the game");















//could easily add a snake eyes feature (if two 1's score = 0)
/*
function numberOfOnes(result4,result6,result8,result10,result12,result20){
	var numberOfOnes = 0;
	if (result4===1){numberOfOnes++;}
	if (result6===1){numberOfOnes++;}
	if (result8===1){numberOfOnes++;}
	if (result10===1){numberOfOnes++;}
	if (result12===1){numberOfOnes++;}
	if (result20===1){numberOfOnes++;}
	return numberOfOnes;
}
function SnakeEyes(numberOfOnes){
	var score=0
	if (numberOfOnes>1){
		score = 0;
	}
	return score;
}
*/









//A FEW NOTES ON FUNCTIONS
/*
function doProcess(a,b){
	function localFunction1(){
	}
	function localFunction2(){
	}		
	return localFunction2;
}
var f = doProcess();
f();			THIS NOW CALLS localFunction2



INNER FUNCTIONS CAN BE ASSIGNED TO EACH OTHER
function doProcess(){
	function doLocalProcess(){}
	function doProcess=doLocalProcess(){}
}
doProcess()		THE FIRST TIME THIS RUNS IT STARTS FROM TOP
doProcess()		AFTER THE FIRST TIME IT CALLS doLocalProcess
*/

