function addSubject() {
    var table = document.getElementById("subjectTable");
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    var number = table.rows.length - 1;

    cell1.innerHTML = '<input type="text" placeholder="Subject ' + number + '">';
    cell2.innerHTML = '<input type="number" min="0" max="100" class="marks">';
    cell3.innerHTML = '<input type="number" min="1" class="credits">';
}

function calculateCGPA() {
    var marks = document.getElementsByClassName("marks");
    var credits = document.getElementsByClassName("credits");

    var totalPoints = 0;
    var totalCredits = 0;
    var validSubjects = 0;

    for (var i = 0; i < marks.length; i++) {
        var mark = Number(marks[i].value);
        var credit = Number(credits[i].value);
        var gradePoint = 0;

        if (marks[i].value == "" || credits[i].value == "") {
            continue;
        }

        if (mark < 0 || mark > 100 || credit <= 0) {
            document.getElementById("result").innerHTML = "Please enter valid marks and credits.";
            return;
        }

        if (mark >= 90) {
            gradePoint = 10;
        } else if (mark >= 80) {
            gradePoint = 9;
        } else if (mark >= 70) {
            gradePoint = 8;
        } else if (mark >= 60) {
            gradePoint = 7;
        } else if (mark >= 50) {
            gradePoint = 6;
        } else if (mark >= 40) {
            gradePoint = 5;
        } else {
            gradePoint = 0;
        }

        totalPoints = totalPoints + (gradePoint * credit);
        totalCredits = totalCredits + credit;
        validSubjects = validSubjects + 1;
    }

    if (validSubjects == 0 || totalCredits == 0) {
        document.getElementById("result").innerHTML = "Please enter marks and credits for at least one subject.";
    } else {
        var cgpa = totalPoints / totalCredits;
        document.getElementById("result").innerHTML = "Your CGPA is: " + cgpa.toFixed(2);
    }
}
