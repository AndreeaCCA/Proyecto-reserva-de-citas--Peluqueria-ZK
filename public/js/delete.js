borrar = document.querySelector("#borrar") 

borrar.addEventListener("click", (e)=>{
  let r = confirm("Estas seguro que quieres anular esta cita ?") // true=confirmado yes , false = no estas seguro
  if( !r ){ // si no estas seguro, ir dentro de if, e cancela el action
    e.preventDefault();  // cancela el action de llamar la route // cancela el click
  }
});