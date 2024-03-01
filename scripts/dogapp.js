let dogsObjects = []; // Henter inn bilder fra dog.ceo
let usersApi = []; // Henter inn navn og bosted fra randomuser.me
let dogs = []; // Oppretter array som skal inneholde objekter til kortene.
let cardSection = document.querySelector(".card-section");

const breeds = [
    {
        Labrador: "labrador",
        filter: false,
    },
    {
        Bulldog: "bulldog",
        filter: false,
    },
    {
        Pitbull: "pitbull",
        filter: false,
    },
    {
        GoldenRetriver: "retriever-golden",
        filter: false,
    },
    {
        Husky: "husky",
        filter: false,
    },
]; // for filtrering av hunder, valgte bare 5 tilfeldigee
getDogs();

async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsObjects = data.message;
        setTimeout(getRandomUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(makeDogsArray, 1000);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}

function makeDogsArray() {
    // Lager et array som inneholder objekter med dogs. Henter bilde fra dogsImages og navn og bosted fra usersApi
    console.log("Lager dogs-arrayet");
    console.log(dogsObjects.length);
    console.log(usersApi.length);
    for (let i = 0; i < dogsObjects.length; i++) {
        let dog = {
            image: dogsObjects[i],
            name: usersApi[i].name.first, // + " " + usersApi[i].name.last, Vet ikke om vi trenger etternavnet?
            location: usersApi[i].location.city,
            // breed:fuksjon for breedfilter
        };
        dogs.push(dog);
    }
    console.log(dogs);
    filterDogsOnRase();
}

function filterDogsOnRase() {
    const rase = "retriever-golden";
    let filtereddogs = dogs.filter((dog) => dog.image.includes(rase));
    console.log(filtereddogs);
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
        });

        dogCard.appendChild(deleteButton);

        const chatButton = document.createElement("button");
        chatButton.textContent = "Chat";
        chatButton.addEventListener("click", () => {
            //Chat funskjon her
        });
        dogCard.appendChild(chatButton);

        cardSection.appendChild(dogCard);
    });
}
