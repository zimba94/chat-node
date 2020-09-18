var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = "index.html";
    throw new Error("El nombre y la sala es necesario");
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log("Usuarios conectados: ", resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Alan',
    mensaje: 'Qué hay pa'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuario, cuando entrarn o salen

socket.on('listaPersona', function(personas) {

    console.log(personas);

});

//Msj privado

socket.on('mensajePrivado', (mensaje) => {

    console.log('Mensaje privado: ', mensaje);
});