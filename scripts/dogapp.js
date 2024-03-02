let dogsImages = []; //  bilder fra fecth dog.ceo
let usersApi = []; // navn og bosted hentet fra randomuser.me
let dogs = []; // array som skal inneholde ferdige objekter
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
];
let cardSection = document.querySelector(".card-section");
const sortOnRace = document.querySelector("#sortOnRace"); // Til søkefunksjonen i dropdown-menyen
const raceOptions = document.querySelector("#raceOptions"); // Alternativene i dropdown-menyen

// Lager dropdown-menyen
breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.race;
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
    console.log(sortOnRace.value);
    cardSection.innerHTML = "";
    console.log(dogs);
}

getDogs();
// Fetch som henter 50 bilder av hundene
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsImages = data.message;
        setTimeout(getRandomUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}
// Fetch som henter 50 navn og bosteder
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(makeDogsArray, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}
// Funksjon som setter sammen objektene med bilde, navn og bosted
function makeDogsArray() {
    //Lager en const som skjekker om det er nok hunder //fikk hjelp av chatGBT med math.min, velger den med minst lengde
    const isThereTenDogsLeft = Math.min(dogsImages.length, usersApi.length, 10);
    // Lager et array som inneholder objekter med dogs. Henter bilde fra dogsImages og navn og bosted fra usersApi
    dogs = []; //tømmer arrayet
    for (let i = 0; i < isThereTenDogsLeft; i++) {
        let dog = {
            image: dogsImages[i],
            name: usersApi[i].name.first, // + " " + usersApi[i].name.last, Vet ikke om vi trenger etternavnet?
            location: usersApi[i].location.city,
            // breed:fuksjon for breedfilter
        };
        dogs.push(dog);
    }
    createDogsProfileCard();
}

function createDogsProfileCard() {
    cardSection.innerHTML = "";
    dogs.forEach((dog, index) => {
        const dogCard = document.createElement("article");
        dogCard.classList.add("card");
        dogCard.innerHTML = `<img src= "${dogs[index].image}" alt="${dogs[index].name}" style="width: 100%">`;

        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${dogs[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${dogs[index].location}</p>`;
        dogCard.appendChild(dogInfo);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Slett";
        deleteButton.addEventListener("click", () => {
            dogCard.remove();
            dogs.splice(index, 1); //fjerner hunden fra arrayet
            replaceCard();
        });

        dogCard.appendChild(deleteButton);

        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            //Chat funskjon her
        });
        dogCard.appendChild(chatButton);
        //kaller på showGreeting når kortet blir trykket på
        dogCard.addEventListener("click", () => {
            showGreeting(dogCard);
        });

        cardSection.appendChild(dogCard);
    });
}

const newDogBtn = document.querySelector("#new-dog-btn");
newDogBtn.addEventListener("click", () => {
    showDogs();
});

function showDogs() {
    const showingDogs = 10; // antall hunder som vises
    const shownDogs = dogs.slice(0, showingDogs); //legger hundene som er vist inn i shownDogs (tar ut og legges i nytt array)

    if (dogs.length <= showingDogs) {
        getDogs();
    }
    console.log("nye hunder", shownDogs);
}

//function for å erstatte det slettede elemente
function replaceCard() {
    const newDogIndex = Math.floor(
        Math.random() * (dogsImages.length, usersApi.length)
    );
    const newDog = {
        image: dogsImages[newDogIndex],
        name: usersApi[newDogIndex].name.first,
        location: usersApi[newDogIndex].location.city,
    };
    dogs.push(newDog);
    createDogsProfileCard();
}
// greeting array
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
}
//merget
