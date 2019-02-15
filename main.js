const DICE = [4,6,8,10,12,20,100]


const randomNumbers = (lowestNum, highestNum) => {
    return (Math.floor(Math.random() * highestNum) + lowestNum)
}

function handleBtnQuantClick(e) {
    field = document.getElementById(e.target.id.slice(0,2) + 'SideDieQuantity')
    direction = e.target.id.slice(2,3)
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
        <input type="number" id='${sides}SideDieQuantity' name="quantity" min=0 size='2' class="form-control" value='0' disabled>
        <div class="input-group-append">
            <span class="input-group-text">d${parseInt(sides)} </span>
        </div>
    `
    return die
}


const render = () => {
    console.log('rendered')
    document.body.appendChild(singleDieHTML('04'))
    buttons = document.querySelectorAll('.btn')
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{handleBtnQuantClick(e)})
    }) 
    const headline = document.body.appendChild(document.createElement('h1'))
    headline.innerText = `Result: ${randomNumbers(1,100)}`
}

render()