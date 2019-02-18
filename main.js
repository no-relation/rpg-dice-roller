const DICE = ['004','006','008','010','012','020','100']

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

const singleDieHTML = (sides) => {
    const die = document.createElement('form')
    die.className = "input-group input-group-md col-md-auto"
    die.type = 'form'
    die.id = `${sides}form`

    const buttonGroup = document.createElement('div')
    buttonGroup.className = 'btn-group btn-group-sm'
    submitButton = document.createElement('button')
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
    secondLine = document.createElement('div')
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
        card = document.createElement('div')
        card.className = 'card'
        card.style = 'width: 18rem'
        cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        cardBody.appendChild(singleDieHTML(die))
        card.appendChild(cardBody)
        document.body.appendChild(card)
    })

    specialCard = document.createElement('div')
    specialCard.className = 'card'
    specialCard.style = 'width: 18rem'
    
    specialTitle = document.createElement('h5')
    specialTitle.className = 'card-title'
    specialTitle.innerText = "Create new die with how many sides?"
    specialCard.appendChild(specialTitle)

    dieForm = document.createElement('div')
    dieForm.className = 'input-group'

    dieInput = document.createElement('input')
    dieInput.className = 'form-control'
    dieInput.type = 'number'
    dieForm.appendChild(dieInput)
    
    spButtonGroup = document.createElement('div')
    spButtonGroup.className = 'input-group-append'
    specialDieButton = document.createElement('button')
    specialDieButton.type = 'button'
    specialDieButton.className = 'btn btn-warning'
    specialDieButton.innerText = 'Create Die'
    spButtonGroup.appendChild(specialDieButton)
    dieForm.appendChild(spButtonGroup)

    specialCard.appendChild(dieForm)

    document.body.appendChild(specialCard)

    buttons = document.querySelectorAll('.btn-outline-secondary')
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{handleBtnQuantClick(e)})
    }) 
    forms = document.querySelectorAll('form')
    forms.forEach((form)=>{
        form.addEventListener("submit", (e)=>{handleRollSubmit(e)})
    })
}

render()