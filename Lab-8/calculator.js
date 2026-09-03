function add(){
    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    let result= parseFloat(num1)+parseFloat(num2);

    document.getElementById("result").innerHTML="The sum is: "+result;
}

function subtract(){
    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    let result= num1-num2;

    document.getElementById("result").innerHTML="The difference is: "+result;
}

function multiply(){
    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    let result= num1*num2;

    document.getElementById("result").innerHTML="The product is: "+result;
}

function divide(){
    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    let result= num1/num2;

    document.getElementById("result").innerHTML="The quotient is: "+result;
}