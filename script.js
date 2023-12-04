const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//filters out any element in fruit array that doesn't include user text input 
function search(str) {
	return fruit.filter((val) => {
		let lowerCaseVal = val.toLowerCase();
		return lowerCaseVal.includes(str);
	});
}

//handle typing event where fruit array gets filtered based on user input value and then get displayed as sugestions below search bar
function searchHandler(e) {
	let userInput = input.value;
	const results = search(userInput.toLowerCase());
	showSuggestions(results, userInput);

}
//This function takes the suggestion being displayed and user input text, and makes the first instance where input text is found in suggestion bold text
function boldText(str, subStr){
	let lowerCaseStr = str.toLowerCase();
	let subStrIndex = lowerCaseStr.indexOf(subStr.toLowerCase());
	if(subStrIndex === 0){//user text found in beginning
		return '<b>' + subStr[0].toUpperCase() + subStr.slice(1).toLowerCase() + '</b>' + str.slice(subStrIndex + subStr.length);
	}
	return str.slice(0,subStrIndex) + '<b>' + subStr.toLowerCase() + '</b>' + str.slice(subStrIndex + subStr.length);
	
}

//Display the first five suggestions that contain user input text
function showSuggestions(result, inputVal) {
	const topFiveResults = result.slice(0,5);
	suggestions.innerHTML = '';
	if (inputVal !== ''){ //won't display suggestions when user input is empty
		for (let fruit of topFiveResults){
			const li = document.createElement('li');
			li.innerHTML = boldText(fruit, inputVal);
			suggestions.append(li);
		}		
	}
}

//handle click evenrt where the sugestion that is clicked on get displayed on search box
function useSuggestion(e) {
	if(e.target.tagName === 'B'){
		input.value = e.target.parentElement.innerText;
	} else{
		input.value = e.target.innerText;
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);