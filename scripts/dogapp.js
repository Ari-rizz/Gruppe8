let dogsImages = []; // Henter inn bilder fra dog.ceo
let usersApi = []; // Henter inn navn og bosted fra randomuser.me
let dogs = []; // array som skal inneholde objekter til kortene.
let displayDogs = []; //array som hundene som blir vist blir plasert inn i.
const breeds = [
    {
        name: "Ditt valg",
        breed: "dittvalg",
    },
    {
        name: "Labrador",
        breed: "labrador",
    },
    {
        name: "Bulldog",
        breed: "bulldog",
    },
    {
        name: "Pitbull",
        breed: "pitbull",
    },
    {
        name: "Golden Retriver",
        breed: "retriever-golden",
    },
    {
        name: "Husky",
        breed: "husky",
    },
]; // array med objekter til de predefinerte hunderasene.
let cardSection = document.querySelector(".card-section");
const sortOnRace = document.querySelector("#sortOnRace"); // Til søkefunksjonen i dropdown-menyen
const raceOptions = document.querySelector("#raceOptions"); // Alternativene i dropdown-menyen

// Lager dropdown-menyen basert på breeds
breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.breed;
    option.textContent = breed.name;
    sortOnRace.appendChild(option);
});
// Ser etter endringer i pull-down-menyen
sortOnRace.addEventListener("change", () => {
    if (sortOnRace.value === "dittvalg") {
        makeDogsArray();
        console.log("do nothing");
    } else {
        showSelectedBreed(sortOnRace.value);
    }
});
// Funksjon som skal vise hundene som er valgt i pull-down-menyen
function showSelectedBreed(breed) {
    cardSection.innerHTML = "";
    // Henter hundene fra dogs der image inneholder breed som valgt i pull-down-menyen
    filteredDogs = dogs.filter((dog) => {
        return dog.image.includes(breed);
    });
    delBtn = false;
    createDogsProfileCard(filteredDogs, delBtn);
}

