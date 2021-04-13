const dices = document.querySelectorAll(".dice");
const sel_dices = document.getElementById("sel-dices");

dices.forEach(e => {
    e.addEventListener("click", e => {
        if (e.target.classList.contains("dice-selected")) {
            e.target.classList.remove("dice-selected");
            sel_dices.value = sel_dices.value.replace(e.target.dataset.diceValue, '');
        } else {
            e.target.classList.add("dice-selected");
            sel_dices.value += e.target.dataset.diceValue;
        }
    });
});
