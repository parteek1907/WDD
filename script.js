// Convert marks to the grade point used in the grade table.
function getGradePoint(mark) {
    if (mark >= 90) return 10;
    if (mark >= 80) return 9;
    if (mark >= 70) return 8;
    if (mark >= 60) return 7;
    if (mark >= 50) return 6;
    if (mark >= 40) return 5;
    return 0;
}

// Calculator page: add another subject row.
function addSubject() {
    var body = document.querySelector("#subjectTable tbody");
    var number = body.rows.length + 1;
    var row = body.insertRow();
    row.innerHTML = '<td><input type="text" placeholder="Subject ' + number + '" aria-label="Subject name"></td>' +
        '<td><input type="number" min="0" max="100" class="marks" placeholder="0–100" aria-label="Marks" inputmode="decimal"></td>' +
        '<td><input type="number" min="0.5" step="0.5" class="credits" placeholder="e.g. 4" aria-label="Credits" inputmode="decimal"></td>';
}

// Calculator page: calculate a credit-weighted semester CGPA.
function calculateCGPA() {
    var marks = document.getElementsByClassName("marks");
    var credits = document.getElementsByClassName("credits");
    var totalPoints = 0;
    var totalCredits = 0;
    var result = document.getElementById("result");

    for (var i = 0; i < marks.length; i++) {
        if (marks[i].value === "" && credits[i].value === "") continue;
        var mark = Number(marks[i].value);
        var credit = Number(credits[i].value);
        if (marks[i].value === "" || credits[i].value === "" || mark < 0 || mark > 100 || credit <= 0) {
            result.textContent = "Enter a mark from 0 to 100 and credits greater than 0 for each started subject.";
            result.className = "result-box error";
            return;
        }
        totalPoints += getGradePoint(mark) * credit;
        totalCredits += credit;
    }

    if (totalCredits === 0) {
        result.textContent = "Add marks and credits for at least one subject to calculate your CGPA.";
        result.className = "result-box error";
        return;
    }
    result.textContent = "Your semester CGPA is " + (totalPoints / totalCredits).toFixed(2) + " out of 10.";
    result.className = "result-box success";
}

// Dashboard page: store semester results locally in this browser.
var semesterStorageKey = "gradePathSemesters";
function loadSemesters() {
    try { return JSON.parse(localStorage.getItem(semesterStorageKey)) || []; }
    catch (error) { return []; }
}
function saveSemesters(semesters) {
    localStorage.setItem(semesterStorageKey, JSON.stringify(semesters));
}
function addSemester() {
    var semesters = loadSemesters();
    semesters.push({ cgpa: "", credits: "" });
    saveSemesters(semesters);
    renderDashboard();
}
function removeSemester(index) {
    var semesters = loadSemesters();
    semesters.splice(index, 1);
    saveSemesters(semesters);
    renderDashboard();
}
function updateSemester(index, field, value) {
    var semesters = loadSemesters();
    semesters[index][field] = value;
    saveSemesters(semesters);
    renderDashboard();
}
function renderDashboard() {
    var rows = document.getElementById("semesterRows");
    if (!rows) return;
    var semesters = loadSemesters();
    rows.innerHTML = "";
    semesters.forEach(function (semester, index) {
        var row = rows.insertRow();
        row.innerHTML = '<td>Semester ' + (index + 1) + '</td>' +
            '<td><input type="number" min="0" max="10" step="0.01" value="' + semester.cgpa + '" placeholder="0–10" aria-label="Semester ' + (index + 1) + ' CGPA" onchange="updateSemester(' + index + ', \'cgpa\', this.value)"></td>' +
            '<td><input type="number" min="0.5" step="0.5" value="' + semester.credits + '" placeholder="Credits" aria-label="Semester ' + (index + 1) + ' credits" onchange="updateSemester(' + index + ', \'credits\', this.value)"></td>' +
            '<td><button class="remove-button" type="button" onclick="removeSemester(' + index + ')">Remove</button></td>';
    });
    var valid = semesters.filter(function (s) { return s.cgpa !== "" && s.credits !== "" && Number(s.cgpa) >= 0 && Number(s.cgpa) <= 10 && Number(s.credits) > 0; });
    var creditsTotal = 0;
    var pointsTotal = 0;
    valid.forEach(function (s) { creditsTotal += Number(s.credits); pointsTotal += Number(s.cgpa) * Number(s.credits); });
    document.getElementById("currentCgpa").textContent = creditsTotal ? (pointsTotal / creditsTotal).toFixed(2) : "—";
    document.getElementById("semesterCount").textContent = valid.length;
    document.getElementById("latestCgpa").textContent = valid.length ? Number(valid[valid.length - 1].cgpa).toFixed(2) : "—";
    document.getElementById("latestLabel").textContent = valid.length ? "Semester " + (semesters.indexOf(valid[valid.length - 1]) + 1) : "Add a result to begin";
    document.getElementById("emptyState").className = semesters.length ? "empty-state" : "empty-state show";
    var chart = document.getElementById("chart");
    chart.innerHTML = "";
    valid.forEach(function (s) {
        var semesterNumber = semesters.indexOf(s) + 1;
        var item = document.createElement("div");
        item.className = "chart-item";
        item.innerHTML = '<span class="chart-value">' + Number(s.cgpa).toFixed(2) + '</span><div class="chart-bar" style="height:' + Math.max(4, Number(s.cgpa) * 10) + '%"></div><span class="chart-label">Sem ' + semesterNumber + '</span>';
        chart.appendChild(item);
    });
    if (!valid.length) chart.innerHTML = '<p class="muted">Add CGPA and credit values to see the chart.</p>';
}

// Goal planner page: find the average GPA needed next semester.
function setupPlanner() {
    var form = document.getElementById("plannerForm");
    if (!form) return;
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var current = Number(document.getElementById("currentGpa").value);
        var completed = Number(document.getElementById("completedCredits").value);
        var next = Number(document.getElementById("nextCredits").value);
        var target = Number(document.getElementById("targetGpa").value);
        var title = document.getElementById("planTitle");
        var text = document.getElementById("planText");
        var score = document.getElementById("requiredScore");
        var hint = document.getElementById("planHint");
        if (current < 0 || current > 10 || target < 0 || target > 10 || completed < 0 || next <= 0) {
            title.textContent = "Check your values";
            text.textContent = "CGPA values should be between 0 and 10, completed credits cannot be negative, and next semester credits must be greater than 0.";
            score.innerHTML = "—<small> / 10</small>";
            return;
        }
        var required = (target * (completed + next) - current * completed) / next;
        if (required > 10) {
            title.textContent = "This target is out of reach next semester";
            text.textContent = "The required GPA is " + required.toFixed(2) + ", which is above the maximum of 10. Try a lower target or plan across more semesters.";
            score.innerHTML = required.toFixed(2) + '<small> / 10</small>';
            hint.textContent = "A longer plan may make this target more achievable.";
        } else if (required <= 0) {
            title.textContent = "You are already on track";
            text.textContent = "Your current CGPA is enough to meet this target, even with a 0 GPA next semester.";
            score.innerHTML = "0.00<small> / 10</small>";
            hint.textContent = "Keep up your studies to maintain your progress.";
        } else {
            title.textContent = "Aim for this semester GPA";
            text.textContent = "To reach an overall CGPA of " + target.toFixed(2) + ", aim for at least this average next semester.";
            score.innerHTML = required.toFixed(2) + '<small> / 10</small>';
            hint.textContent = "This is an estimate based on the credits you entered.";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderDashboard();
    setupPlanner();
});
