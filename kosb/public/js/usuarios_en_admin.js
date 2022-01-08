//Aqui colocar el hidden del boton

//Eliminar usuario como administrador

const BtnEliminarAdmin = async function(){
    let id_usuario = this.idUser;
    let id_admin = this.idAdmin;
    let input_admin = document.querySelector("#cod_admin_log").name;    
    
    let resp = await Swal.fire({title:"¿Estas seguro de eliminar?", html:`<div class="row">El usuario a borrar tiene código administrador ${id_admin}, y codigo usuario ${id_usuario} .</div> <div class="row">Recuerde que esta operacion es irreversible</row>`, icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        if (await eliminarAdministrador(id_admin) != false){

            Swal.fire("Administrador Revocado","Se han eliminado permisos de adminsitrador", "info");
            if (input_admin == id_admin) {
                window.location.href = "/kosb/public/perfil";
            } else {
                location.reload();
            }
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }
}

//POBLAR TABLA CON ADMINISTRADORES

const cargarTablaAdmin = async function(){

    let administradores = await getAdministradores();
    let tbody = document.querySelector("#contenedor_admin");
    administradores.forEach(u => {
        let tr = document.createElement('tr');
        let td_admin_id = document.createElement('td');
        td_admin_id.textContent = u.id;
        let td_id = document.createElement('td');
        td_id.textContent = u.cod_usuario;        
        let td_tipo = document.createElement('td');
        if(u.tipo_admin == 'PRI'){
            td_tipo.textContent = 'Primario';
        }if(u.tipo_admin == 'GEN'){
            td_tipo.textContent = 'General';
        }if(u.tipo_admin == 'SUB'){
            td_tipo.textContent = 'Sub-Administrador';
        }else{
            td_tipo.textContent = 'Sin Asignar';
        }
        
        
        let td_acciones = document.createElement('td');
        let span = document.createElement('span');
        span.classList.add("btn_editar_datos"); 
        let btn_eliminar_admin = document.createElement('a');
        btn_eliminar_admin.setAttribute('href',"#");
        btn_eliminar_admin.textContent = 'Eliminar';
        btn_eliminar_admin.addEventListener("click",BtnEliminarAdmin);
        btn_eliminar_admin.idAdmin = u.id;
        btn_eliminar_admin.idUser = u.cod_usuario;
        span.appendChild(btn_eliminar_admin);              
        
        td_acciones.appendChild(span);
        tr.appendChild(td_id);
        tr.appendChild(td_admin_id);               
        tr.appendChild(td_tipo);        
        tr.appendChild(td_acciones);
        tbody.appendChild(tr);
    });

}

//BTN eliminar Usuario

const eliminarUsuarioBTN = async function(){
    let id_usuario = this.idUser;
    let correo_usuario = this.correoUser;
    let nom_usuario = this.nameUser;
    let usuario_logeado = document.querySelector('#cod_admin_log').name;
    let resp = await Swal.fire({title:"¿Estas seguro de eliminar?", html:`<div class="row">El usuario a borrar tiene código ${id_usuario}, nombre ${nom_usuario} y correo ${correo_usuario}.</div> <div class="row">Recuerde que esta operacion es irreversible</row>`, icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        let respuesta = await eliminarUsuario(id_usuario);
        console.log(respuesta);
        if (respuesta == 'ok'){

            await Swal.fire("Usuario eliminado","Usuario eliminado exitosamente", "info");
            if (usuario_logeado == id_usuario) {
                window.location.href = "/kosb/public/crear_perfil";
                
            } else {
                location.reload();
            }

        }else if (respuesta == false){
            await Swal.fire("Usuario Administrador","No tiene permisos para eliminar este usuario", "info");
            
        }else{
            await Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            //location.reload();
        }
    }
}

//BTN SUSPENDER USUARIO

document.getElementById("Btn_Cancel_Sanc").addEventListener("click", async function(){
    var susp_hide = document.getElementById('hide-me-suspension');    
    susp_hide.style.display = "none"; 
});

//BTN SUSPENDER USUARIO

document.getElementById("Btn_Susp_Sanc").addEventListener("click", async function() {
    
    let id_usuario = this.idUser;    
    let name_user = this.nameUser;       
    let usuario = {};    
    let suspension = {};
    let input_admin = document.querySelector("#cod_admin_log").name;
    let input_fecha_ini = document.getElementById('input_fecha_ini');
    let input_fecha_fin = document.getElementById('input_fecha_fin');
    let input_descr = tinymce.get("input_descrip_sus").getContent();
    usuario.id = id_usuario;
    usuario.estado = 1;
    suspension.cod_usuario = id_usuario;
    suspension.cod_admin = input_admin; 
    suspension.fecha_comien_susp = input_fecha_ini.value;
    suspension.fecha_final_susp = input_fecha_fin.value;
    suspension.descripcion_susp = input_descr;
    console.log(suspension);


    let resp = await Swal.fire({title:"¿Desea suspender un usuario?", text:`Se va a suspender al usuario con código ${id_usuario} y nombre ${name_user}`, icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        if (await suspenderUsuario(usuario) != false){
            crearSuspension(suspension);
            Swal.fire("Usuario suspendido","Usuario suspendido exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }


});

//SUSPENDER USUARIOS FUNCION CLICK BLOCK HIDE-ME

const suspenderUsuarioBTN = async function(){
    var susp_hide = document.getElementById('hide-me-suspension');    
    susp_hide.style.display = "block"; 
    boton = document.getElementById("Btn_Susp_Sanc");
    boton.idUser = this.idUser;
    boton.nameUser = this.nameUser;

}

//VOLVER A ACTIVAR USUARIOS

const activarUsuarioBTN = async function(){
    let id_usuario = this.idUser;
    let name_user = this.nameUser;
    let usuario = {};
    usuario.id = id_usuario;
    usuario.estado = 0;
    let resp = await Swal.fire({title:"¿Desea activar un usuario?", text:`Se va a activar al usuario con código ${id_usuario} y nombre ${name_user}`, icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        if (await activarUsuario(usuario) != false){
            Swal.fire("Usuario activado","El usuario a sido activado exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            //location.reload();
        }
    }
}

//HACER UN USUARIO ADMINISTRADOR EN ZONA USERS DE ADMIN

const adminUsuarioBTN = async function() {
    let administradores = await getAdministradores();
    let id_usuario = this.idUser;
    let tipo_admin = " ";
    let admin ={};
    if (administradores.length >= 0 && administradores.length < 5) {
        tipo_admin = "PRI";
    }if(administradores.length >=5 && administradores.length < 10){
        tipo_admin = "GEN";
    }if(administradores.length >=10){
        tipo_admin = "SUB";
    }
    admin.cod_usuario=id_usuario;
    admin.tipo_admin=tipo_admin;

    let resp = await Swal.fire({title:"¿Desea Hacer este Usuario Administrador?", text:"Se le otorgaran privilegios de administrador", icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        if (await crearAdmin(admin) != false){
            Swal.fire("Usuario activado","El usuario ha obtenido privilegios de Administrador", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            //location.reload();
        }
    }
}

//CARGAR TABLA CON USUARIOS

const cargarTabla = async function(){
    let usuarios = await getUsuarios();
    let admins = await getAdministradores();

    let tbody = document.querySelector("#contenedor");
    usuarios.forEach(u => {
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        td_id.textContent = u.id;
        let td_nombre = document.createElement('td');
        td_nombre.textContent = u.name;
        let td_apellido = document.createElement('td');
        td_apellido.textContent = u.apellido;
        let td_sexo = document.createElement('td');
        if(u.sexo == 'F'){
            td_sexo.textContent = 'Femenino';
        }if(u.sexo == 'M'){
            td_sexo.textContent = 'Masculino';
        }if(u.sexo == 'O'){
            td_sexo.textContent = 'Otros';
        }
        
        let td_email = document.createElement('td');
        td_email.textContent = u.email;
        let td_acciones = document.createElement('td');
        let span = document.createElement('span');
        span.classList.add("btn_editar_datos"); 
        //let btn_editar = document.createElement('a');
        //btn_editar.setAttribute('href',"#");
        //btn_editar.textContent = 'Editar';
        //btn_editar.addEventListener("click",editar);
        //span.appendChild(btn_editar); 
        
        if (u.estado == 0){
            let btn_suspender = document.createElement('a');
            btn_suspender.setAttribute('href',"#");
            btn_suspender.textContent = 'Suspender';
            btn_suspender.idUser = u.id;
            btn_suspender.nameUser = u.name;
            btn_suspender.addEventListener('click',suspenderUsuarioBTN);
            span.appendChild(btn_suspender);

        }if (u.estado == 1){
            let btn_reactivar = document.createElement('a');
            btn_reactivar.setAttribute('href',"#");
            btn_reactivar.textContent = 'Activar';
            btn_reactivar.idUser = u.id;
            btn_reactivar.nameUser = u.name;
            btn_reactivar.addEventListener('click',activarUsuarioBTN);
            span.appendChild(btn_reactivar);

        }

        
        let btn_eliminar = document.createElement('a');
        btn_eliminar.setAttribute('href',"#");
        btn_eliminar.textContent = 'Eliminar';
        btn_eliminar.idUser = u.id;
        btn_eliminar.correoUser = u.email;
        btn_eliminar.nameUser = u.name;
        btn_eliminar.addEventListener('click',eliminarUsuarioBTN);
        for(let j= 0;j < admins.length ; j++){
            if(u.id == admins[j].cod_usuario){
                btn_eliminar.classList.add('disable-links');
                console.log(u.name);
            }
        }
        span.appendChild(btn_eliminar);             

        let get_admin = getAdminPorUsuario(u.id);

        /* if (get_admin.lenght>1){
            let btn_admin = document.createElement('a');
            btn_admin.textContent = "Usuario Admin";
        }else{ } */       
            let btn_admin = document.createElement('a');
            btn_admin.setAttribute('href',"#");
            btn_admin.textContent = 'Administrador';
            btn_admin.idUser = u.id;
            btn_admin.correoUser = u.email;
            btn_admin.nameUser = u.name;
            btn_admin.addEventListener('click',adminUsuarioBTN);
        

        span.appendChild(btn_admin);        
        
        td_acciones.appendChild(span);
        tr.appendChild(td_id);
        tr.appendChild(td_nombre);
        tr.appendChild(td_apellido);
        tr.appendChild(td_sexo);
        tr.appendChild(td_email);
        tr.appendChild(td_acciones);
        tbody.appendChild(tr);
    });

}

const cargarFechaMin = ()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    if (dd < 10) {
       dd = '0' + dd;
    }
    
    if (mm < 10) {
       mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("input_fecha_ini").setAttribute("min", today);
    document.getElementById("input_fecha_fin").setAttribute("min", today);
}

const cargarFechaMax = ()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    dd=dd+7;    
    if (dd < 10) {
       dd = '0' + dd;
    }
    
    if (mm < 10) {
       mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("input_fecha_fin").setAttribute("max", today);
}


document.addEventListener("DOMContentLoaded", async ()=>{
    await cargarTabla();
    await cargarTablaAdmin();
    cargarFechaMin();
    cargarFechaMax();

});

