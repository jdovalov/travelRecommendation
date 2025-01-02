document.getElementById("search").addEventListener("click",searchDestinations);
document.getElementById("clear").addEventListener("click",clearSearch);

function searchDestinations() {
    var searchString = document.getElementById("searchtext").value.trim().toLowerCase();
    console.log("searchDestinations for "+searchString);
    
    fetch("travel_recommendation_api.json")
        .then(response=>response.json())
        .then(data=>{
            var results = data.countries.find(item=>item.name.toLowerCase()===searchString)?.cities
                ?? data[searchString];
            document.getElementById("results").innerHTML = 
                results.map(d=>`
                    <div class="destination">
                        <img src="./img/${d.imageUrl}"></img>
                        <h3>${d.name}</h3>
                        <p>${d.description}</p>
                    </div>
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