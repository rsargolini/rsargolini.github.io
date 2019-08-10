"use strict";

/* 
* This function insert rows into the Mountains Table.
*
* @param body (Table Element) - Body table element
* @param rowName (String) - The string for row name
* @param rowData (String) - The string for row data
*/
function insertNewRow(body, rowName, rowData)
{
    let row = body.insertRow(body.rows.length);

    let rowCell0 = row.insertCell(0);
    rowCell0.innerHTML = rowName;
    rowCell0.className = "titleColumn";

    let rowCell1 = row.insertCell(1);
    rowCell1.innerHTML = rowData;
}

/* 
* This function insert rows with images into the Mountains Table.
*
* @param body (Table Element) - Body table element
* @param rowName (String) - The string for row name
* @param images (String) - The string for image file name
* @param names (String) - The string for alt name
*/
function insertNewRowImages(body, rowName, images, names)
{
    let row = body.insertRow(body.rows.length);

    let rowCell0 = row.insertCell(0);
    rowCell0.innerHTML = rowName;
    rowCell0.className = "titleColumn";

    let rowCell1 = row.insertCell(1);

    let img = document.createElement("img");
    img.src = "images/" + images;
    img.alt = names;

    rowCell1.appendChild(img);
}

//Connect Events to HTML Elements
window.onload = function ()
{
    let objs;

    // Get all data from Mountains JSON file and load mountain selection drop-down
    $.getJSON("data/mountains.json",
        function (mountains)
        {
            objs = mountains;
            let selectMountainField = document.getElementById("selectMountain");

            let mountainsLength = objs.mountains.length;

            for (let i = 0; i < mountainsLength; i++)
            {
                let option = document.createElement("option");
                option.value = objs.mountains[i].name;
                option.innerHTML = objs.mountains[i].name;

                selectMountainField.appendChild(option);
            }
        });

    let table = document.getElementById("mountains");

    let body = table.createTBody();

    let mountainPic = document.getElementById("outdoorsPic");

    // If a Mountain not selected display mountain picture, else display table
    let selectMountainField = document.getElementById("selectMountain");
    selectMountainField.onchange = function ()
    {
        body.innerHTML = "";

        if (selectMountainField.value == "None")
        {
            mountainPic.style.display = "block";
        }
        else
        {
            mountainPic.style.display = "none";

            let selectedMountain = (selectMountainField.selectedIndex - 1);

            // Row 1 - Mountain Name
            insertNewRow(body, "Name:", objs.mountains[selectedMountain].name);

            // Row 2 - Mountain Elevation
            insertNewRow(body, "Elevation:", objs.mountains[selectedMountain].elevation);

            // Row 3 - Mountain Effort
            insertNewRow(body, "Effort:", objs.mountains[selectedMountain].effort);

            // Row 4 - Mountain Image
            insertNewRowImages(body, "Image:", objs.mountains[selectedMountain].img, objs.mountains[selectedMountain].name);

            // Row 5 - Mountain Description
            insertNewRow(body, "Description:", objs.mountains[selectedMountain].desc);

            // Row 6 - Mountain Coordinates (combined Longitude and Latitiude)
            let combineCoords = "Longitude: " + objs.mountains[selectedMountain].coords.lng + ",  Latitude: " + objs.mountains[selectedMountain].coords.lat;

            insertNewRow(body, "Coordinates:&nbsp&nbsp", combineCoords);

            // Row 7 - Sunrise and Sunset Times (combined Sunrise and Sunset)

            // Get data from Sunrise-Sunset API 
            $.getJSON("https://api.sunrise-sunset.org/json?lat=" + objs.mountains[selectedMountain].coords.lat + "&lng=" + objs.mountains[selectedMountain].coords.lng + "&date=today",
                function (data)
                {
                    let sunTimes = data
                    let combineTimes = "Sunrise: " + sunTimes.results.sunrise + " UTC<br />Sunset: " + sunTimes.results.sunset + " UTC";
                    insertNewRow(body, "Sunrise and Sunset:", combineTimes);
                });
        }
    }
}