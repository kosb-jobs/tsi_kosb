tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    //readonly:true,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

document.querySelector("#btn-ver-reclamos").addEventListener("click",()=>{
    document.querySelector("#div-creacion-rec").classList.add("d-none");
    document.querySelector("#btn-back").classList.remove("d-none");
    document.querySelector("#btn-ver-reclamos").classList.add("d-none");
    document.querySelector("#contenedor-reclamos").classList.remove("d-none");
});
document.querySelector("#btn-back").addEventListener("click", ()=>{
    document.querySelector("#div-creacion-rec").classList.remove("d-none");
    document.querySelector("#btn-back").classList.add("d-none");
    document.querySelector("#btn-ver-reclamos").classList.remove("d-none");
    document.querySelector("#contenedor-reclamos").classList.add("d-none");
});

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

document.querySelector("#ingresar-reclamo-btn").addEventListener('click', async()=>{
    let tit_reclamo = document.querySelector("#titulo-reclamo").value;
    let asunto_reclamo = document.querySelector("#select-tipo-reclamo").value;
    let descripcion_text = tinymce.get("descripcion-txt").getContent();
    let id_usuario = document.querySelector("#id_usuario").name;
    
    let errores = [];
    if (tit_reclamo == "") {
      errores.push('Debe ingresar un título a la publicación');
    }
    if (descripcion_text == "") {
      errores.push('Debe ingresar una descripción para la publicación');
    }
    if (errores.length != 0) {
      Swal.fire({
        title: "Errores de validación",
        icon: "error",
        html:errores.join("<br />")
      });
    }else{
        let resp = await Swal.fire({title:"¿Seguro que quiere crear un reclamo?", icon:"question", showCancelButton:true});
        if(resp.isConfirmed){
            let reclamo = {};
            reclamo.titulo_reclamo = tit_reclamo;
            reclamo.cod_usuario = id_usuario;
            reclamo.fecha_reclamo = cargarFechaActual();
            reclamo.descripcion_reclamo = descripcion_text;
            reclamo.tipo_reclamo = asunto_reclamo;
            let respuesta = await crearReclamo(reclamo);
            if (respuesta !=false) {
                await Swal.fire({
                    title: "Reclamo creado",
                    icon: "success",
                    text: "El reclamo " + tit_reclamo + " ha sido creada con exito",
                });
                await cargarTotalRec();
            } else {
                await Swal.fire({
                    title: "Error al Crear",
                    icon: "error",
                    text: "Hubo un error al crear el reclamo",
                });
            }
        }
      
    }
});

const cargarTablaReclamos = async(reclamos)=>{
    let t_body = document.querySelector("#contenedor-reclamos");
    t_body.innerHTML = "";
    let i = 0;
    reclamos.forEach(r=>{
        let respuesta_reclamo;
        let tipo_reclamo;
        if (r.tipo_reclamo == "R") {
            tipo_reclamo = "Reclamo";
        }else if(r.tipo_reclamo == "S"){
            tipo_reclamo = "Sugerencia";
        }else if(r.tipo_reclamo == "P"){
            tipo_reclamo = "Denuncia Publicación";
        }else if(r.tipo_reclamo == "U"){
            tipo_reclamo = "Denuncia Usuario";
        }
        if(r.contenido_respuesta == null){
            respuesta_reclamo = `<div class="card-body">
            <h5 class="card-title">El reclamo aun no tiene una respuesta 😕</h5>
        </div>`;
        }else{
            respuesta_reclamo = `<div class="card-body">
            <h5 class="card-title">Respuesta de un adminstrador</h5>
            <p class="card-text"><small class="text-muted">${r.cod_admin}</small></p>
            <p class="card-text">${r.contenido_respuesta}</p>
        </div>`;
        }
        const contenido = `
<div class="card text-center mb-3">
    <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
        <a class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home${i}" type="button" role="tab" aria-controls="home" aria-selected="true">Reclamo</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile${i}" type="button" role="tab" aria-controls="profile" aria-selected="false">Respuesta</a>
        </li>
    </ul>
    </div>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home${i}" role="tabpanel" aria-labelledby="home-tab">
            <div class="card-body text-start">
                <p class="card-text"><small class="text-muted">Código de Reclamo: ${r.id}</small></p>
                <h5 class="card-title">Título del reclamo: ${r.titulo_reclamo}</h5>
                <p class="card-text"><small class="text-muted">${tipo_reclamo}</small></p>
                <p class="card-text">Descripción del reclamo: ${r.descripcion_reclamo}</p>
                <button class="btn btn-danger" name="${r.id}" id="btn-eliminar-${i}">Eliminar Reclamo</button>
            </div>
        </div>
        <div class="tab-pane fade" id="profile${i}" role="tabpanel" aria-labelledby="profile-tab">
            `+respuesta_reclamo+`
        </div>
    </div>
</div>`;
        i += 1;
        t_body.innerHTML += contenido;
    });
}
const cargarDivReclamo = ()=>{
    //funcion que muestra un mensaje de inexistencia de publicaciones y te guia a pagina crear publicación
    let elemento = document.querySelector("#contenedor-reclamos");
    elemento.classList.remove("contenedor");
    elemento.classList.add("text-center");
    let contenido = `
    
    <div class="text-center m-5">
        <div class="card shadow-lg text-center">
            <div class="card-body">
                <h5 class="card-title">No Tiene Reclamos creados</h5>
                <h6 class="card-subtitle mb-2 text-muted">🤔🔎</h6>
                <p class="card-text">Si tienes un reclamo que hacer puedes crear uno con el boton crear de arriba</p>
            </div>
        </div>
    </div>
    
    `;
    elemento.innerHTML = contenido;
}

const cargarTotalRec = async ()=>{
    let id = document.querySelector("#id_usuario");
    let reclamos = await getReclamosUsuario(id.name);
    
    if(reclamos.length == 0){
        cargarDivReclamo();
    }else{
        cargarTablaReclamos(reclamos);
        for(let i=0;i<reclamos.length;i++){
            document.querySelector(`#btn-eliminar-${i}`).addEventListener('click',async()=>{
                let id_reclamo = document.querySelector(`#btn-eliminar-${i}`).name;
                
                let resp = await Swal.fire({title:"¿Seguro que desea eliminar el reclamo con código "+id_reclamo+"?", icon:"question", showCancelButton:true});
                if(resp.isConfirmed){
                    let respuesta = await eliminarReclamo(id_reclamo);
                    if (respuesta !=false) {
                        await Swal.fire({
                            title: "Reclamo eliminado",
                            icon: "info",
                            text: "El reclamo ha sido eliminado con exito",
                        });
                        await cargarTotalRec();
                    } else {
                        await Swal.fire({
                            title: "Error al Eliminar",
                            icon: "error",
                            text: "Hubo un error al eliminar el reclamo",
                        });
                    }
                }
            });
        }
    }
}
document.addEventListener("DOMContentLoaded",async()=>{
    //cuando el documento se carga tambien se cargan en las distintas partes de la pagina los get de las cosas del usuario
    // let datos_usuario = await getDatosCompletosPorUser(id.name);
    // cargarDatosUsuario(datos_usuario);
    
    await cargarTotalRec();
    
});