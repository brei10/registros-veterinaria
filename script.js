let registroEntradas = JSON.parse("registros") ?? [];
if (registroEntradas.length > 0) {
    crearTarjeta(registroEntradas);

}

let registroSalidas = [];

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
    crearTarjeta();
}

function crearTarjeta() {
    registroEntradas.forEach((objeto) => {
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
    })

}

function registrarSalida(id) {
    registroEntradas.filter((o) => {
        if (o.id == id) {
            crearTablaSalida(o);

        };
    })
    // encontrar el elemento y pasarlo a otro arreglo
    registroEntradas = registroEntradas.filter((o) => {
        return o.id !== id;

    })

    // eliminar de la tabla
    let tarjeta = document.getElementById(id);
    let padre = tarjeta.parentElement;
    padre.removeChild(tarjeta);


}

function crearTablaSalida(d) {
    let fecha = new Date();

    let tabla = ``;
    tabla = `
        <tr id="${d.id}"></tr>
        <td>${d.propietario}</td>
        <td>${d.mascota}</td>
        <td>${d.sintomas}</td>
        <td>${fecha}</td>

        `;
    document.querySelector("#padreTablaSalida").insertAdjacentHTML("beforeend", tabla);
}