// ====== Vars ======
// === Elements ===
const menu = document.getElementById("menu")
const main_menu = document.getElementById("main_menu")
const number_cards = document.getElementById("number_cards") 
const change_score_menu = document.getElementById("change_score_menu")
const game_area = document.getElementById("gameArea")
// *** Elements ***

// === Global vars ===
var game_size = 5

var menu_layer = 0

var what_player_turn = 0

var win_score = 1
// *** Global vars ***
// ****** Vars ******


// ====== Players ======
// === Players Vars ===
const player1_name = document.getElementById("player1_name")
const player2_name = document.getElementById("player2_name")

const player1_turn = document.getElementById("player1_turn")
const player2_turn = document.getElementById("player2_turn")

const player1_font_color = document.querySelectorAll(".player1_font_color")
const player2_font_color = document.querySelectorAll(".player2_font_color")

let player1_color = document.getElementById("player1_color").value
let player2_color = document.getElementById("player2_color").value

const player1_score_elements = document.querySelectorAll(".player1_score")
const player2_score_elements = document.querySelectorAll(".player2_score")

const player1_score_header = document.getElementById("player1_score")
const player2_score_header = document.getElementById("player2_score")

const player_score_inputs = document.querySelectorAll(".players_score")
// === Player Vars ===

// === Players Events ===
player1_name.addEventListener("input", (event) => {
    player1_font_color.forEach(element => {
        if (element.tagName.toLocaleLowerCase() != 'span'){
            element.innerHTML = event.target.value
        }
    })
})

player2_name.addEventListener("input", (event) => {
    player2_font_color.forEach(element => {
        if (element.tagName.toLocaleLowerCase() != 'span'){
            element.innerHTML = event.target.value
        }
    })
})

document.getElementById("player1_color").addEventListener("input", (event) => {
    player1_color = event.target.value
    change_player_name_color()
})

document.getElementById("player2_color").addEventListener("input", (event) => {
    player2_color = event.target.value
    change_player_name_color()
})

document.querySelectorAll(".win_score").forEach(element => {
    element.addEventListener("input", (event) => {
        win_score = event.target.value
        change_win_score()
    })
})

player1_score_elements.forEach(element => {
    element.addEventListener("input", (event) => {
        let score = event.target.value
        change_player_score("player1", score)
    })
})

player2_score_elements.forEach(element => {
    element.addEventListener("input", (event) => {
        let score = event.target.value
        change_player_score("player2", score)
    })
})
// *** Player Events ***
// ****** Players ******


// ======= Functions ========
// === Cards Functions ===
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

window.addEventListener("resize", () => { // Check if the user change the window size
    let card_images_height = calc_images_height(game_size)
    let cards = document.querySelectorAll(".cards_image")
    cards.forEach((element) => {
        element.style.height = "auto"
        element.style.height = card_images_height
    })
})
// *** Cards Functions ***

// === Menu Functions ===
function witch_menu(menu_h, menu_w) {
    if (menu_layer <= 0) {
        main_menu.classList.remove("active")
        menu.close()
    }
    else if (menu_layer == 1) {
        number_cards.classList.remove("active")
        change_score_menu.classList.remove("active")
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

function close_layers() {
    menu_layer--
    witch_menu()
}

function open_number_cards_menu() {
    number_cards.classList.add("active")
    menu_layer += 1
    witch_menu("25%", "35%")
}

function open_change_score_menu() {
    change_score_menu.classList.add("active")
    menu_layer += 1
    witch_menu("65%", "38%")
}
// *** Menu Functions ***

// === Player Functions ===
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

function change_player_name_color() {
    player1_font_color.forEach((element) => {
        element.style.color = player1_color
    })
    player2_font_color.forEach((element) => {
        element.style.color = player2_color
    })
}

function change_win_score() {
    document.querySelectorAll(".win_score").forEach(element => {
        element.value = win_score
    })
    
    let max_players_input = win_score - 1
    
    player_score_inputs.forEach(element => {
        element.max = max_players_input
        
        if (element.value > (max_players_input) && win_score != 0) {
            element.value = max_players_input

            if (element.classList.contains("player1_score")) {
                change_player_score("player1", max_players_input)
            }
            else if(element.classList.contains("player2_score")){
                change_player_score("player2", max_players_input)        
            }
        }
    })
}

function change_player_score(player_name, score) {
    if (player_name == "player1"){
        player1_score_elements.forEach(element => {
            element.value = score
        })

        player1_score_header.textContent = score
    }
    else if (player_name == "player2") {
        player2_score_elements.forEach(element => {
            element.value = score
        })
        player2_score_header.textContent = score
    }
}

function reset_points() {
    change_player_score("player1", 0)
    change_player_score("player2", 0)
}
// *** Player Functions ***
// ****** Functions ****** 


// ====== Start ======
function init_game() {
    sorter_player_turn()
    init_round(game_size)
    change_player_name_color()
    change_win_score()
}

init_game()