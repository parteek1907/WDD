let form = document.getElementById("grade-form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let total = 0;

    for (let i = 1; i <= 6; i++) {

        let internal = Number(document.getElementById("internal" + i).value);
        let external = Number(document.getElementById("external" + i).value);

        total = total + internal + external;
    }

    let percentage = (total / 600) * 100;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else if (percentage >= 50) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    document.getElementById("total").textContent =
        "Total Marks: " + total + " / 600";

    document.getElementById("percentage").textContent =
        "Percentage: " + percentage.toFixed(2) + "%";

    document.getElementById("grade").textContent =
        "Final Grade: " + grade;
});