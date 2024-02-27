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
