function addC(a, b){
    return a+b;
}

function subC(a, b){
    return a-b;
}


function multiplyC(a, b){
    return a*b;
}

function divideC(a, b){
    return a/b ;
}

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return addC(num1, num2);
        case '-':
            return subC(num1, num2);
        case '*':
            return multiplyC(num1, num2);
        case '/':
            return divideC(num1, num2);
    }
}