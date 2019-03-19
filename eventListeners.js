function resetTotalHTML(sides) {
    totalHTML = document.getElementById(sides + 'SideTotal')
    totalHTML.innerText = 'Total: '
    document.getElementById(sides + "-roll-list") && document.getElementById(sides + "-roll-list").remove()

}

function handleBtnQuantClick(e) {
    const sides = e.target.id.slice(0, 3)
    resetTotalHTML(sides)

    field = document.getElementById(sides + 'SideDieQuantity')
    direction = e.target.id.slice(3, 4)
    if (parseInt(field.value) > 0 && direction == 'm') {
        field.value = parseInt(field.value) - 1
    } else if (direction == 'p') {
        field.value = parseInt(field.value) + 1
    }
}

function handleRollSubmit(e) {
    e.preventDefault()
    const sides = e.target.id.slice(0, 3)
    resetTotalHTML(sides)

    const form = e.target
    const dieType = parseInt(form.id)
    field = document.getElementById(sides + 'SideDieQuantity')
    dieNumber = parseInt(field.value)
    let rollArray = []
    for (let i = 0; i < dieNumber; i++) {
        rollArray.push(randomNumbers(1, dieType))
    }
    totalHTML.innerText += rollArray.reduce((a, b) => a + b)
    if (rollArray.length > 1) {
        const rollArrayHTML = document.createElement('p')
        rollArrayHTML.id = `${sides}-roll-list`
        rollArrayHTML.innerText += rollArray[0]
        rollArray.slice(1).forEach((roll) => {
            rollArrayHTML.innerText += ` + ${roll}`
        })
        totalHTML.after(rollArrayHTML)
    }
}

const addAllListeners = () => {
    const buttons = document.querySelectorAll('.btn-outline-secondary')
    buttons.forEach((button) => {
        if (!button.className.includes('listened')) {
            button.className += ' listened'
            button.addEventListener("click", (e) => { handleBtnQuantClick(e) })
        }
    })
    const forms = document.querySelectorAll('.die-form')
    forms.forEach((form) => {
        if (!form.className.includes('listened')) {
            form.className += ' listened'
            form.addEventListener("submit", (e) => { handleRollSubmit(e) })
        }
    })
    const deleteButtons = document.querySelectorAll('.delete-die')
    deleteButtons.forEach((deleter) => {
        deleter.addEventListener('click', (e) => { removeSpecialDice(e) })
    })
}
