
/*  IMPLEMENTACIÓN DE FLATPICKR
https://flatpickr.js.org/instance-methods-properties-elements/  */

    const myInput = document.querySelector("#date_cita");  
    const fp = flatpickr(myInput, {
		inline: true,
		disable: [ "2021-01-01", "2021-01-06", "2021-04-02", "2021-05-01", "2021-10-12","2021-11-01", "2021-12-06", "2021-12-08", "2021-12-25",
			function (date) {
				return (date.getDay() === 0 );   
			},
		],

    dateFormat: "Y-m-d", 
		locale: {
			firstDayOfWeek: 1,
			weekdays: {
				shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
				longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			},
			months: {
				shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
				longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			},
		},

	}); 







btn_consultar = document.querySelector("#consultar")
date_cita = document.querySelector("#date_cita")
hour_cita = document.querySelector("#hour_cita")



btn_consultar.onclick = () => {
  // mintras los clientes puede seguir haciendo peticiones, non-blocking
  fetch('/appointment/consultar/' + date_cita.value)
    .then(res => res.json())
    .then(hours_reserved => {

      console.log("horas reservadas")
      console.log(hours_reserved )  // horas reservadas en el dia eligido

      working_hours = [ // hoario de la peluqueria
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
      ]

      available_hours = [] // array para las horas libres

      working_hours.forEach(h => {
        if (hours_reserved.indexOf(h) == -1){ // h=una hora de working_hour array, no existe en citas 
          available_hours.push(h)
        }
      })
      console.log("horas disponibles")
      console.log(available_hours)

      hour_cita.innerHTML = ""
      available_hours.forEach(h => {  // loop through all available hours
        let opt = document.createElement("option") // create empty option element
        opt.value = h  // fill value with hour
        opt.textContent = h // fill textvalue with hour
        hour_cita.appendChild(opt)  // add it to the hour_cita 
      })

    })
}




