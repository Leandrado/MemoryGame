let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")


// Hidden Elements
let menu = document.getElementById("menu")
let number_cards = document.getElementById("number_cards") 

let game_area = document.getElementById("gameArea")

var game_size = 5

// ======= Functions ========
function init_game(row_column){
    if (row_column == 0){
        row_column = game_size
    }

    game_area.innerHTML = ""
    game_area.appendChild(menu)
    menu.classList.toggle("active")
    number_cards.classList.remove("active")

    game_area.style.gridTemplateRows = `repeat(${row_column}, 1fr)`
    game_area.style.gridTemplateColumns = `repeat(${row_column}, 1fr)`

    let game_area_heigth = game_area.getBoundingClientRect().height
    let cards_image = document.getElementsByClassName("cards_image")
    cards_image_height = `${(game_area_heigth / (row_column + 1))}px`

    for (i = 0; i < row_column; i++){
        for (j = 0; j < row_column; j++){
            let card = document.createElement("img")
            let card_value = Math.floor((i * row_column + j)/2) + 1
            card.classList.add("cards_image", `"value_card_${card_value}"`)
            card.src = `images/${row_column}x${row_column}/${card_value}.jpg`
            card.style.height = cards_image_height

            game_area.appendChild(card)
        }
    }

    game_size = row_column
}

function add_or_remove_menu(){
    menu.classList.toggle("active")
    number_cards.classList.remove("active")
}

function add_or_remove_number_cards() {
    number_cards.classList.toggle("active")
}

// Check if the user change the window size
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(() => {
        init_game(game_size)
        menu.classList.toggle("active")
    }, 150);
});

init_game(game_size)
add_or_remove_menu()