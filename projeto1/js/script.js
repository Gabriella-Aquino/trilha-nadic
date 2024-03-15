const formContainer = document.querySelector('.form-container')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const radioButtons = document.querySelectorAll('input[name="options-game"]')
const loginInput = document.querySelector('#login')
const passwordInput = document.querySelector('#password')

const emailValidate = (email) =>{
    const emailRegex = new RegExp(
        /^[a-zA-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}$/
    )
    if(emailRegex.test(email)){
        return true;
    }
    return false
}

const isRadioCheck = (radioButtons) =>{
    let isChecked = false
    radioButtons.forEach((option)=>{
        if(option.checked){
            isChecked = true
            return 
        }
    })
    return isChecked
}

const passwordValidate = (password, numCharacters) =>{
    if (password.length >= numCharacters){
        return true
    }
    return false
}

formContainer.addEventListener('submit', (event) => {
    event.preventDefault()

    if(emailInput.value === '' || !emailValidate(emailInput.value)){
        alert('preencha um email valido')
        return
    }

    if(isRadioCheck(radioButtons) === false){
        alert('selecione alguma opção de jogo')
        return
    }


    if(!passwordValidate(passwordInput.value, 8)){
        alert('preencha uma senha valida')
        return
    }

    formContainer.submit()
})


const createElemente = (tag, className) =>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

const generateGameOptions= () =>{
    fetch('db.json')
    .then(response => response.json())
    .then(games => {
            const gameOptionsContainer = document.querySelector('.game-options__container')
            games.map(game => {
                //criando os elementos para montar os cardas dos games (game-options)
                const gameCard = createElemente('div', 'game-option__option') 
                
                //img
                const gameCardImg = createElemente('div', 'game-option__img')
                const gameCardImage= document.createElement('img')

                gameCardImage.src = game.img
                gameCardImg.appendChild(gameCardImage)

                //text
                const gameText = createElemente('div', 'game-option__text')
                const header = createElemente('h3','game-option__header')
                header.textContent = game.moon
                const gameTitle = createElemente('span', 'game-option__title')
                gameTitle.textContent = game.name
                const gameDescription =createElemente('p', 'description')
                gameDescription.textContent = game.description

                header.appendChild(gameTitle)
                gameText.appendChild(header)
                gameText.appendChild(gameDescription)
                
                gameCard.appendChild(gameCardImg)
                gameCard.appendChild(gameText)

                gameOptionsContainer.appendChild(gameCard)
                
            })
        })
}

const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')
inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    input.addEventListener('focus', () => {
        label.style.color = 'var(--destaque-color)';
    });
  
    input.addEventListener('blur', () => {
        label.style.color = 'var(--main-color)';
    });
});

generateGameOptions()