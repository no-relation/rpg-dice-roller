const DICE = ['000','004','006','008','010','012','020','100']
let specialDiceArray = []
let specialDiceDiv = document.createElement('div')

const randomNumbers = (lowestNum, highestNum) => {
    return (Math.floor(Math.random() * highestNum) + lowestNum)
}

function handleBtnQuantClick(e) {
    totalHTML = document.getElementById(e.target.id.slice(0, 3) + 'SideTotal')
    totalHTML.innerText = 'Total: '
    field = document.getElementById(e.target.id.slice(0,3) + 'SideDieQuantity')
    direction = e.target.id.slice(3,4)
    if (parseInt(field.value) > 0 && direction == 'm') {
        field.value = parseInt(field.value) - 1
    } else if (direction == 'p') {
        field.value = parseInt(field.value) + 1
    }
}

function handleRollSubmit(e) {
    e.preventDefault()
    totalHTML = document.getElementById(e.target.id.slice(0, 3) + 'SideTotal')
    totalHTML.innerText = 'Total: '

    form = e.target
    dieType = parseInt(form.id)
    field = document.getElementById(e.target.id.slice(0, 3) + 'SideDieQuantity')
    dieNumber = parseInt(field.value)
    total = 0
    for(let i=0; i<dieNumber; i++) {
        total += randomNumbers(1,dieType)
    }
    totalHTML.innerText += total
}

function addSpecialDice(e) {
    e.preventDefault()
    const specialForm = e.target
    const sides = specialForm.querySelector('#die-num-sides')
    if (!specialDiceArray.includes(sides.value.padStart(3, '0'))) {
        specialDiceArray.push(sides.value.padStart(3,'0'))
    }
    sides.value = null
    renderSpecialDice()
}

function removeSpecialDice(e) {
    const deletedDie = e.target.id.slice(0, 3)
    const deleteIdx = specialDiceArray.findIndex((die)=>{
        return die === deletedDie
    })
    specialDiceArray.splice(deleteIdx,1)
    renderSpecialDice()
}

const singleDieHTML = (sides) => {
    const die = document.createElement('form')
    die.className = "input-group input-group-md col-md-auto die-form"
    die.type = 'form'
    die.id = `${sides}form`

    const buttonGroup = document.createElement('div')
    buttonGroup.className = 'btn-group btn-group-sm'
    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.className = 'btn btn-primary'
    submitButton.innerText = 'ROLL'
    submitButton.id = `${sides}submit`
    buttonGroup.appendChild(submitButton)
    const minusAndPlus = ['-','+']
    minusAndPlus.forEach((type) => {
        button = document.createElement('button')
        button.className = 'btn btn-outline-secondary'
        button.type = 'button'
        if (type === '-') {
            button.id = `${sides}minusOne`
        } else {
            button.id = `${sides}plusOne`
        }
        button.innerText = type
        buttonGroup.appendChild(button)
    })

    die.appendChild(buttonGroup)
    die.innerHTML += `
        <input type="number" id='${sides}SideDieQuantity' name="quantity" class="form-control " value='1' disabled>
        <div class="input-group-append">
            <span class="input-group-text">d${parseInt(sides)} </span>
        </div>
    `
    const secondLine = document.createElement('div')
    const total = document.createElement('h3')
    total.id = `${sides}SideTotal`
    total.innerText = 'Total: '
    secondLine.appendChild(total)

    die.appendChild(secondLine)

    return die
}


const render = () => {
    console.log('rendered')
    
    DICE.forEach((die)=> {
        if (die !== '000') {
            const card = document.createElement('div')
            card.className = 'card'
            card.style = 'width: 18rem'
            const cardBody = document.createElement('div')
            cardBody.className = 'card-body'
            cardBody.appendChild(singleDieHTML(die))
            card.appendChild(cardBody)
            document.body.appendChild(card)
        }
    })

    document.body.appendChild(specialDiceDiv)

    const specialCardForm = document.createElement('div')
    specialCardForm.id = 'special-card-form'
    specialCardForm.className = 'card'
    specialCardForm.style = 'width: 18rem'
    
    const specialTitle = document.createElement('h5')
    specialTitle.className = 'card-title'
    specialTitle.innerText = "Create new die with how many sides?"
    specialCardForm.appendChild(specialTitle)

    const dieForm = document.createElement('form')
    dieForm.className = 'input-group'

    const dieInput = document.createElement('input')
    dieInput.className = 'form-control'
    dieInput.type = 'number'
    dieInput.id = 'die-num-sides'
    dieForm.appendChild(dieInput)
    
    const spButtonGroup = document.createElement('div')
    spButtonGroup.className = 'input-group-append'
    specialDieButton = document.createElement('button')
    specialDieButton.type = 'submit'
    specialDieButton.className = 'btn btn-warning'
    specialDieButton.innerText = 'Create Die'
    specialDieButton.id = 'create-die'
    spButtonGroup.appendChild(specialDieButton)
    dieForm.appendChild(spButtonGroup)

    specialCardForm.appendChild(dieForm)

    document.body.appendChild(specialCardForm)

    const buttons = document.querySelectorAll('.btn-outline-secondary')
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{handleBtnQuantClick(e)})
    }) 
    forms = document.querySelectorAll('.die-form')
    forms.forEach((form)=>{
        form.addEventListener("submit", (e)=>{handleRollSubmit(e)})
    })
    dieForm.addEventListener("submit", (e)=>{addSpecialDice(e)})
}

const renderSpecialDice = () => {
    console.log(specialDiceArray)
    specialDiceDiv.innerHTML = ''
    specialDiceArray.forEach((die) => {
        if (!DICE.includes(die)) {
            card = document.createElement('div')
            card.className = 'card special-die'
            card.style = 'width: 18rem'
            card.id = `${die}SiderCard`

            cardBody = document.createElement('div')
            cardBody.className = 'card-body'
            cardBody.appendChild(singleDieHTML(die))
            card.appendChild(cardBody)

            deleteButton = document.createElement('button')
            deleteButton.className = 'btn btn-danger delete-die'
            deleteButton.id = `${die}Delete`
            deleteButton.innerText = 'X'
            card.appendChild(deleteButton)

            specialDiceDiv.appendChild(card)
        }
    })
    const deleteButtons = document.querySelectorAll('.delete-die')
    deleteButtons.forEach((deleter) => {
        deleter.addEventListener('click', (e)=>{removeSpecialDice(e)})
    })
}

render()