
btn_consultar = document.querySelector("#consultar")
date_cita = document.querySelector("#date_cita")
hour_cita = document.querySelector("#hour_cita")



btn_consultar.onclick = () => {

  fetch('/citas/consultar/' + date_cita.value) // mintras los clientes puede seguir haciendo peticiones, non-blocking 
    .then(res => res.json())
    .then(citas => {
      console.log("citas reservadas")
      console.log(citas)  // horas reservadas en el dia eligido

      horas_abierta = [ // hoario de la peluqueria
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

        array_final = [] // array para las horas libres

        horas_abierta.forEach( h =>{
          if(citas.indexOf(h) == -1){ // h=una hora de hora_abierta array, no existe en citas 
            array_final.push(h)
          }
        })
        console.log("final array")
        console.log(array_final)

        array_final.forEach( h => {  // loop through all available hours
          let opt = document.createElement("option") // create empty option element
          opt.value = h  // fill value with hour
          opt.textContent = h // fill textvalue with hour
          hour_cita.appendChild(opt)  // add it to the hour_cita 
        })

    })
  }




/* let resultado = document.querySelector(".resultado")
const picker = datepicker('#date_cita', {formatter: (input, date, instance) => {
    const value = date.toISOString().substring(0, 10);
    input.value = value
  }})
 */
/* console.log('hola') */