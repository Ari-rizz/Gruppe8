let dogsImages = [];
getDogs();
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsImages = data.message;
        setTimeout(showDogs, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}

let usersApi = [];
getRandomUsers();
async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        usersApi = data.results;
        setTimeout(showUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}

function showDogs() {
    console.log(dogsImages);
}
function showUsers() {
    console.log(usersApi);
}

let dogs = [];
function dogs() {
    // Lager et array som inneholder objekter med dogs. Henter bilde fra dogsImages og navn og bosted fra usersApi
    for (let i = 0; i < dogsImages.length; i++) {
        let dog = {
            image: dogsImages[i],
            name: usersApi[i].name.first, // + " " + usersApi[i].name.last, Vet ikke om vi trenger etternavnet?
            location: usersApi[i].location.city,
        };
        dogs.push(dog);
    }
}
console.log(dogs);
