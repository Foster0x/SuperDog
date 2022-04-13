// Global variable
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];
// Builds the dropdown with a list of unique cities - Fires on load
function buildDropDown() {

    // First step is to get a handle on the dropdown
    let eventDD = document.getElementById("eventDropDownList");
    // Reset the list
    eventDD.innerHTML = "";

    //<li><a class="dropdown-item" href="#"></a></li>

    // Get the template
    let ddTemplate = document.getElementById("dropDown-template");

    // Grab the template node
    let ddItem = document.importNode(ddTemplate.content, true);

    // Add the all item to the dropdown
    let ddLink = ddItem.querySelector("a");
    ddLink.setAttribute("data-city", "All");
    ddLink.textContent = "All";
    eventDD.appendChild(ddItem);

    // Add links for the unique cities
    let curEvents = getEvents();
    // Get the data

    // Get unique array of city names
    let distinctCities = [...new Set(curEvents.map((event) => event.city))];


    // Filter that data to unique set of cities
    for (let index = 0; index < distinctCities.length; index++) {
        let ddItem = document.importNode(ddTemplate.content, true);
        // Add each city to the dropdown
        let ddLink = ddItem.querySelector("a");
        ddLink.setAttribute("data-city", distinctCities[index]);
        ddLink.textContent = distinctCities[index];
        eventDD.appendChild(ddItem);
    }
    let statsHeader = document.getElementById("statsHeader")
    statsHeader.innerHTML = `Stats for All events`;

    displayStats(curEvents);
}
// Called everytime a city is clicked in the dropdown
function getEventData(element) {
    let city = element.getAttribute("data-city");

    // Create the stats for the clicked city
    let curEvents = getEvents();
    let filteredEvents = curEvents;

    if (city != 'All') {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }
    // Set the header
    let statsHeader = document.getElementById("statsHeader")
    statsHeader.innerHTML = `Stats for ${city} events`;

    // Call function ti display the stats
    displayStats(filteredEvents);

}
// Pulling the events from local storage or default array events
function getEvents() {
    let curEvents = JSON.parse(localStorage.getItem("eventData"));
    if (curEvents === null) {
        curEvents = events;
        localStorage.setItem("eventData", JSON.stringify(curEvents));
    }
    return curEvents;
}
// This function displays stats for the selected city
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {

        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }
    average = total / filteredEvents.length;
    // Write my values to the page
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );

}
