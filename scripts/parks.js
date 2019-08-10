"use strict";

/* 
* This function creates the Header Row for the Tours table.
* 
* @param table (HTML Element) - The Tours table element
*/
function createHeadRow(table)
{
    let header = table.createTHead();
    header.className = "thead-dark";

    let headerRow = header.insertRow(0);

    let headerCell0 = headerRow.insertCell(0);
    headerCell0.innerHTML = "Location Name";

    let headerCell1 = headerRow.insertCell(1);
    headerCell1.innerHTML = "Address";

    let headerCell2 = headerRow.insertCell(2);
    headerCell2.innerHTML = "Phone Number";

    let headerCell3 = headerRow.insertCell(3);
    headerCell3.innerHTML = "Location";

    let headerCell4 = headerRow.insertCell(4);
    headerCell4.innerHTML = "Visit";
}

/* 
* This function inserts a new row into the Tours body table element.
* 
* @param body (HTML Element) - The Tours body table element
* @param tours (Array) - The Tours array
* @param i (index to array) - The Tours arrays index
*/
function insertRow(body, parks, i)
{
    let row = body.insertRow(body.rows.length);

    // Column 0 - Location Name Data
    let cell0 = row.insertCell(0);
    cell0.innerHTML = parks[i].LocationName;

    // Column 1 - Address Data (cobined address, city, state and zip code)
    let cell1 = row.insertCell(1);

    if (parks[i].Address == "0")
    {
        if (parks[i].ZipCode == "0")
        {
            cell1.innerHTML = parks[i].City + ", " + parks[i].State;
        }
        else
        {
            cell1.innerHTML = parks[i].City + ", " + parks[i].State + "  " + parks[i].ZipCode;
        }
    }
    else
    {
        if (parks[i].ZipCode == "0")
        {
            cell1.innerHTML = parks[i].Address + "<br />" + parks[i].City + ", " + parks[i].State;
        }
        else
        {
            cell1.innerHTML = parks[i].Address + "<br />" + parks[i].City + ", " + parks[i].State + "  " + parks[i].ZipCode;
        }
    }

    // Column 2 - Phone Number Data
    let cell2 = row.insertCell(2);

    if (parks[i].Phone != "0")
    {
        cell2.innerHTML = parks[i].Phone;
    }
    else
    {
        cell2.innerHTML = "&nbsp";
    }

    // Column 3 - Location Data (cobined Longitude and Latitude)
    let cell3 = row.insertCell(3);
    cell3.innerHTML = "Long: " + parks[i].Longitude + "<br /> Lat: " + parks[i].Latitude;

    // Column 4 - Visit Data
    let cell4 = row.insertCell(4);
    cell4.id = "visitField";

    if (parks[i].Visit != undefined)
    {
        let parkVisit = document.createElement("a");
        parkVisit.href = parks[i].Visit;
        parkVisit.innerHTML = '<img id="websiteIcon" alt="Website Link" class="" src="images/www.png">';
        parkVisit.target = "_blank";
        parkVisit.title = parks[i].Visit;
        cell4.appendChild(parkVisit);
    }
    else
    {
        cell4.innerHTML = "&nbsp";
    }
}

//Connect Events to HTML Elements
window.onload = function ()
{
    const locationSelect = document.getElementById("locationSelect");
    locationSelect.style.display = 'block';

    const typeSelect = document.getElementById("typeSelect");
    typeSelect.style.display = 'none';

    const selectLocationField = document.getElementById("selectLocation");

    const selectParkField = document.getElementById("selectPark");

    const table = document.getElementById("parks");

    const nationalParkPic = document.getElementById("outdoorsPic");

    const searchByLocation = document.getElementById("searchByLocation");

    const searchByParkType = document.getElementById("searchByParkType");

    const showAllBtn = document.getElementById("showAllBtn");

    // Search By Radio Buttons (By Location or By Park Type)
    searchByLocation.onclick = function ()
    {
        typeSelect.style.display = 'none';
        locationSelect.style.display = 'block';
        selectLocationField.value = "None";
        table.innerHTML = "";
        nationalParkPic.style.display = "block";
    }

    searchByParkType.onclick = function ()
    {
        typeSelect.style.display = 'block';
        locationSelect.style.display = 'none';
        selectParkField.value = "None";
        table.innerHTML = "";
        nationalParkPic.style.display = "block";
    }

    // Get all data from States JSON file and load location selection drop-down
    $.getJSON("data/states.json",
        function (states)
        {
            let statesList = states
            let statesLength = statesList.states.length;

            for (let i = 0; i < statesLength; i++)
            {
                let option = document.createElement("option");
                option.value = statesList.states[i].name;
                option.innerHTML = statesList.states[i].name;

                selectLocationField.appendChild(option);
            }
        })

    // Get all data from Park Types array and load park type selection drop-down
    let parkTypes = [
            { type: "National Park" }, { type: "National Monument" },
            { type: "Recreation Area" }, { type: "Scenic Trail" },
            { type: "Battlefield" }, { type: "Historic" }, { type: "Memorial" },
            { type: "Preserve" }, { type: "Island" }, { type: "River" },
            { type: "Seashore" }, { type: "Trail" }, { type: "Parkway" }
        ]

    let parkTypesLength = parkTypes.length;

    for (let i = 0; i < parkTypesLength; i++)
    {
        let option = document.createElement("option");
        option.value = parkTypes[i].type;
        option.innerHTML = parkTypes[i].type;

        selectParkField.appendChild(option);
    }

    // Get all data from National Parks JSON file
    $.getJSON("data/nationalparks.json",
        function (nationalparks)
        {
            let objs = nationalparks;
            let parksLength = objs.parks.length;

            // Select Location Field changed
            selectLocationField.onchange = function ()
            {
                if (selectLocationField.value == "None")
                {
                    nationalParkPic.style.display = "block";

                    table.innerHTML = "";
                }
                else
                {
                    nationalParkPic.style.display = "none";

                    table.innerHTML = "";

                    // Call Create Table Head Row Function
                    createHeadRow(table);

                    let body = table.createTBody();

                    for (let i = 0; i < parksLength; i++)
                    {
                        // Call Insert Table Row Function
                        if (selectLocationField.value == objs.parks[i].State)
                        {
                            insertRow(body, objs.parks, i);
                        }
                    }
                }
            }

            // Select Park Type Field changed
            selectParkField.onchange = function ()
            {
                if (selectParkField.value == "None")
                {
                    nationalParkPic.style.display = "block";

                    table.innerHTML = "";
                }
                else
                {
                    nationalParkPic.style.display = "none";

                    table.innerHTML = "";

                    // Call Create Table Head Row Function
                    createHeadRow(table);

                    let body = table.createTBody();

                    let str = "";

                    let locationCheck = "";

                    let found = "";

                    for (let i = 0; i < parksLength; i++)
                    {
                        str = selectParkField.value.toLowerCase();

                        locationCheck = objs.parks[i].LocationName.toLowerCase();

                        found = locationCheck.includes(str);

                        // Call Insert Table Row Function
                        if (found)
                        {
                            insertRow(body, objs.parks, i);
                        }
                    }
                }
            }

            // Show All Button clicked
            showAllBtn.onclick = function ()
            {
                table.innerHTML = "";

                selectLocationField.value = "None";
                selectParkField.value = "None";

                // Call Create Table Head Row Function
                createHeadRow(table);

                let body = table.createTBody();

                // Call Insert Table Row Function
                for (let i = 0; i < parksLength; i++)
                {
                    insertRow(body, objs.parks, i);
                }
            }
        })
}

