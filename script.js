function addC(a, b){
    return Number(a)+Number(b);
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

function powerC(a, b){
    return Math.pow(a, b);
}

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return addC(num1, num2);
        case '-':
            return subC(num1, num2);
        case 'x':
            return multiplyC(num1, num2);
        case '/':
            return divideC(num1, num2);
        case '^':
            return powerC(num1, num2);
    }
}

let currentNum = "";
let savedNum = "";
let operatorHold = "";
let endResult = "";

function inUpdate(e){
    this.textContent = this.textContent.trim();
    if(this.textContent !== 'C'){

        //If clicked button is not a number
        if(isNaN(this.textContent)){

            //If input was +/- to make negative/positive
            if(this.textContent == '+/-' && currentNum !== ""){
                if (currentNum < 0){
                    currentNum = Math.abs(currentNum);
                    document.querySelector("#inputscreen").textContent = currentNum;
                }else{
                    currentNum = -currentNum;
                    document.querySelector("#inputscreen").textContent = currentNum;
                }
                //if operating from previous result
                if(Math.abs(savedNum) == Math.abs(currentNum)){
                    savedNum = currentNum;
                }

            }else
            //Holds the operator and updates operating screen
            if(this.textContent !== "Enter" && savedNum == ""){
                operatorHold = this.textContent;
                savedNum = currentNum;
                currentNum = "";
                document.querySelector("#inputscreen").textContent = "";
                document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} \u00A0`;

            }else if(this.textContent !== "Enter" && savedNum !== ""){
                //if previous operation
                if(endResult != ""){
                    endResult = "";
                }
                operatorHold = this.textContent;
                currentNum = ""
                document.querySelector("#inputscreen").textContent = "";
                document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} \u00A0`;
            }
            else{
                //Operates when user presses Enter
                endResult = operate(operatorHold, savedNum, currentNum);
                document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} ${currentNum}\u00A0`
                document.querySelector("#inputscreen").textContent = endResult;
                savedNum = endResult;
                currentNum = endResult;
            }


        }else{
            //Changes screen to reflect current number and addes to current number
            if(endResult != ""){
                document.querySelector("#inputscreen").textContent = "";
                currentNum = "";
                savedNum = "";
                operatorHold = "";
                endResult = "";
            }
            document.querySelector("#inputscreen").textContent += this.textContent;
            currentNum += Number(this.textContent);
        }


    }else {
        document.querySelector("#inputscreen").textContent = "";
        document.querySelector("#operatingscreen").textContent = "";
        currentNum = "";
        savedNum = "";
        operatorHold = "";
        endResult = "";
    }
}

//Get all classes with numBox
const allButtons = document.querySelectorAll(".numBox");

//Add listeners for every button
allButtons.forEach((button) => {
    button.addEventListener("click", inUpdate);
})
