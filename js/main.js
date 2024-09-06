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

    const value = searchInput.value.trim().toLowerCase();
    
    console.log(value);
    if (value.length > 1){ // Check size of the input
        loadWord(value); // value
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

function showResult(results){
    for (const result of results) {
        const resultDiv = document.createElement("div"); // For all words meannings
        resultDiv.classList.add("resultContainer"); //  first iteration
        
        // word and phonetics
        const firstDiv = document.createElement("div"); // word and phonetics
        firstDiv.classList.add("firstDiv"); // first iteration

        const resultWord = document.createElement("h1"); // word
        resultWord.classList.add("resultWord");
        resultWord.textContent = result.word;

        const resultPhonetics = document.createElement("div"); // phonetics
        resultPhonetics.classList.add("resultPhonetics"); // first iteration
        for (const phonetic of result.phonetics){
            if (phonetic.audio && phonetic.text){
                const phoneticText = document.createElement("p"); // phonetic text
                const audioEl = document.createElement("audio");
                audioEl.src = phonetic.audio; // Set the source of the audio element
                audioEl.controls = true;
                phoneticText.textContent = phonetic.text;

                resultPhonetics.appendChild(audioEl);
                resultPhonetics.appendChild(phoneticText);   
            }
            
        }
        firstDiv.appendChild(resultWord);
        firstDiv.appendChild(resultPhonetics);
        

        const secondDiv = document.createElement("div");
        secondDiv.classList.add("secondDiv");
        for (const meaning of result.meanings){ // meanings
            const partOfSpeech = document.createElement("p");
            partOfSpeech.classList.add("partOfSpeech");
            if (meaning.partOfSpeech){ // Check if exists
                partOfSpeech.textContent = meaning.partOfSpeech;
            }
            secondDiv.appendChild(partOfSpeech);
            
            for (const def of meaning.definitions){
                const definition = document.createElement("p");
                definition.classList.add("definition");
                if (def.definition){ // Check if exists
                    definition.textContent = def.definition;
                }
                secondDiv.appendChild(definition);
            }
        }

        // append in div main
        resultDiv.appendChild(firstDiv);
        resultDiv.appendChild(secondDiv);
        dictionary.appendChild(resultDiv);
    }
}

