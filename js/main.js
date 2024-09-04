// 
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const dictionaryContainer = document.querySelector("#dictionaryContainer");


searchButton.addEventListener("click", handleSearch);

function handleSearch() {
    const value = searchInput.value.trim().toLowerCase()
    console.log(value)
    if (value.length > 1){
        loadWord(value);
    }
}

async function loadWord(word){
    try{
        const response = await fetch(API + "" + word)
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        console.log(data); 

    }catch(e){
        console.error('An error occurred:', e);
    }
}