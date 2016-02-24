'use strict';

function setTextBoxValue(str,selected=false)
{
	var textbox=document.getElementById("name-input");
	// console.log(toRemove);
	// console.log(textbox);

	textbox.value=str;
	if(selected)	textbox.select();
}

function getListOfNames(){
	var namelistElt=document.getElementById("namelist-main");
	var arrElts=namelistElt.children;
	var arrNames=[];
	for(var i=0;i<arrElts.length; i++){
		arrNames.push(arrElts[i].textContent);
	}
	return arrNames;
}

function exportNamesToTextbox(event)
{
	var arrNames=getListOfNames();
	setTextBoxValue(arrNames.join(','), true);

}


function getRandomName(event)
{
	var arrNames=getListOfNames();

	var ri=Math.floor(Math.random()*arrNames.length);
	var randNameElt=document.getElementById("random-name");
	randNameElt.textContent=arrNames[ri];

}


function removeNameFromList(event)
{
	var toRemove=event.currentTarget.removeChild(event.target);
	setTextBoxValue(toRemove.textContent);
	
}


function addTextInputToList(event)
{
	if(event.type==="keydown" && event.which!==13){
		return;
	}
	// console.log(event);
	var inputtext=event.target.parentElement.children[0].value;
	// console.log(inputtext);
	if(inputtext.length===0) return;
	var names=inputtext.split(',');
	// console.log(names);
	var namelistElt=document.getElementById("namelist-main");
	var namelistEltContainer=document.getElementById("namelist-main-container");

	// console.log(namelistElt);
	// console.log(namelistEltContainer);

	namelistElt=namelistEltContainer.removeChild(namelistElt);	//	yank this out of the DOM for the moment!
	for(var i=0;i<names.length;i++){
		var newli=document.createElement("li");
		var newlitext=document.createTextNode(names[i].trim());
		newli.appendChild(newlitext);
		namelistElt.appendChild(newli);
	}

	namelistEltContainer.appendChild(namelistElt);
	event.target.parentElement.children[0].value="";
}


function array_splitter(a, n) 
{
	var out = [];
	while (a.length) {
		out.push(a.splice(0, n));
	}
	return out;
}

//	found on stackoverflow http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//		shuffles by swapping the current element with a random element that has already been defined
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function generateTeamHTML(teams) {
	var teamgenref=document.getElementById("teamgen-reference");
	var teamgen=teamgenref.previousSibling;
	//console.log(teamgen);
	var removedTeamgen=teamgen.parentElement.removeChild(teamgen);
	var newTeamGen=document.createElement("div");
	newTeamGen.classList.add("teamgen-list");

	for(var i=0;i<teams.length;i++) {
		//	FOR EACH TEAM
		var newul=document.createElement("ul");
		newul.classList.add("namelist");
		for(var j=0;j<teams[i].length;j++){
			var newli=document.createElement("li");
			var newlitext=document.createTextNode(teams[i][j]);
			newli.appendChild(newlitext);
			newul.appendChild(newli);

		}
		newTeamGen.appendChild(newul);
	}
	teamgenref.parentElement.insertBefore(newTeamGen,teamgenref);
}


function generateTeams(event)
{
	var namesList=getListOfNames();
	if(namesList.length===0) return;
	var numPerTeam=document.getElementById("teamgen-count").value;
	var shuffledNamesList=shuffleArray(namesList);
	var teamsArray=array_splitter(shuffledNamesList,numPerTeam);
	
	generateTeamHTML(teamsArray);

}


function onLoaded(event)
{
	//	add listeners for
	// 	add button -- click
	// 	generated li's delete btn -- click
	// 	
	// 

	var testNames="Gregorio Lawyer, Nicole Dahlman, Toi Heiser, Jake Mannon, Jutta Armstrong, Annalisa Carrion, Shelby Pyatt, Alverta Alden, Eloisa Gayton, Antoine Okane, Penelope Legrand, Neva Belz, Alise Gobble, Yukiko Gabor, Harvey Morneau, Isreal Hernadez, Cleveland Rabideau, Evelina Denker, Rima Wishart, Tabatha Herold, Ernestine Coache, Warren Bechtold, Joseph Thacker, Ada Morra, Era Segalla, Emmaline Latch, Yang Liebel, Sandie Fan, Bobbi Barile, Allena Cashion";

	setTextBoxValue(testNames);

	var nameInput=document.getElementById("name-input");
	var nameInputBtn=document.getElementById("name-input-btn");
	var exportBtn=document.getElementById("export-btn");
	var randomBtn=document.getElementById("get-random-name");

	var teamInputBtn=document.getElementById("teamgen-btn");

	var namelist=document.getElementById("namelist-main");

	nameInput.addEventListener('keydown', addTextInputToList);
	nameInputBtn.addEventListener('click', addTextInputToList);
	namelist.addEventListener("dblclick", removeNameFromList);
	randomBtn.addEventListener("click", getRandomName);
	exportBtn.addEventListener('click', exportNamesToTextbox);

	teamInputBtn.addEventListener('click', generateTeams);

}

document.addEventListener('DOMContentLoaded', onLoaded);
