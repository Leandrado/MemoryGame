// ===== Players =====
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")

const player1_name = document.getElementById("player1_name")
const player2_name = document.getElementById("player2_name")

player1_name.addEventListener("input", (event) => {
    player1.innerHTML = event.target.value
})

player2_name.addEventListener("input", (event) => {
    player2.innerHTML = event.target.value
})

// Vars
let menu = document.getElementById("menu")
let number_cards = document.getElementById("number_cards") 

let game_area = document.getElementById("gameArea")

var game_size = 5

// ======= Functions ========
function calc_images_height(row_column) {
    let game_area_heigth = game_area.getBoundingClientRect().height
    let cards_image_height = `${(game_area_heigth / (row_column + 1))}px`
    return cards_image_height
}

function init_game(row_column){
    if (row_column == 0){
        row_column = game_size
    }

    game_area.innerHTML = ""
    game_area.appendChild(menu)
    close_menu()
    number_cards.classList.remove("active")

    game_area.style.gridTemplateRows = `repeat(${row_column}, 1fr)`
    game_area.style.gridTemplateColumns = `repeat(${row_column}, 1fr)`

    let cards_image = document.getElementsByClassName("cards_image")
    let cards_image_height = calc_images_height(row_column)

    for (i = 0; i < row_column; i++){
        for (j = 0; j < row_column; j++){
            let card = document.createElement("img")
            let card_value = Math.floor((i * row_column + j)/2) + 1
            card.classList.add("cards_image", `"value_card_${card_value}"`)
            card.src = `images/${row_column}x${row_column}/${card_value}.jpg`
            card.style.height = "auto"
            card.style.height = cards_image_height

            game_area.appendChild(card)
        }
    }

    game_size = row_column
}

function open_menu() {
    menu.showModal()
}

function close_menu() {
    number_cards.classList.remove("active")
    menu.close()
}

function add_or_remove_number_cards() {
    number_cards.classList.toggle("active")
}

// Check if the user change the window size
window.addEventListener("resize", () => {
    let card_images_height = calc_images_height(game_size)
    let cards = document.querySelectorAll(".cards_image")
    cards.forEach((element) => {
        element.style.height = "auto"
        element.style.height = card_images_height
    })
})

init_game(game_size)