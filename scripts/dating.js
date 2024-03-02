let people = [];

async function getRandomUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=50&nat=no&inc=name,location"
        );
        const data = await response.json();
        people = data.results;
        setTimeout(showUsers, 500);
    } catch (error) {
        console.log("Kunne ikke laste inn brukerdata: " + error);
    }
}
function showUsers() {
    console.log(people);
}
const profileCard = document.querySelector(`profile`)

function swipeLeftAndRigth(event){

if(evnet.key === `ArrowLeft`){
    newProfile();
}
else if(event.key === `ArrowRigth`){
    newProfile();
}
};