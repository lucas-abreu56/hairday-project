import dayjs from 'dayjs';

const form = document.querySelector('form');
const selectedDate = document.getElementById('date');

//Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

// Carrega a data atual no campo de data
selectedDate.value = inputToday


// Define a data mínima para o campo de data como hoje
selectedDate.min = inputToday

form.onsubmit = (event) => {
    event.preventDefault();
}