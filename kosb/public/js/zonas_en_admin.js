// ** ** ** ** Zonas ** ** ** ** // 


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

const reajusteDeFecha = (fecha)=>{
    let date = new Date(fecha);
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    date = dd + '-' + mm + '-' + yyyy ;
    return date;
  }
  

//Fin Cargar Fecha Actual//


//Guardar Zona Evento Boton //

const guardarZ = async function(){
    var input_zona = document.getElementById('nombre_zona');
    input_zona.style.display = "none";
    let input_admin = document.querySelector("#cod_admin_log").name;
    let id_zona = this.idZona;
    let zona = {};
    zona.id = id_zona;
    zona.nom_zona = input_zona.value;
    zona.fecha_edicion = cargarFechaActual();
    zona.cod_admin = input_admin;
    let resp = await Swal.fire({title:"¿Estás seguro de Editar?", text:"Esta operación se verá reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        console.log(zona);
        if (await zonaActualizar(zona) != false){
            // let id = document.querySelector("#id_usuario");
            // let publicaciones = await getPublicacionCodigo(id.name);
            
            // if(publicaciones.length !=0){
            //     cargarTabla(publicaciones);
            // }else{
            //     cargarDiv();
            // }
            await Swal.fire("Zona Actualizada","Zona Actualizada exitosamente", "info");
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

//Fin Guardar Zona Evento Boton //


//Cancelar Edit Zona Evento Boton //

const cancelarZ = function (){
    var zona = document.getElementById('hide-me-zonas-edicion');
    zona.style.display = "none";
    var input_zona = document.getElementById('nombre_zona');
    input_zona.value = " ";
}

//Editar//

const editarZ = async function(){
    let id_zona = this.idZona;
    var zona = document.getElementById('hide-me-zonas-edicion');
    zona.style.display = "block";  
    var boton_guardar =  document.getElementById('guardar');
    boton_guardar.addEventListener("click",guardarZ);
    boton_guardar.idZona = id_zona;
    var boton_cancelar =  document.getElementById('cancelar');
    boton_cancelar.addEventListener("click",cancelarZ);  
    let zonas = await getZonaPorId(id_zona);
    var input_zona = document.getElementById('nombre_zona');
    input_zona.value = zonas.nom_zona;

}

//Fin Cancelar Edit Zona Evento Boton //


//Eliminar Zona Evento Boton //

const eliminarZ = async function(){
    let id_zona = this.idZona;
    let resp = await Swal.fire({title:"¿Estás seguro de eliminar?", text:"Esta operación es irreversible", icon:"error", showCancelButton:true});
    if(resp.isConfirmed){        
        if (await eliminarZona(id_zona) != false){

            Swal.fire("Zona eliminada","Zona eliminada exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
        location.reload();
    }
}

//Fin Eliminar Zona Evento Boton //


//Llenar Tabla  Zona //

const cargarTablaZonas = async  function(){
let zonas = await getZonas();

let tbody = document.querySelector('#contenedor_zonas');
zonas.forEach(z => {
    let tr=document.createElement('tr');
    let td_id=document.createElement('td');
    td_id.textContent = z.id; 
    td_id.setAttribute('id',"id_zona_id");
    let td_nombre=document.createElement('td');
    td_nombre.textContent  = z.nom_zona;
    td_nombre.setAttribute('id',"nom_zona_id");
    let td_cod_admin=document.createElement('td');
    td_cod_admin.textContent  = z.cod_admin;
    let td_fecha=document.createElement('td');
    td_fecha.textContent  = reajusteDeFecha(z.fecha_edicion);
    //Botones
    let td_acciones = document.createElement('td');
    td_acciones.setAttribute('id',"atributo");
    let span = document.createElement('span');    
    span.classList.add("btn_editar_datos"); 
    let btn_editar = document.createElement('a');
    btn_editar.setAttribute('href',"#");
    btn_editar.idZona = z.id;
    btn_editar.textContent = 'Editar';
    btn_editar.addEventListener("click",editarZ);
    span.appendChild(btn_editar); 
    let btn_eliminar = document.createElement('a');
    btn_eliminar.setAttribute('href',"#");
    btn_eliminar.textContent = 'Eliminar';
    btn_eliminar.idZona = z.id;
    btn_eliminar.addEventListener("click",eliminarZ);
    span.appendChild(btn_eliminar);


    span.appendChild(btn_eliminar);
    td_acciones.appendChild(span);
    tr.appendChild(td_id);
    tr.appendChild(td_nombre);
    tr.appendChild(td_cod_admin);
    tr.appendChild(td_fecha);
    tr.appendChild(td_acciones);
    tbody.appendChild(tr);


});

}


//Fin Llenar Tabla  Zona //

//Crear Zona// 

//Fin Crear Zona// 



// ** ** ** RUBROS ** ** ** //

// Guardar//

const guardarR = async function(){
    
    var input_rubro = document.getElementById('nombre_zona');
    input_rubro.style.display = "none";
    let input_admin = document.querySelector("#cod_admin_log").name;
    let id_rubro = this.idRubro;
    let rubro = {};
    rubro.id = id_rubro;
    rubro.nom_rubro = input_rubro.value;
    rubro.fecha_edicion = cargarFechaActual();
    rubro.cod_admin = input_admin;
    let resp = await Swal.fire({title:"¿Estás seguro de Editar?", text:"Esta operación se verá reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        console.log(rubro);
        if (await rubroActualizar(rubro) != false){

            await Swal.fire("Rubro Actualizado","Rubro Actualizado exitosamente", "info");
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


//Cancelar//
const cancelarR = function (){
    var rubro = document.getElementById('hide-me-zonas-edicion');
    rubro.style.display = "none";
    var input_rubro = document.getElementById('nombre_zona');
    input_rubro.value = " ";
}

//Editar//

const editarR = async function(){
    let id_rubro = this.idRubro;
    var rubro = document.getElementById('hide-me-zonas-edicion');
    rubro.style.display = "block";  
    var boton_guardar =  document.getElementById('guardar');
    boton_guardar.addEventListener("click",guardarR);
    boton_guardar.idRubro = id_rubro;
    var boton_cancelar =  document.getElementById('cancelar');
    boton_cancelar.addEventListener("click",cancelarR);   
 
    let rubros = await getRubroPorId(id_rubro); 
    var input_rubro = document.getElementById('nombre_zona');
    input_rubro.value = rubros.nom_rubro;


}

// Eliminar//

const eliminarR = async function(){
    let id_rubro = this.idRubro;
    let resp = await Swal.fire({title:"¿Estás seguro de eliminar?", text:"Esta operación es irreversible", icon:"error", showCancelButton:true});
    if(resp.isConfirmed){        
        if (await eliminarRubro(id_rubro) != false){
  
            Swal.fire("Rubro eliminado","Rubro eliminada exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
        location.reload();
    }
}


const cargarTablaRubros = async  function(){
let rubro = await getRubros();
let tbody = document.querySelector('#contenedor_rubro');
rubro.forEach(r => {
    let tr=document.createElement('tr');
    let td_id=document.createElement('td');
    td_id.textContent = r.id; 
    let td_nombre=document.createElement('td');
    td_nombre.textContent  = r.nom_rubro;
    let td_cod_admin=document.createElement('td');
    td_cod_admin.textContent  = r.cod_admin;
    let td_fecha=document.createElement('td');
    td_fecha.textContent  = reajusteDeFecha(r.fecha_edicion);
    //Botones
    let td_acciones = document.createElement('td');
    td_acciones.setAttribute('class',"atributo");
    let span = document.createElement('span');
    span.classList.add("btn_editar_datos"); 
    let btn_editar = document.createElement('a');
    btn_editar.setAttribute('href',"#");
    btn_editar.textContent = 'Editar';
    btn_editar.addEventListener("click",editarR);
    btn_editar.idRubro = r.id; //this.idRubro
    span.appendChild(btn_editar);
    let btn_eliminar = document.createElement('a');
    btn_eliminar.setAttribute('href',"#");
    btn_eliminar.textContent = 'Eliminar';
    btn_eliminar.idRubro = r.id;
    btn_eliminar.addEventListener("click",eliminarR);
    span.appendChild(btn_eliminar);


    span.appendChild(btn_eliminar);
    td_acciones.appendChild(span);
    tr.appendChild(td_id);
    tr.appendChild(td_nombre);
    tr.appendChild(td_cod_admin);
    tr.appendChild(td_fecha);
    tr.appendChild(td_acciones);
    tbody.appendChild(tr);


});

}




//Duracion

const guardarD = async function () {
    
    
    var input_duracion = document.getElementById('nombre_zona');
    input_duracion.style.display = "none";
    let input_admin = document.querySelector("#cod_admin_log").name;
    let id_duracion = this.idDuracion;

    let duracion = {};
    duracion.id = id_duracion;
    duracion.titulo_duracion = input_duracion.value;
    duracion.fecha_edicion = cargarFechaActual();
    duracion.cod_admin = input_admin;
    let resp = await Swal.fire({title:"¿Estás seguro de Editar?", text:"Esta operación se verá reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        console.log(duracion)
        if (await duracionActualizar(duracion) != false){
 
            await Swal.fire("Rubro Actualizado","Rubro Actualizado exitosamente", "info");
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


const cancelarD = function (){
    
    var duracion = document.getElementById('hide-me-zonas-edicion');
    duracion.style.display = "none";
    var input_duracion = document.getElementById('nombre_zona');
    input_rubro.value = " ";
}  

const editarD = async function(){
    
    let id_duracion = this.idDuracion;
    console.log(id_duracion);
    var zona = document.getElementById('hide-me-zonas-edicion');
    zona.style.display = "block";  
    var boton_guardar =  document.getElementById('guardar');
    boton_guardar.addEventListener("click",guardarD);
    boton_guardar.idDuracion = id_duracion;
    var boton_cancelar =  document.getElementById('cancelar');
    boton_cancelar.addEventListener("click",cancelarD);  
    let duracion = await getDuracionPorId(id_duracion);
    console.log(duracion);
    var input_zona = document.getElementById('nombre_zona');
    input_zona.value = duracion.titulo_duracion;
}

const eliminarD = async function(){
    let id_duracion = this.idDuracion;
    let resp = await Swal.fire({title:"¿Estás seguro de eliminar?", text:"Esta operación es irreversible", icon:"error", showCancelButton:true});
    if(resp.isConfirmed){        
        if (await eliminarDuracion(id_duracion) != false){
            // let id = document.querySelector("#id_usuario");
            // let publicaciones = await getPublicacionCodigo(id.name);
            
            // if(publicaciones.length !=0){
            //     cargarTabla(publicaciones);
            // }else{
            //     cargarDiv();
            // }
            Swal.fire("Duración eliminada","Duración eliminada exitosamente", "info");
            location.reload();
            
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
            location.reload();
        }
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
        location.reload();
    }
}

const cargarTablaDuracion = async  function(){
let duracion = await getDuraciones();
let tbody = document.querySelector('#contenedor_duracion');
duracion.forEach(d => {
    let tr=document.createElement('tr');
    let td_id=document.createElement('td');
    td_id.textContent = d.id; 
    let td_nombre=document.createElement('td');
    td_nombre.textContent  = d.titulo_duracion;
    let td_cod_admin=document.createElement('td');
    td_cod_admin.textContent  = d.cod_admin;
    let td_fecha=document.createElement('td');
    td_fecha.textContent  = reajusteDeFecha(d.fecha_edicion);
    //Botones
    let td_acciones = document.createElement('td');
    let span = document.createElement('span');
    span.classList.add("btn_editar_datos"); 
    let btn_editar = document.createElement('a');
    btn_editar.setAttribute('href',"#");
    btn_editar.textContent = 'Editar';
    btn_editar.addEventListener("click",editarD);
    btn_editar.idDuracion = d.id; //this.idDuracion
    span.appendChild(btn_editar); 
    let btn_eliminar = document.createElement('a');
    btn_eliminar.setAttribute('href',"#");
    btn_eliminar.textContent = 'Eliminar';
    btn_eliminar.idDuracion = d.id;
    btn_eliminar.addEventListener("click",eliminarD);
    span.appendChild(btn_eliminar);


    span.appendChild(btn_eliminar);
    td_acciones.appendChild(span);
    tr.appendChild(td_id);
    tr.appendChild(td_nombre);
    tr.appendChild(td_cod_admin);
    tr.appendChild(td_fecha);
    tr.appendChild(td_acciones);
    tbody.appendChild(tr);


});

}

document.addEventListener("DOMContentLoaded",()=>{
    cargarTablaZonas();
    cargarTablaDuracion();
    cargarTablaRubros();
    
});


// ZONA DE CREACION //

