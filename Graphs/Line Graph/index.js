// dom elements
// btns
const btns = document.querySelectorAll("button");

// form
const form = document.querySelector("form");

// input 
const input = document.querySelector('input');

// error
const error = document.querySelector('.error');

btns.forEach(btn => {
    btn.addEventListener("click", (e) =>{
        btn.classList.add('active');
        form.children[0].innerHTML = `How much <span>${btn.getAttribute('data-activity')}</span> have you done today?`;
        input.setAttribute('id', btn.getAttribute('data-activity'));
        removeActive(btn);
        update(data);
    })
})


let removeActive = (currBtn) => {
    btns.forEach(btn =>{
        if(btn !== currBtn){
            btn.classList.remove('active');
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value){
        let distance = parseInt(input.value);
        let activity =  input.id;
        let date = new Date().toString();
        let item = {activity, date, distance}
        db.collection('activities').add(item).then(res => {
            input.value = "";
        })
    }
    else {
        error.textContent = "Please enter values";
    }
})

