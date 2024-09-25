const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")

const passwordDisplay = document.querySelector("[data-passwordDisplay]")

const copybtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")

const uppercaseCheck = document.querySelector('#uppercase')
const lowercasecheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")


const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generateButton")

const symbols = '!^~#$\()%&|*+@,]./[ :<{=>?}-+'

let password = ""
let passwordLength = 10
let checkCount = 1
uppercaseCheck.checked = true;


function handleSlider() {
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength

}

handleSlider()

function setIndicator(color) {
    indicator.style.backgroundColor = color

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min

}

function generateRandomNumber() {
    return getRndInteger(0, 9)
}

function generateLowerCase() {

    return String.fromCharCode(getRndInteger(97, 123))

}

function generateUpperCase() {

    return String.fromCharCode(getRndInteger(65, 91))

}

function generateSymbol() {

    const randNum = getRndInteger(0, symbols.length)
    return symbols.charAt(randNum)

}

function calcStrength() {
    let hasUpper = false
    let hasLower = false
    let hasNum = false
    let hasSym = false
    if (uppercaseCheck.checked) hasUpper = true

    if (lowercasecheck.checked) hasLower = true

    if (numbersCheck.checked) hasNum = true
    if (symbolsCheck.checked) hasSym = true

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator('#0f0')
    }

    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 8)
        setIndicator("#ff0")
    else
        setIndicator("#f00")

}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = 'copied'
    }
    catch (e) {
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add('active')
    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000)
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value
    handleSlider()
})


copybtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent()
})

function handleCheckBoxChange() {
    checkCount = 0
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++

    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()

    }

}


allCheckBox.forEach((checkbox) => {

    checkbox.addEventListener('change', handleCheckBoxChange)

})




generateBtn.addEventListener('click', () => {

    if (checkCount <= 0)
        return
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()

    }

    password = ""

    let funcArr = []

    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase)
    if (lowercasecheck.checked)
        funcArr.push(generateLowerCase)
    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber)
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol)

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]()
    }

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length)
        password += funcArr[randIndex]()

    }

    password = shufflePassword(Array.from(password))
    passwordDisplay.value = password
    calcStrength()


})



function shufflePassword(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp

    }

    let str = ""
    array.forEach((el) => (str += el))
    return str

}
