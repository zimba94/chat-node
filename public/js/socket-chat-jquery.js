var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');
//referencias de jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMsj = $('#txtMsj');
var divChatBox = $('#divChatbox');


//funciones para renderizar usuarios

function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id =' + personas[i].id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {

    var html = "";
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ":" + fecha.getMinutes();

    var adminClass = "info";
    if (mensaje.nombre === "Administrador") {
        adminClass = "danger";
    }
    if (yo) {

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== "Administrador") {

            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '.</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatBox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}

//listeners

divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {
    e.preventDefault();

    if (txtMsj.val().trim().length === 0) {
        return;
    }

    //Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMsj.val()
    }, function(mensaje) {
        txtMsj.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

})