// 
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const main = document.querySelector("main");

const dictionary = document.createElement("div");
main.appendChild(dictionary);

searchButton.addEventListener("click", handleSearch);

function handleSearch() {
    // Clear any existing dictionary before creating a new one.
    dictionary.innerHTML = ""
    main.removeChild(dictionary);

    const value = searchInput.value.trim().toLowerCase()
    console.log(value)
    if (value.length > 1){ // Check size of the input
        loadWord(value);
        dictionary.classList.add("dictionaryContainer");
        main.appendChild(dictionary)
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
        showResult(data); 
        // Clear the search input field after the search is done.  //  Added this line to clear the search input field after the search is done.  //
        searchInput.value = "" 
    }catch(e){
        console.error('An error occurred:', e);
    }
}

function showResult(result){
    showWord(result);
    const meaningDiv = document.createElement("div");
    meaningDiv.classList.add("meaningsContainer");  //  Added this line to add a class to the div that contains the meanings.  //
    for (const meaning of result[0].meanings){
        const meanText = document.createElement("p");
        meanText.textContent = meaning.partOfSpeech + ":";
        meanText.classList.add("meanings"); 
        meaningDiv.appendChild(meanText);
        for (const word of meaning.definitions){
            const wordText = document.createElement("p");
            wordText.textContent = "- " + word.definition;
            meaningDiv.appendChild(wordText);
        }
       
        
    }
    dictionary.appendChild(meaningDiv);
}

// This function is responsible for creating and populating the HTML elements to display the word and its phonetics.
function showWord(result){
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("wordContainer"); // Added this line to

    const wordDiv = document.createElement("h1");
    const phoneticsDiv = document.createElement("div");

    wordDiv.textContent = result[0].word;
    wordDiv.classList.add("word-title");

    phoneticsDiv.classList.add("phonetic"); // Added

    for (const phonetic of result[0].phonetics){
        if (phonetic.audio && phonetic.text){
            const audioEl = document.createElement("audio");
            audioEl.src = phonetic.audio; // Set the source of the audio element
            audioEl.controls = true;

            const textEl = document.createElement("p");
            textEl.textContent = phonetic.text;

            phoneticsDiv.appendChild(textEl);
            phoneticsDiv.appendChild(audioEl);  
            break; // If find only one audio element
        }
    }

    mainDiv.appendChild(wordDiv);
    mainDiv.appendChild(phoneticsDiv);
    dictionary.appendChild(mainDiv);
}