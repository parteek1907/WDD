//square using function
function square(num) {
    console.log(num * num);
}
square(4);

//square using return parameter
function square2(num) {
    return num * num;
}
console.log(square2(10));

//even and odd using function
function checkEvenOdd(num) {
    if (num % 2 === 0) {
        console.log(num + " is even");
    } else {
        console.log(num + " is odd");
    }
}
checkEvenOdd(7);

//area of circle using function
function areaOfCircle(radius) {
    const area = 3.14159 * radius * radius;
    console.log("Area of circle with radius " + radius + " is: " + area);
}
areaOfCircle(5);

//area of rectangle using function
function areaOfRectangle(length, width) {
    const area = length * width;
    console.log("Area of rectangle with length " + length + " and width " + width + " is: " + area);
}
areaOfRectangle(5, 3);

//student grade using function
function checkStudentGrade(score) {
    if (score >= 90) {    
        console.log("Grade: A");
    } else if (score >= 80) {
        console.log("Grade: B");
    } else if (score >= 70) {
        console.log("Grade: C");
    } else if (score >= 60) {
        console.log("Grade: D");
    } else {
        console.log("Grade: F");
    }
}
checkStudentGrade(85);

//factorial using function
function factorial(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
    }
    console.log("Factorial of " + num + " is: " + result);
}
factorial(5);
