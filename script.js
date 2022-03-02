//variables
const form=document.getElementById("form");
const search=document.getElementById("search");
const result=document.getElementById("result");


const apiURL= "https://api.lyrics.ovh";

// get input value

form.addEventListener("submit",e=>{
    e.preventDefault();
    searchvalue=search.value.trim();


    if(!searchvalue)
    {
        alert("Nothing to Search");
    }
    else{
        beginSearch(searchvalue);
    
    }
})


//CREATE SEARCH FUNCTION

async function beginSearch(searchvalue){
    const searchResult =await fetch(`${apiURL}/suggest/${searchvalue}`);
    const data = await searchResult.json();
    console.log(data);
    displayData(data);
     
}

//DISPLAY SEARCH RESULTS
function displayData(data)
{
    result.innerHTML = `
    <ul class="songs">
        ${data.data
        .map(song=>  `<li>
                <div>
                    <strong>${song.artist.name}</strong> - ${song.title}
                </div>
                <span data-artist="${song.artist.name}"
                data-songtitle="${song.title}">Get Lyrics</span>
         </li>`)

         .join('')}
        
        
    </ul>
    `;
}

// GET LYRICS FUNCTION


result.addEventListener("click",e =>{
    const clickedElement= e.target;

    // check getlyrics button

    if(clickedElement.tagName === 'SPAN')
    {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
    
        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle)
{
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);


    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}