document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submit").addEventListener("click", function(){
        const name = document.getElementById("countryInput").value;

        // Clear previous content before fetching new data
        document.getElementById("country-info").innerHTML = "";
        document.getElementById("bordering-countries").innerHTML = "";

        fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                const countryData = result[0];
                countryInfo(countryData);
                borderingCountries(countryData.borders);
            })
    })
})

const countryInfo = (countryName) => {
    //Retrieve the Country info section
    let countryI = document.getElementById("country-info")
    let heading = document.createElement("h2");
    heading.textContent = "Country Info:"
    countryI.appendChild(heading);

    let List = document.createElement("ul");
    

    //Set Capital city
    let capital = document.createElement("li");
    capital.textContent = "Capital: " + countryName.capital[0];
    List.appendChild(capital);

    //Set Population
    let pop = document.createElement("li");
    pop.textContent = "Population: " + countryName.population;
    List.appendChild(pop);

    //Set Region
    let reg = document.createElement("li");
    reg.textContent = "Region: " + countryName.region;
    List.appendChild(reg);

    //Add Flag
    let flagImg = document.createElement("img");
    flagImg.src = countryName.flags.svg;
    const label = document.createElement("li");
    label.textContent = "Flag:";
    List.appendChild(label);
    List.appendChild(flagImg);

    //Add everything to the section
    countryI.appendChild(List);

}

const borderingCountries = (borderCodes) =>{
    let url = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let neighborsList = document.getElementById("bordering-countries");
            neighborsList.innerHTML = ""; // Clear previous list
            console.log(data)


            const borderingHeader = document.createElement("ul");
            const header = document.createElement("li");
            const headerText = document.createElement("h3");
            headerText.textContent = "Bordering countries:";
            header.appendChild(headerText);
            borderingHeader.appendChild(header);

            let ul = document.createElement("ul");

            data.forEach(neighbor => {
                let li = document.createElement("li");
                li.textContent = neighbor.name.common;
                
                //Add Flag
                let flagImg = document.createElement("img");
                flagImg.src = neighbor.flags.svg;
                ul.appendChild(li);
                ul.appendChild(flagImg);
            });
            borderingHeader.appendChild(ul);
            neighborsList.appendChild(borderingHeader);
        })
        .catch(error => {
            console.error("Error fetching neighboring countries:", error);
        });
}