fetchBreedDogs();
async function fetchBreedDogs() {
    breeds.forEach(async (breed) => {
        // Finner et tilfeldig antall hunder pr rase( 5 - 25)
        const randomNumber = Math.floor(Math.random() * 16) + 5;
        if (breed.breed === "dittvalg") {
            console.log("Hopp over");
        } else {
            if (breed.breed === "retriever-golden") {
                breed.breed = "retriever/golden";
            }
            try {
                const response = await fetch(
                    `https://dog.ceo/api/breed/${breed.breed}/images/random/${randomNumber}`
                );
                const data = await response.json();
                setTimeout(buildDogsImages(data.message), 60);
            } catch (error) {
                console.log("Kunne ikke laste inn hundedata: " + error);
            }
        }
    });
    setTimeout(fetchRandomUsers, 170);
}
// Funksjon som slår sammen arrays med bildene
function buildDogsImages(dogs) {
    dogsImages = dogsImages.concat(dogs); // concat-metoden legger sammen arrays
    return;
}
// Fetch som henter bilde, navn og bosted
async function fetchRandomUsers() {
    try {
        const response = await fetch(
            `https://randomuser.me/api/?results=${dogsImages.length}&nat=no&inc=name,location,picture`
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(makeDogsArray, 60);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}
// Funksjon som setter sammen objektene med bilde, navn og bosted
function makeDogsArray() {
    for (let i = 0; i < dogsImages.length; i++) {
        let dog = {
            human: usersApi[i].picture.medium,
            image: dogsImages[i],
            name: usersApi[i].name.first, // + " " + usersApi[i].name.last, Vet ikke om vi trenger etternavnet?
            location: usersApi[i].location.city,
        };
        // sjekker om bildet finnes fra før i dogs
        if (dogs.includes(dog.image)) {
            console.log("Duplikat");
        } else {
            dogs.push(dog);
        }
    }
    dogs = shuffleDogs(dogs);
    showDogs();
}
// Bruker Fisher-Yates-metoden til å blande hunderasene i tilfeldig rekkefølge
function shuffleDogs(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Parametre:
// arrayet vi skal lage kort fra: array
// boolean som sier om vi skal vise slett-knappen eller ikke: delBtn
function createDogsProfileCard(array, delBtn) {
    cardSection.innerHTML = "";
    array.forEach((dog, index) => {
        const dogCard = document.createElement("article");
        dogCard.classList.add("card");
        dogCard.innerHTML = `<img src= "${array[index].image}" alt="${array[index].name}" style="width: 100%">`;
        dogCard.style.position = "relative";

        const humanImg = document.createElement("div");
        humanImg.style.display = "flex";
        humanImg.style.position = "absolute";
        humanImg.innerHTML = `<img src="${array[index].human}" alt="${array[index].name}" style="width: 90px; border-radius: 50%">`;
        humanImg.style.right = "5px";
        humanImg.style.top = "130px";
        humanImg.style.border = "2px solid darkgrey";
        humanImg.style.borderRadius = "50%";

        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${array[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${array[index].location}</p>`;
        dogCard.appendChild(dogInfo);

        const chatButton = document.createElement("button");
        chatButton.classList.add("chatBtn");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            dogChat(dog);
        });
        if (delBtn === true) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Slett";
            deleteButton.addEventListener("click", () => {
                replaceCard(index);
            });
            dogCard.appendChild(deleteButton);
        }
        dogCard.appendChild(chatButton);
        //kaller på showGreeting når kortet blir trykket på
        dogCard.addEventListener("click", () => {
            showGreeting(dogCard);
        });
        dogCard.appendChild(humanImg);
        cardSection.appendChild(dogCard);
    });
}

const newDogBtn = document.querySelector("#new-dog-btn");
newDogBtn.addEventListener("click", () => {
    sortOnRace.value = "dittvalg";
    showDogsCounter += 10;
    showDogs();
});

let showDogsCounter = 0;

if (showDogsCounter > dogs.length) {
    showDogsCounter = 0;
}

function showDogs() {
    delBtn = true;
    const showingDogs = 10; // antall hunder som vises
    displayDogs = dogs.slice(showDogsCounter, showDogsCounter + showingDogs); //legger hundene som er vist inn i displayDogs (tar ut og legges i nytt array)
    createDogsProfileCard(displayDogs, delBtn);
    showDogsCounter += showingDogs;
}

//function for å erstatte det slettede elemente
function replaceCard(index) {
    delBtn = true;
    // lager en tilfeldig index for ny hund fra dogs arrayet
    const newDogIndex = Math.floor(Math.random() * dogs.length);

    let replacementDog = dogs[newDogIndex];
    displayDogs[index] = replacementDog;
    replacementDog = createDogsProfileCard(displayDogs, delBtn);
}

const greeting = [
    "Voff voff",
    "Grrr!",
    "Mjau?",
    "Voff!",
    "Voff voff voff",
    "WRAFF!!!",
];
// henter en random greeting
function getRandomGreeting() {
    const randomGreeting = Math.floor(Math.random() * greeting.length);
    return greeting[randomGreeting];
}
//randomGreeting vises i som en div
function showGreeting(dogCard) {
    const removeAllGreetings = document.querySelectorAll(".greetings-bubble");
    removeAllGreetings.forEach((greeting) => {
        greeting.remove();
    }); // fjerner alle greetings som er blitt kallt på

    const ifGreeting = dogCard.querySelector(".grettings-bubble");
    if (ifGreeting) {
        ifGreeting.remove();
    } // hvis det er en greeting tilstedet blir den fjernet
    else {
        const greetingsBubble = document.createElement("div");
        greetingsBubble.classList.add("greetings-bubble");
        greetingsBubble.textContent = getRandomGreeting();
        greetingsBubble.style.position = "absolute";
        greetingsBubble.style.background = "white";
        greetingsBubble.style.color = "black";
        greetingsBubble.style.height = "40px";
        greetingsBubble.style.width = "100px";
        greetingsBubble.style.padding = "12px 10px 0px 10px";
        greetingsBubble.style.textAlign = "center";
        greetingsBubble.style.borderRadius = "45%";
        dogCard.appendChild(greetingsBubble);
    } // hvis ingen greeting så blir det opprettet en ny
}
//merget

function dogChat(dog) {
    // Lager en chat-boks nede i høyre hjørne, som dukker opp når vi trykker på chat-knappen.
    let chatContainer = document.querySelector(".chat-container");
    chatContainer.style.display = "flex";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "0px";
    chatContainer.style.right = "200px";

    const topChatBar = document.createElement("div");
    topChatBar.style.display = "flex";
    topChatBar.style.marginBottom = "auto";
    topChatBar.textContent = "Velkommen til dog-chat!";
    topChatBar.style.backgroundColor = "lightgrey";
    const closeChatBtn = document.createElement("button");
    closeChatBtn.textContent = " X ";
    closeChatBtn.style.marginLeft = "auto";
    closeChatBtn.addEventListener("click", () => {
        chatBox.remove();
    });

    topChatBar.append(closeChatBtn);

    const chatBox = document.createElement("div");
    chatBox.style.display = "flex";
    chatBox.style.flexDirection = "column";
    chatBox.style.marginTop = "auto";
    chatBox.style.backgroundColor = "white";
    chatBox.style.color = "black";
    chatBox.style.height = "100%";
    chatBox.style.width = "100%";
    chatBox.style.marginRight = "10px";
    chatBox.style.padding = "5px";

    const nameBox = document.createElement("div");
    nameBox.width = "100%";
    nameBox.innerHTML = `Du chatter nå med ${dog.name}`;

    const chatWindow = document.createElement("div");
    chatWindow.style.display = "flex";
    chatWindow.style.flexDirection = "column";
    chatWindow.innerHTML = `<p>Hei! Vil du passe hunden min?</p>`;

    const answerField = document.createElement("div");
    answerField.style.display = "flex";
    answerField.style.marginTop = "auto";
    const inputField = document.createElement("input");
    inputField.style.width = "80%";
    const answerBtn = document.createElement("button");
    answerBtn.textContent = "Svar";
    answerBtn.addEventListener("click", () => {
        chatWindow.innerHTML += `${inputField.value}<br>`;
        inputField.value = "";
    });

    answerField.append(inputField, answerBtn);

    chatBox.append(topChatBar, nameBox, chatWindow, answerField);
    chatContainer.appendChild(chatBox);
}
