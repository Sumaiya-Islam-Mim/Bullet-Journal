// script.js

const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));  // Serve static files from a "public" directory.

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




// Function to add a new task to the daily tasks list
function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskValue = taskInput.value.trim();
    
    if (taskValue !== "") {
        // Create a new list item
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskValue));
        
        // Add the task to the task list
        document.getElementById('tasks-list').appendChild(li);
        
        // Clear the input field after adding
        taskInput.value = "";
    }
}

// Add event listener to allow pressing "Enter" to add a task
document.getElementById('new-task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});





$(document).ready(function() {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        // Set the default view to the year 2025
        defaultView: 'month',  // You can change it to "agendaWeek", "agendaDay" if needed
        defaultDate: '2025-01-01', // Set the default date to January 1st, 2025
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            // Example events
            {
                title: 'Event 1',
                start: '2025-01-10'
            },
            {
                title: 'Event 2',
                start: '2025-02-15'
            }
        ]
    });
});







document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById("calendar-body");
    const monthYear = document.getElementById("month-year");

    function generateCalendar(year) {
        let date = new Date(year, 0, 1);
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        for (let month = 0; month < 12; month++) {
            let firstDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            let daysInMonth = lastDay.getDate();
            let startDay = firstDay.getDay();

            let calendarHtml = `<h3>${monthNames[month]} ${year}</h3>`;
            calendarHtml += `<table><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>`;

            // Add empty cells for the days before the first day of the month
            let row = "<tr>";
            for (let i = 0; i < startDay; i++) {
                row += "<td></td>";
            }

            // Add the actual days
            for (let day = 1; day <= daysInMonth; day++) {
                if ((startDay + day - 1) % 7 === 0 && day !== 1) {
                    calendarHtml += row + "</tr>";
                    row = "<tr>";
                }
                row += `<td>${day}</td>`;
            }

            // Fill the last row if needed
            calendarHtml += row + "</tr></tbody></table>";

            // Append the month to the calendar container
            calendarBody.innerHTML += calendarHtml;
        }
    }

    // Generate the calendar for the year 2025
    generateCalendar(2025);
});




