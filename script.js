// ===== Players =====
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")

const player1_name = document.getElementById("player1_name")
const player2_name = document.getElementById("player2_name")

const player1_turn = document.getElementById("player1_turn")
const player2_turn = document.getElementById("player2_turn")

player1_name.addEventListener("input", (event) => {
    player1.innerHTML = event.target.value
})

player2_name.addEventListener("input", (event) => {
    player2.innerHTML = event.target.value
})

// Vars
let menu = document.getElementById("menu")
let main_menu = document.getElementById("main_menu")
let number_cards = document.getElementById("number_cards") 

let game_area = document.getElementById("gameArea")

var game_size = 5
var menu_layer = 0

var what_player_turn = 0

// ======= Functions ========
function calc_images_height(row_column) {
    let game_area_heigth = game_area.getBoundingClientRect().height
    let cards_image_height = `${(game_area_heigth / (row_column + 1))}px`
    return cards_image_height
}

function init_round(row_column){
    if (row_column == 0){
        row_column = game_size
    }

    game_area.innerHTML = ""
    game_area.appendChild(menu)
    close_layers(2)

    game_area.style.gridTemplateRows = `repeat(${row_column}, 1fr)`
    game_area.style.gridTemplateColumns = `repeat(${row_column}, 1fr)`

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

function witch_menu(menu_h, menu_w) {
    if (menu_layer <= 0) {
        main_menu.classList.remove("active")
        menu.close()
    }
    else if (menu_layer == 1) {
        number_cards.classList.remove("active")
        menu.style.height = "70%"
        menu.style.width = "40%"
        menu.style.top = "7vh"
        main_menu.classList.add("active")
    }
    else if (menu_layer == 2) {
        main_menu.classList.remove("active")
        menu.style.height = menu_h
        menu.style.width = menu_w
    }

}

function open_menu() {
    menu.showModal()
    menu_layer = 1
    witch_menu()
}

function close_layers(layer) {
    menu_layer -= layer
    witch_menu()
}

function add_or_remove_number_cards() {
    number_cards.classList.add("active")
    menu_layer += 1
    witch_menu("25%", "35%")
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

function sorter_player_turn() {
    what_player_turn = Math.floor(Math.random() * 2) + 1;
    if (what_player_turn == 1){
        player1_turn.classList.add("turn_true")
        player2_turn.classList.remove("turn_true")
    }
    else{
        player2_turn.classList.add("turn_true")
        player1_turn.classList.remove("turn_true")
    }
}

// ====== Start ======
function init_game() {
    sorter_player_turn()
    init_round(game_size)
}

init_game()