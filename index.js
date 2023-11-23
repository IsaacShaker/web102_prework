/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        const game = games[i];
        // create a new div element, which will become the game card
        const new_div = document.createElement("div");

        // add the class game-card to the list
        new_div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const display = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString('en-US')}</p>
            <p>Goal: $${game.goal.toLocaleString('en-US')}</p>
            <p>Backers: ${game.backers.toLocaleString('en-US')}</p>
        `;

        new_div.innerHTML = display;

        // append the game to the games-container
        gamesContainer.appendChild(new_div);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_backers = GAMES_JSON.reduce( (acc, game) => { return acc += game.backers; }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = total_backers.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let total_raised = GAMES_JSON.reduce( (acc, game) => { return acc += game.pledged; }, 0);

// set inner HTML using template literal
raisedCard.innerHTML = "$" + total_raised.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let numGames = GAMES_JSON.length;
gamesCard.innerHTML = numGames.toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (game) => { return game.goal > game.pledged; });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => { return game.goal <= game.pledged; });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfundedGames = GAMES_JSON.filter( (game) => { return game.goal > game.pledged; }).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
    A total of $${total_raised.toLocaleString('en-US')} has been raised for ${numGames.toLocaleString('en-US')} ${numGames.toLocaleString('en-US') == 1 ? "game" : "games"}.
    Currently, ${numUnfundedGames.toLocaleString('en-US')} ${numUnfundedGames == 1 ? "game" : "games"} remain unfunded. We need your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container
const new_p = document.createElement("p");
new_p.innerHTML = displayStr;

descriptionContainer.appendChild(new_p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstPlace, SecondPlace, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement("p");
topGame.innerHTML = firstPlace.name;
firstGameContainer.appendChild(topGame);


// do the same for the runner up item
const runnerUp = document.createElement("p");
runnerUp.innerHTML = SecondPlace.name;
secondGameContainer.appendChild(runnerUp);

/************************************************************************************
 * Customization
 *  Adding search bar to filter games
 */

const searchBar = document.getElementById("game-search-in");

function filterKeyword() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that match the search
    let searchValue = searchBar.value.toLowerCase();

    if (searchValue == ""){
        addGamesToPage(GAMES_JSON);
        return;
    }

    let filtered = GAMES_JSON.filter( (game) => { return game.name.toLowerCase().includes(searchValue); });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filtered);
}

searchBar.addEventListener("input", filterKeyword);

// const searchBtn = document.getElementById("search-btn");
// searchBtn.addEventListener("click", filterKeyword);
