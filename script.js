document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submit").addEventListener("click", function(){
        const name = document.getElementById("countryInput").value;


        fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                const countryData = result[0];
                countryInfo(countryData);
            })
    })
})

const countryInfo = (countryName) => {
    let countryI = document.getElementById("country-info")

    let List = document.createElement("ul");
    

    //Set Capital city
    let capital = document.createElement("li");
    capital.textContent = "Capital: " + countryName.capital[0];
    List.appendChild(capital);

    //Set Population
    let pop = document.createElement("li");
    pop.textContent = "Population: " + countryName.population;
    List.appendChild(pop);
    countryI.appendChild(List);

    //Set Region
    let reg = document.createElement("li");
    reg.textContent = "Region: " + countryName.region;
    List.appendChild(reg);

    //Add Flag
    let flagImg = document.createElement("img");
    flagImg.src = countryName.flags.svg;
    List.appendChild(flagImg);

    //Add bordering countries
    let bordering = document.createElement("ul");
    bordering.id = "neighboursList";

    

}