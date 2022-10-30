function addC(a, b){
    return +(Number(a)+Number(b)).toFixed(12);
}

function subC(a, b){
    return +(a-b).toFixed(12);
}


function multiplyC(a, b){
    return +(a*b).toFixed(12);
}

function divideC(a, b){
    return +(a/b).toFixed(12) ;
}

function powerC(a, b){
    return +(Math.pow(a, b)).toFixed(12);
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
let testCounter = 0;

function inUpdate(e){
    this.textContent = this.textContent.trim();
    if(this.textContent !== 'C'){

        //If clicked button is not a number
        if(isNaN(this.textContent)){

            //If input was +/- to make negative/positive
            if(this.textContent == '+/-' && currentNum !== ""){
                if(savedNum == endResult && savedNum != ""){
                    currentNum = savedNum;
                }
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

            }else if(this.textContent == "."){
                currentNum += this.textContent;
                document.querySelector("#inputscreen").textContent = currentNum;
            }else
            //Holds the operator and updates operating screen
            if(this.textContent !== "Enter" && savedNum == ""){
                operatorHold = this.textContent;
                savedNum = currentNum;
                currentNum = "";
                document.querySelector("#inputscreen").textContent = "";
                document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} \u00A0`;

            }else if(this.textContent !== "Enter" && savedNum !== ""){
                //continous operating
                if(endResult == ""){
                    endResult = operate(operatorHold, savedNum, currentNum);
                    document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} ${currentNum}\u00A0`
                    document.querySelector("#inputscreen").textContent = endResult;
                    savedNum = endResult;
                }
                if(endResult != ""){
                    endResult = "";
                }
                operatorHold = this.textContent;
                currentNum = ""
                //document.querySelector("#inputscreen").textContent = "";
                //document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} \u00A0`;
            }
            else{
                //Operates when user presses Enter
                endResult = operate(operatorHold, savedNum, currentNum);
                document.querySelector("#operatingscreen").textContent = `${savedNum} ${operatorHold} ${currentNum}\u00A0`
                document.querySelector("#inputscreen").textContent = endResult;
                savedNum = endResult;
                //currentNum = endResult;
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
            //document.querySelector("#inputscreen").textContent += this.textContent;
            currentNum += Number(this.textContent);
            document.querySelector("#inputscreen").textContent = currentNum;
        }


    }else {
        //Clears everything
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

const handleOnMouseMove = e =>{
    const { currentTarget: target} = e;

    const rect = target.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);

}

for (const box of document.querySelectorAll(".numBox")){
    box.onmousemove = e => handleOnMouseMove(e);
}