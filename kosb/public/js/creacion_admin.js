
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


// ZONA DE CREACION //

document.getElementById("Btn_Zona").addEventListener("click", async function() {
    var input_zona = document.getElementById('input_crear');
    let input_admin = document.querySelector("#cod_admin_log").name;
    zona = {};
    zona.nom_zona=input_zona.value;    
    zona.cod_admin = input_admin;
    zona.fecha_edicion = cargarFechaActual();

    //suitalert

    let resp = await Swal.fire({title:"¿Estas seguro de Crear una nueva Zona?", text:"Esta operacion se vera reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        nom_zona = input_zona.value; 
        let zonas = await getZonaPorNombre(nom_zona);
        if(zonas.length !=0){
            await Swal.fire("UPS!, Error", "Zona ya existente", "error");

        }else{
            if (await crearZona(zona) != false){
                await Swal.fire("Zona Creada","Zona Creada exitosamente", "info");
                location.reload();

            }else{
                await Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
                location.reload();
            }
            
        }
        
    }else{
        await Swal.fire("Cancelado","Cancelacion de petición", "info");
        location.reload();
    }



  });

document.getElementById("Btn_Rubro").addEventListener("click", async function() {
    var input_rubro = document.getElementById('input_crear');
    let input_admin = document.querySelector("#cod_admin_log").name;
    rubro = {};
    rubro.nom_rubro=input_rubro.value;    
    rubro.cod_admin = input_admin;
    rubro.fecha_edicion = cargarFechaActual();

    //suitalert

    let resp = await Swal.fire({title:"¿Estas seguro de Crear un nuevo Rubro?", text:"Esta operacion se vera reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        nom_rubro = input_rubro.value; 
        let rubros = await getRubroPorNombre(nom_rubro);
        if(rubros.length !=0){
            await Swal.fire("UPS!, Error", "Rubro ya existente", "error");
            
        }else{
            if (await crearRubro(rubro) != false){
                await Swal.fire("Rubro Creado","Rubro Creado Exitosamente", "info");
                location.reload();


            }else{
                await Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
                location.reload();
            }
            
        }
        
    }else{
        await Swal.fire("Cancelado","Cancelacion de petición", "info");
        location.reload();
    }
});

document.getElementById("Btn_Duracion").addEventListener("click", async function() {
    var input_duracion = document.getElementById('input_crear');
    let input_admin = document.querySelector("#cod_admin_log").name;
    duracion = {};
    duracion.titulo_duracion=input_duracion.value;    
    duracion.cod_admin = input_admin;
    duracion.fecha_edicion = cargarFechaActual();

    //suitalert

    let resp = await Swal.fire({title:"¿Estas seguro de Crear una nueva Duracion?", text:"Esta operacion se vera reflejada al aceptar", icon:"info", showCancelButton:true});
    if(resp.isConfirmed){
        titulo_duracion = input_duracion.value; 
        let duraciones = await getDuracionPorNombre(titulo_duracion);
        if(duraciones.length !=0){
            await Swal.fire("UPS!, Error", "Duracion ya existente", "error");
            
        }else{
            if (await crearDuracion(duracion) != false){
                await Swal.fire("Duracion Creada","Duracion Creada Exitosamente", "info");
                location.reload();


            }else{
                await Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
                location.reload();
            }
            
        }
        
    }else{
        await Swal.fire("Cancelado","Cancelacion de petición", "info");
        location.reload();
    }
});