let registroEntradas = JSON.parse(localStorage.getItem("registros")) ?? [];
/* si ya hay elementos en el local storage se llama la funcion crear tarjeta*/
if (registroEntradas.length > 0) {
    registroEntradas.forEach((o)=>{
        crearTarjeta(o);
    })
}
/*si ya hay elemento en local storage se agrega en tabla*/
let registroSalidas = JSON.parse(localStorage.getItem("salida")) ?? [];
console.log(registroSalidas)
if(registroSalidas.length>0){
    crearTablaSalida()
}

// obtener formulario mas evento
let btnForm = document.querySelector("#btnForm");
btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    let formulario = document.querySelector("#formulario");
    let propietario = document.querySelector("#propietario").value;
    let sintomas = document.querySelector("#sintomas").value;
    let mascota = document.querySelector("#mascota").value;
    let fecha = document.querySelector("#dateIngreso").value;
    registrarEntradas(propietario, sintomas, fecha, mascota)
})

function registrarEntradas(propietario, sintomas, fecha, mascota) {
    const objeto = {
        propietario,
        sintomas,
        fecha,
        mascota,
        id: Math.random(),
    }
    registroEntradas.push(objeto);
    crearTarjeta(objeto);
}

function crearTarjeta(objeto) {
        let tarjeta = ``;
        tarjeta = `
            <div id="${objeto.id}" class="contenido">
                <h5> propietario: ${objeto.propietario}</h5>
                <h6> mascota : ${objeto.mascota}</h6>
                <p> sintomas : ${objeto.sintomas}</p>
                <p> fecha ingreso : ${objeto.fecha}</p>
                <button onclick="registrarSalida(${objeto.id})">Registrar salida</button>
                <p>                                                                      </p>
            </div>
        `
        document.querySelector("#padreTarjetas").insertAdjacentHTML("afterbegin", tarjeta);
        saveStorage()
}
    // esta funcion compara el id seleccionado con el de la base de datos
    // pushea el objeto y se agrega al arreglo para posteriormente agregarlo al storage
function registrarSalida(id) {
    registroEntradas.filter((o) => {
        if (o.id == id) {
            o.fechaSalida = new Date(); // agregamos la fecha de salida
            registroSalidas.push(o);
            localStorage.setItem("salida",JSON.stringify(registroSalidas))
            crearTablaSalida();
        };
    })
    // esto es para borrar del arreglo al objeto que vamos a sacar de la tarjeta
        registroEntradas = registroEntradas.filter((o) => {
        return o.id !== id;

    })
    // eliminamos el local storage para remplazarlo sin el objeto sacado
    localStorage.removeItem("registros")
    // actualizamos
    localStorage.setItem("registros",JSON.stringify(registroEntradas))

    // eliminar de la tabla
    let tarjeta = document.getElementById(id);
    let padre = tarjeta.parentElement;
    padre.removeChild(tarjeta);
}

function crearTablaSalida() {
    let d = []
     d = JSON.parse(localStorage.getItem("salida"))
     d.forEach((d)=>{    
         console.log(d)
            
    let tabla = ``;
    tabla = `
        <tr id="${d.id}"></tr>
        <td>${d.propietario}</td>
        <td>${d.mascota}</td>
        <td>${d.sintomas}</td>
        <td>${d.fechaSalida}</td>
        `;
    document.querySelector("#padreTablaSalida").insertAdjacentHTML("afterbegin", tabla);
   
}) 
     }

function saveStorage(){
 localStorage.setItem("registros",JSON.stringify(registroEntradas));
}