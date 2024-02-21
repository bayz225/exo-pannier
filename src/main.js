let shopContainer = document.querySelectorAll('.container .item') // Liste des article
let likeBtn = document.querySelectorAll('#like') // le boutton like
const totalElem = document.querySelector('#total') // la span du coût total
const downBtn = document.querySelectorAll('#down') // boutton pour dinnunier la quantité
const upBtn = document.querySelectorAll('#up') // boutton pour augmenter la quantité
const trashBtn = document.querySelectorAll('#trash') // boutton pour supprimer l'article

/**
 * Une fonctuon qui calcule le coût total des articles
 */
function totalP () {
    if (shopContainer.length > 1) {
        let total = 0
        shopContainer.forEach((item) => {
            total += parseInt(item.querySelector('.price').innerHTML) * parseInt(item.querySelector('#quantity').innerHTML)
        })

        totalElem.innerHTML = total
    } else {
        shopContainer = document.querySelector('.container .item')

        totalElem.innerHTML = parseInt(shopContainer.querySelector('.price').innerHTML) * parseInt(shopContainer.querySelector('#quantity').innerHTML)
    }
}

/**
 * Petite fonction qui permet de supprime un article
 * 
 * @param {HTMLElement} card Qui représente un article à supprimer
 * @param {HTMLElement} emptyElement Le text qui s'affiche lorqu'il n'y a plus d'article
 */
function deleteCard (card, emptyElement) {

    if (document.querySelectorAll('.container .item').length == 1) {
        emptyElement.classList.add('active')
    }
    card.querySelector('#quantity').innerHTML = 0
}

// Action de liker un article
likeBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let btn = e.target

        if (!btn.classList.contains('active')) {
            btn.classList.add('active')
        } else {
            btn.classList.remove('active')
        }
    })
})

totalP()

// Action d'augmenter la quantité un article
upBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let parentE = e.target.parentElement
        let q = parseInt(parentE.querySelector('#quantity').innerHTML)

        parentE.querySelector('#quantity').innerHTML = q + 1
        
        totalP()
    })
})

// Action dimunier la quantité un article
downBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let parentE = e.target.parentElement
        let q = parseInt(parentE.querySelector('#quantity').innerHTML)
        const empty = document.querySelector('.empty')
        
        if (q == 1) {
            deleteCard(parentE, empty)
            
            parentE.parentElement.parentElement.parentElement.remove()
        } else {
            parentE.querySelector('#quantity').innerHTML = q - 1
        }

        totalP()
    })
})

// Action de supprimer un article
trashBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let parentE = e.target.parentElement
        const empty = document.querySelector('.empty')

        deleteCard(parentE, empty)

        parentE.parentElement.parentElement.remove()

        totalP()
    })
})