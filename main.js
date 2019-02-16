const DICE = ['004','006','008','010','012','020','100']

const randomNumbers = (lowestNum, highestNum) => {
    return (Math.floor(Math.random() * highestNum) + lowestNum)
}

function handleBtnQuantClick(e) {
    field = document.getElementById(e.target.id.slice(0,3) + 'SideDieQuantity')
    direction = e.target.id.slice(3,4)
    if (parseInt(field.value) > 0 && direction == 'm') {
        field.value = parseInt(field.value) - 1
    } else if (direction == 'p') {
        field.value = parseInt(field.value) + 1
    }
}

const singleDieHTML = (sides) => {
    const die = document.createElement('div')
    die.className = "input-group input-group-lg col-md-auto"
    const buttons = document.createElement('div')
    buttons.className = 'input-group-prepend'
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
        buttons.appendChild(button)
    })
    die.appendChild(buttons)
    die.innerHTML += `
        <input type="number" id='${sides}SideDieQuantity' name="quantity" class="form-control " value='0' disabled>
        <div class="input-group-append">
            <span class="input-group-text">d${parseInt(sides)} </span>
        </div>
    `
    submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.className = 'btn btn-primary'
    submitButton.innerText = 'ROLL'
    die.appendChild(submitButton)

    return die
}


const render = () => {
    cardTable = document.createElement('div')
    
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

    buttons = document.querySelectorAll('.btn')
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{handleBtnQuantClick(e)})
    }) 
}

render()