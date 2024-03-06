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
        setTimeout(makeDogsArray, 70);
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

        const humanImg = document.createElement("div");
        humanImg.innerHTML = `<img src="${array[index].human}" alt="${array[index].name}">`;
        humanImg.style.display = "flex";
        humanImg.style.position = "relative";
        humanImg.style.zIndex = "100";
        humanImg.style.top = "10px";

        const dogInfo = document.createElement("div");
        dogInfo.classList.add("container");
        dogInfo.innerHTML += `<h3>${array[index].name}</h3>`;
        dogInfo.innerHTML += `<p>${array[index].location}</p>`;
        dogCard.appendChild(dogInfo);

        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            //Chat funksjon her
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
    const displayDogs = dogs.slice(
        showDogsCounter,
        showDogsCounter + showingDogs
    ); //legger hundene som er vist inn i displayDogs (tar ut og legges i nytt array)
    createDogsProfileCard(displayDogs, delBtn);
    showDogsCounter += showingDogs;
}

//function for å erstatte det slettede elemente
function replaceCard(index) {
    delBtn = true;
    // fjern det kortet fra displayDogs-arrayet
    displayDogs.splice(index, 1);
    // lager en tilfeldig index for ny hund fra dogs arrayet
    const newDogIndex = Math.floor(Math.random() * dogs.length);
    // Lager et nytt hundekort, blir mye av den samme koden, kanskje lage en funskjon? funka ikke å brukte createDogProfileCard
    createDogsProfileCard(displayDogs, delBtn);
    // const newDogCard = document.createElement("article");
    // newDogCard.classList.add("card");
    // newDogCard.innerHTML = `<img src="${dogs[newDogIndex].image}" alt="${dogs[newDogIndex].name}" style="width: 100%">`;

    // const dogInfo = document.createElement("div");
    // dogInfo.classList.add("container");
    // dogInfo.innerHTML += `<h3>${dogs[newDogIndex].name}</h3>`;
    // dogInfo.innerHTML += `<p>${dogs[newDogIndex].location}</p>`;
    // newDogCard.appendChild(dogInfo);

    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "Slett";
    // deleteButton.addEventListener("click", () => {
    //     replaceCard(index); //kortet fjernes og erstattes med et nytt
    // });
    // newDogCard.appendChild(deleteButton);
    // const chatButton = document.createElement("button");
    // chatButton.textContent = "Chat";
    // chatButton.addEventListener("click", () => {
    //     // Legg til chatfunksjonen her
    // });
    // newDogCard.appendChild(chatButton);
    // legger til de nye kortet i displayDogs-arrayet og tar ut det gamle
    displayDogs.splice(index, 0, dogs[newDogIndex]);
    // bruker index for å finne korte og replaceWith for og erstatte det med newDogCard
    const cardToRemove = document.querySelectorAll(".card")[index];
    cardToRemove.replaceWith(newDogCard);
}
// chatgbt foreslo at hvis jeg brukte parametere index for å lage en index for det hundekortet ville det gjøre det enklre å fjerne. Foreslo også reaplaceWith.
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
