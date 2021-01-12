let resultado = document.querySelector(".resultado")
const picker = datepicker('#date_cita', {formatter: (input, date, instance) => {
    const value = date.toISOString().substring(0, 10);
    input.value = value 
  }})

/* console.log('hola estoy en index.html') */