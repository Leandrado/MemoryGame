let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")


let menu = document.getElementById("menu")

let game_area = document.getElementById("gameArea")


// ======= Functions ========
function init_game(row_column){
    if (row_column == 0){
        row_column = x
    }

    game_area.innerHTML = ""
    game_area.appendChild(menu)
    menu.classList.toggle("active")

    game_area.style.gridTemplateRows = `repeat(${row_column}, 1fr)`
    game_area.style.gridTemplateColumns = `repeat(${row_column}, 1fr)`

    for (i = 0; i < row_column; i++){
        for (j = 0; j < row_column; j++){
            let card = document.createElement("img")
            let card_value = Math.floor((i * row_column + j)/2) + 1
            card.classList.add("cards_image", `"value_card_${card_value}"`)
            card.src = `images/${row_column}x${row_column}/${card_value}.jpg`

            game_area.appendChild(card)
        }
    }
}

function add_or_remove_menu(){
    menu.classList.toggle("active")
}

x = 5
init_game(x)
add_or_remove_menu()