const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const costInput = document.querySelector('#cost');
const error = document.querySelector('#error');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameInput.value && costInput.value){
        const item = {
            name : nameInput.value,
            cost : parseInt(costInput.value)
        }


        db.collection('investments').add(item).then(res => {
            nameInput.value = "";
            costInput.value = "";
        })
    }
    else {
        error.textContent = "Please enter values";
    }
})