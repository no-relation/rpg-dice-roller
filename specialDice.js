let specialDiceArray = []

function renderSpecialDieForm() {
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

    dieForm.addEventListener("submit", (e) => { addSpecialDice(e) })
}

const renderSpecialDice = () => {
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

    addAllListeners()
}

function addSpecialDice(e) {
    e.preventDefault()
    const sides = e.target.querySelector('#die-num-sides')
    if (sides.value > 1 && !specialDiceArray.includes(sides.value.padStart(3, '0'))) {
        specialDiceArray.push(sides.value.padStart(3, '0'))
    }
    sides.value = null
    renderSpecialDice()
}

function removeSpecialDice(e) {
    const deletedDie = e.target.id.slice(0, 3)
    const deleteIdx = specialDiceArray.findIndex((die) => {
        return die === deletedDie
    })
    specialDiceArray.splice(deleteIdx, 1)
    renderSpecialDice()
}

