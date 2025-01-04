document.getElementById("search")?.addEventListener("click",searchDestinations);
document.getElementById("clear")?.addEventListener("click",clearSearch);

function searchDestinations() {
    var searchString = document.getElementById("searchtext").value.trim().toLowerCase();
    console.log("searchDestinations for "+searchString);
    
    fetch("travel_recommendation_api.json")
        .then(response=>response.json())
        .then(data=>{
            var results = ( searchString === "country" || searchString === "countries ") ?
                data.countries.reduce((accum,current)=>{return accum.concat(current.cities)},[]) :
                ( data.countries.find(item=>item.name.toLowerCase()===searchString)?.cities
                    ?? data[searchString] ) ;
            document.getElementById("results").innerHTML = 
                results.map(d=>`
                    <div class="destination">
                        <img src="./img/${d.imageName}"></img>
                        <h3>${d.name}</h3>
                        <p>${d.description}</p>
                        <p>Image by ${d.imageBy}<br/>
                        licensed under ${d.imageLicense}<br/>
                        Taken from <a href="https://commons.wikimedia.org/wiki/File:${d.imageSource}">https://commons.wikimedia.org/wiki/File:${d.imageSource}</a></p>
                    </div>
                    <br/>
                `).join("");
        })
        .catch(error=>{
            alert("An error occurred while fetching the data")
        });

}

function clearSearch(){
    document.getElementById("searchtext").value = "";
    document.getElementById("results").innerHTML = "";
}