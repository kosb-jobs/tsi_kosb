
//Cargar Fecha Actual//

const cargarFechaActual = ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    today = yyyy + '-' + mm + '-' + dd ;
    return today;
}



const ResponderReclamo = async function(){

    let input_admin = document.querySelector("#cod_admin_log").name;
    let id_reclamo = this.idReclamo;
    let respuesta_txt = tinymce.get("input_descrip_rec").getContent();
    
    let respuesta ={};
    respuesta.id = id_reclamo;
    respuesta.fecha_respuesta = cargarFechaActual(); 
    respuesta.contenido_respuesta = respuesta_txt;
    respuesta.cod_admin = input_admin;    

    let resp = await Swal.fire({title:"¿Estás seguro de Editar?", text:"Esta operación se verá reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        
        if (await reclamoActualizar(respuesta) != false){
            
            await Swal.fire("Respuesta Enviada","Se ha respondido el reclamo exitosamente", "info");
            location.reload();
            
        }else{
            await Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }else{
        await Swal.fire("Cancelado","Cancelación de petición", "info");
        location.reload();
    }
    
}

 

 const CancelarReclamo = function(){

    var input = document.getElementById('hide-me-reclamos');
    input.style.display = "none";
    
 }

const BtnResponderReclamo = async function(){
    var input_reclamo = document.getElementById('hide-me-reclamos');
    input_reclamo.style.display = "block";
    let id_reclamo = this.idReclamo;
    var boton_responder = document.getElementById('Btn_Responder');
    boton_responder.addEventListener("click",ResponderReclamo);
    boton_responder.idReclamo = this.idReclamo;
    var boton_cancelar = document.getElementById('Btn_Cancelar_Respuesta')
    boton_cancelar.addEventListener("click",CancelarReclamo);



}

const BtnEliminarReclamo = async function(){
    let id_reclamo = this.idReclamo;
    let resp = await Swal.fire({title:"¿Estas seguro de eliminar?", text:"Esta operacion es irreversible", icon:"error", showCancelButton:true});
    if(resp.isConfirmed){        
        if (await eliminarReclamo(id_reclamo) != false){
            
            Swal.fire("Reclamo eliminado","Reclamo eliminado exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }else{
        Swal.fire("Cancelado","Cancelacion de petición", "info");
        location.reload();
    }
}



//Tabla Reclamos Sin Respuesta

const cargarTablaReclamos = async function(){

    let reclamos = await getReclamosSinResp();    
    let input_admin = document.querySelector("#cod_admin_log").name;
    let tbody = document.querySelector("#contenedor_admin_reclamos");    
    
    reclamos.forEach(u => {
        
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        td_id.textContent = u.id;
        let td_titulo = document.createElement('td');
        td_titulo.textContent = u.titulo_reclamo;  
        let td_id_user = document.createElement('td');
        td_id_user.textContent = u.cod_usuario;
        let td_tipo = document.createElement('td');

        if(u.tipo_reclamo ="R") {
            td_tipo.textContent = "Reclamo";
        }if(u.tipo_reclamo ="S"){
            td_tipo.textContent = "Sugerencia";
        }if(u.tipo_reclamo ="P"){
            td_tipo.textContent = "Denuncia Publicacion";
        }if(u.tipo_reclamo ="U"){
            td_tipo.textContent = "Denuncia Usuario";
        }else{
            td_tipo.textContent = "No Definido";
        }   

        let string = String(u.descripcion_reclamo);
        let td_descripcion = document.createElement('td');
        td_descripcion.textContent = string.substring(3,string.length-4); 
        let td_acciones = document.createElement('td');
        let span = document.createElement('span');
        span.classList.add("btn_editar_datos"); 
        let btn_responder = document.createElement('a');
        btn_responder.setAttribute('href',"#");
        btn_responder.textContent = 'Responder';
        btn_responder.addEventListener("click",BtnResponderReclamo);
        btn_responder.idReclamo = u.id;
        btn_responder.idUser = u.cod_usuario;
        let btn_eliminar = document.createElement('a');
        btn_eliminar.setAttribute('href',"#");
        btn_eliminar.textContent = 'Eliminar';
        btn_eliminar.addEventListener("click",BtnEliminarReclamo);
        btn_eliminar.idReclamo = u.id;  
        btn_eliminar.idAdmin = input_admin;       

        span.appendChild(btn_responder);    
        span.appendChild(btn_eliminar);
        td_acciones.appendChild(span);        
        
        td_acciones.appendChild(span);
        tr.appendChild(td_id);
        tr.appendChild(td_titulo);               
        tr.appendChild(td_id_user);        
        tr.appendChild(td_tipo);
        tr.appendChild(td_descripcion);
        tr.appendChild(td_acciones);
        tbody.appendChild(tr);
    });

}

//Tabla de todos los reclamos

const cargarTablaReclamosAccioneless = async function(){
    let reclamos = await getReclamos();    
    let tbody = document.querySelector("#contenedor_admin_reclamos_listo");  
   

    
    reclamos.forEach(u => {
        //aqui va cod de admin
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        td_id.textContent = u.id;
        let td_titulo = document.createElement('td');
        td_titulo.textContent = u.titulo_reclamo;  
        let td_id_user = document.createElement('td');
        td_id_user.textContent = u.cod_usuario;
        let td_tipo = document.createElement('td');

        if(u.tipo_reclamo ="R") {
            td_tipo.textContent = "Reclamo";
        }if(u.tipo_reclamo ="S"){
            td_tipo.textContent = "Sugerencia";
        }if(u.tipo_reclamo ="P"){
            td_tipo.textContent = "Denuncia Publicación";
        }if(u.tipo_reclamo ="U"){
            td_tipo.textContent = "Denuncia Usuario";
        }else{
            td_tipo.textContent = "No Definido";
        }   

        let string = String(u.descripcion_reclamo);
        let string2 = String(u.contenido_respuesta);
        
        let td_descripcion = document.createElement('td');
        td_descripcion.textContent = string.substring(3,string.length-4);

        let td_respuesta = document.createElement('td');
        td_respuesta.textContent =u.contenido_respuesta==null?"Sin Respuesta":u.contenido_respuesta;               
        
        
        tr.appendChild(td_id);
        tr.appendChild(td_titulo);               
        tr.appendChild(td_id_user);        
        tr.appendChild(td_tipo);
        tr.appendChild(td_descripcion);
        tr.appendChild(td_respuesta);
        tbody.appendChild(tr);
    });

}


document.addEventListener("DOMContentLoaded",()=>{
    cargarTablaReclamos();
    cargarTablaReclamosAccioneless();
    
    
});