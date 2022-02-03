
const userInput = document.querySelector('#userInput');

userInput.addEventListener('click',(e)=>
{
    console.log('clicked');
    userInput.classList.toggle('clicked');
})