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
    console.log(breed);
    cardSection.innerHTML = "";
    // Henter hundene fra dogs der image inneholder breed som valgt i pull-down-menyen
    filteredDogs = dogs.filter((dog) => {
        return dog.image.includes(breed);
    });
    console.log(filteredDogs);
    filteredDogs.forEach((dog, index) => {
        const dogCard = document.createElement("article");
        dogCard.classList.add("card");
        dogCard.innerHTML = `<img src= "${filteredDogs[index].image}" alt="${filteredDogs[index].name}" style="width: 100%">`;
        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${filteredDogs[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${filteredDogs[index].location}</p>`;
        dogCard.appendChild(dogInfo);
        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            //Chat funksjon her
        });
        dogCard.appendChild(chatButton);
        //kaller på showGreeting når kortet blir trykket på
        dogCard.addEventListener("click", () => {
            showGreeting(dogCard);
        });
        cardSection.appendChild(dogCard);
    });
}

fetchBreedDogs();
async function fetchBreedDogs() {
    breeds.forEach(async (breed) => {
        if (breed.breed === "dittvalg") {
            console.log("Hopp over");
        } else {
            if (breed.breed === "retriever-golden") {
                breed.breed = "retriever/golden";
            }
            try {
                const response = await fetch(
                    `https://dog.ceo/api/breed/${breed.breed}/images/random/25`
                );
                const data = await response.json();
                setTimeout(buildDogsImages(data.message), 70);
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
    console.log(dogsImages.length);
    return;
}
// Fetch som henter 50 navn og bosteder
async function fetchRandomUsers() {
    console.log("fetchRandomUsers, lengden på dogsImages");
    try {
        const response = await fetch(
            `https://randomuser.me/api/?results=${dogsImages.length}&nat=no&inc=name,location,picture.large`
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(makeDogsArray, 70);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}
// Funksjon som setter sammen objektene med bilde, navn og bosted
function makeDogsArray() {
    for (let i = 0; i < dogsImages.length; i++) {
        let dog = {
            human: usersApi[i].picture.large,
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
    // createDogsProfileCard();
    renderCards();
}
// Bruker Fisher-Yates-metoden til å blande hunderasene i tilfeldig rekkefølge
function shuffleDogs(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderCards() {
    // Funksjon som skal vise 10 og 10 kort fra dogs på skermen
    cardSection.innerHTML = ""; // Tømmer skjermen
    console.log("Da var vi klare til å vise frem kort på skjermen");
    unikeDogs = getTenRandomDogs();
}

function getTenRandomDogs() {
    const unikeDogs = [];
    while (unikeDogs.length < 10) {
        const randomNumber = Math.floor(Math.random() * dogs.length);
        if (!unikeDogs.includes(randomNumber)) {
            unikeDogs.push(randomNumber);
        }
    }
    return unikeDogs;
    // console.log(unikeDogs);
}

function createDogsProfileCard(displayDogs) {
    cardSection.innerHTML = "";
    displayDogs.forEach((dog, index) => {
        const dogCard = document.createElement("article");
        dogCard.classList.add("card");
        dogCard.innerHTML = `<img src= "${displayDogs[index].image}" alt="${displayDogs[index].name}" style="width: 100%">`;

        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${displayDogs[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${displayDogs[index].location}</p>`;
        dogCard.appendChild(dogInfo);

        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            //Chat funksjon her
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Slett";
        deleteButton.addEventListener("click", () => {
            dogCard.remove();
            displayDogs.splice(index, 1); //fjerner hunden fra arrayet
            replaceCard();
        });
        dogCard.appendChild(deleteButton);

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

let showDogsCounter = 0;

// function showDogs() {
//     const showingDogs = 10; // antall hunder som vises
//     const displayDogs = dogs.slice(
//         showDogsCounter,
//         showDogsCounter + showingDogs
//     ); //legger hundene som er vist inn i displayDogs (tar ut og legges i nytt array)

//     if (dogs.length <= showingDogs) {
//         getDogs();
//     }

//     createDogsProfileCard(displayDogs);
//     showDogsCounter += showingDogs;
//     console.log("nye hunder", displayDogs);
// }

//function for å erstatte det slettede elemente
// function replaceCard() {
//     const newDogIndex = Math.floor(
//         Math.random() * (dogsImages.length, usersApi.length)
//     );
//     const newDog = {
//         image: dogsImages[newDogIndex],
//         name: usersApi[newDogIndex].name.first,
//         location: usersApi[newDogIndex].location.city,
//     };
//     const randomIndex = Math.floor(Math.random() * displayDogs.length); // bruker Math.random for å velge en tillfeldig index i display dogs
//     displayDogs[randomIndex] = newDog; // fjerner den gamle og bytter ut hunden fra randomindex men en ny hund

//     displayDogs.push(newDog);
//     createDogsProfileCard(displayDogs);
// }

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
