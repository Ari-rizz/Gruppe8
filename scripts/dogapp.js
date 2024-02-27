// lager async funksjon som leser api og returnerer data fra https://dog.ceo
let dogsApi = [];
async function getDogs() {
    try {
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();
        dogsApi = data.message;
        setTimeout(showDogs, 100);
    } catch (error) {
        console.log("Kunne ikke laste inn hundedata: " + error);
    }
}
function showDogs() {
    console.log(dogsApi);
}
