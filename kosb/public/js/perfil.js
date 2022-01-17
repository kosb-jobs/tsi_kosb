

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

 tinymce.init({
    selector: '#descripcion-txt-porfiao',
    height: 200,
    menubar: false,
    readonly:true,
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

//FUNCIONES PARA ELIMINAR Y LLAMADAS A CONTROLLER

const eliminarPublicacionBTN = async function(){
    //trae la info del boton, llama a la funcion del service y elimina segun el id traido
    let cod_publicacion = this.idPub;
    let resp = await Swal.fire({title:"¿Estás seguro de eliminar?", text:"Esta operación es irreversible", icon:"question", showCancelButton:true});
    if(resp.isConfirmed){
        let respu = await eliminarPublicacion(cod_publicacion);
        if ( respu!= false){
            
            await Swal.fire("Respuesta a eliminación",respu, "info");
            window.location.href = "/kosb/public/perfil";
        }else{
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
        }
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
    }
}

const actualizarAccion = async function(){
    //comienza la actualizacion habilitando los inputs de abajo junto con el boton y 
    //trayendo la informacion correspondiente para cada input y dejandola para updatear
    let id = this.idPub;
    let publicacion = await getPublicacionCodigo(id);
    let btn = document.querySelector("#guardar-cambios-btn");
    btn.disabled = false;
    btn.idPub = id;
    let titulo = document.querySelector("#titulo-txt");
    titulo.disabled =false;
    //let descripcion_text = document.querySelector('#descripcion-txt-porfiao');
    //console.log(descripcion_text);
    //descripcion_text.disabled = false;
    
    let fecha_fin_input = document.querySelector("#fecha-fin-date");
    fecha_fin_input.disabled =false;
    let descripcion_text = tinymce.get("descripcion-txt-porfiao");
    descripcion_text.mode.set('design');
    
    let fecha = document.querySelector("#fecha-date");
    fecha.disabled = false;
    
    let s_zonas = document.querySelector("#zonas-select");
    s_zonas.disabled = false;
    let s_duraciones = document.querySelector("#duracion-select");
    s_duraciones.disabled =false;
    let s_rubros = document.querySelector("#rubros-select");
    s_rubros.disabled = false;
    let zonas = await getZonas();
    let rubros = await getRubros();
    let duraciones = await getDuraciones();
    cargarSelectZonas(zonas,"#zonas-select");
    cargarSelectRubros(rubros,"#rubros-select");
    cargarSelectDurac(duraciones,"#duracion-select");
    for(let i=0; i<zonas.length;i++){
        if(zonas[i].id==publicacion.cod_zona){
            s_zonas.value = zonas[i].id;
        }
    }
    for(let i=0; i<duraciones.length;i++){
        if(duraciones[i].id==publicacion.cod_duracion){
            s_duraciones.value = duraciones[i].id;
        }
    }
    for(let i=0; i<rubros.length;i++){
        if(rubros[i].id==publicacion.cod_rubro){
            rubros.value = rubros[i].id;
        }
    }
    titulo.value = publicacion.titulo_publicacion;
    fecha.value = publicacion.fecha_ini;
    fecha_fin_input.value = publicacion.fecha_fin;
    descripcion_text.setContent(publicacion.descripcion);
    //descripcion_text.innerText = publicacion.descripcion;
}

const eliminarPostulacionBTN = async function(){
    let id = this.idPost;
    let resp = await Swal.fire({title:"¿Estás seguro de eliminar?", text:"Esta operación es irreversible", icon:"warning", showCancelButton:true});
    if(resp.isConfirmed){
        let respu = await eliminarPostulacion(id);
        if (respu != false && respu != "La eliminación no puede realizarse una vez que la postulación fue aceptada"){
            let id_usuario = document.querySelector("#id_usuario").name;
            let postulaciones = await getPostulacionesUser(id_usuario);
            
            //actualizarPostTotales(id_usuario.name);
            console.log(id_usuario);
            if(postulaciones.length !=0){
                cargarTablaPostulaciones(postulaciones);
            }else{
                cargarDivPostulacion();
            }
            Swal.fire("Postulación eliminada","Postulación eliminada exitosamente", "info");
        }else if(respu == false){
            Swal.fire("UPS!, Error", "No se pudo atender la solicitud", "error");
        }else if(respu == "La eliminación no puede realizarse una vez que la postulación fue aceptada"){
            Swal.fire("No eliminada", respu, "warning");
        }
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
    }
}

const verPublicacion = async function(){
    let id_publicacion = this.idPub;
    let publicacion = await getPublicacionCodigo(id_publicacion);
    let zonas = await getZonas();
    let rubros = await getRubros();
    let duraciones = await getDuraciones();
    publicacionl = [];
    publicacionl.push(publicacion);
    publicacionl = reajusteDeContenidoPubs(publicacionl,zonas, rubros,duraciones);
    publicacion = publicacionl[0];
    let descripcion_nueva = String(publicacion.descripcion);
    publicacion.descripcion = descripcion_nueva.substring(3,descripcion_nueva.length-4);
    let a = `
<div class="col-12 col-md col-lg">
    <div class="card shadow-lg mt-2">
        <div class="card-header">
            <div class="row">
            <span class="text-start"> Código publicación: ${publicacion.id}</span>
            <h3 class="text-start ms-3"> Título: <span id="tit-pub">${publicacion.titulo_publicacion}</span></h3>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 text-end">
                    <label class="mb-3">Rubro</label>
                </div>
                <div class="col-12 col-md col-lg text-start">
                    <label class="mb-3">${publicacion.cod_rubro}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 text-end">
                    <label class="mb-3">Descripción</label>
                </div>
                <div class="col-12 col-md col-lg text-start">
                    <label class="">${publicacion.descripcion}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 text-end">
                    <label for="" class="mb-3">Duración</label>
                </div>
                <div class="col-12 col-md col-lg text-start">
                    <label for="" class="mb-3">${publicacion.cod_duracion}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 text-end">
                    <label for="" class="mb-3">Zona</label>
                </div>
                <div class="col-12 col-md col-lg text-start">
                    <label for="" class="mb-3">${publicacion.cod_zona}</label>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 text-end">
                    <label for="" class="mb-3">Fechas</label>
                </div>
                <div class="col-12 col-md col-lg text-start">
                    <label for="" class="mb-3">${publicacion.fecha_ini} hasta ${publicacion.fecha_fin}</label>
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>
</div>`
    
    Swal.fire({title:"Publicación a la que postuló",
    html:a,
    width: 1000,
    });


}
{/* <div class="row">
<div class="col-12 col-md-6 col-lg-6">
    <label for="" class="mb-3">Rubro</label>
</div>
<div class="col-12 col-md col-lg">
    <label for="" class="mb-3">...</label>
</div>
</div> */}

const reajusteDeContenidoPubs = (publicaciones, zonas, rubros, duraciones)=>{
    //INTENTA CAMBIAR EL CONTENIDO DE ALGUNOS ATRIBUTOS DE PUBLICACION
    
    publicaciones.forEach(p => {
        p.fecha_ini = reajusteDeFecha(p.fecha_ini);
        p.fecha_fin = reajusteDeFecha(p.fecha_fin);
        zonas.forEach(z => {
            if(p.cod_zona == z.id){
                p.cod_zona = z.nom_zona;
            }
        });
        rubros.forEach(r => {
            if(p.cod_rubro == r.id){
                p.cod_rubro = r.nom_rubro;
            }
        });
        duraciones.forEach(d => {
            if(p.cod_duracion == d.id){
                p.cod_duracion = d.titulo_duracion;
            }
        });

    });
    return publicaciones;
}

const limpiarUpdate = ()=>{
    //limpia la zona de los inputs del update...
    let btn = document.querySelector("#guardar-cambios-btn");
    btn.disabled = true;
    //titulo
    let titulo = document.querySelector("#titulo-txt");
    titulo.value = "";
    titulo.disabled =true;
    //fecha_inicio
    let fecha = document.querySelector("#fecha-date");
    fecha.value = cargarFechaActual();
    fecha.disabled = true;
    //rubro
    let s_rubros = document.querySelector("#rubros-select");
    s_rubros.value = s_rubros.firstChild.value;
    s_rubros.disabled = true;
    //zonas
    let s_zonas = document.querySelector("#zonas-select");
    s_zonas.value = s_zonas.firstChild.value;
    s_zonas.disabled = true;
    //duraciones
    let s_duraciones = document.querySelector("#duracion-select");
    s_duraciones.value = s_duraciones.firstChild.value;
    s_duraciones.disabled =true;
    //descripcion
    let descripcion_text = tinymce.get("descripcion-txt-porfiao");
    descripcion_text.setContent("");
    //tinymce.activeEditor.setMode('readonly');
    descripcion_text.mode.set('readonly');
    //let descripcion_text = document.querySelector('#descripcion-txt');
    //descripcion_text.disabled = true;
    //fecha_fin
    let fecha_fin = document.querySelector("#fecha-fin-date");
    fecha_fin.value = "";
    fecha_fin.disabled = true;
    
    
    
}


//CARGAS DE SELECTS U OTRAS COSAS
const cargarSelectZonas = (zonas,id_zona)=>{
    //cargar select de zonas
    let select = document.querySelector(id_zona);
    select.innerHTML = "";
    for(let i=0;i<zonas.length;i++){
          let option = document.createElement("option");
          option.value = zonas[i].id;
          option.innerText = zonas[i].nom_zona;
          select.appendChild(option);
    }
}

const cargarSelectRubros = (rubros,id)=>{
    //cargar el select correspondiente a rubros
    let select = document.querySelector(id);
    select.innerHTML = "";
    for(let i=0;i<rubros.length;i++){
        let option = document.createElement("option");
        option.value = rubros[i].id;
        option.innerText = rubros[i].nom_rubro;
        select.appendChild(option);
    }
}

const cargarSelectDurac = (durac,id)=>{
    //carga el select de duracion
    let select = document.querySelector(id);
    select.innerHTML = "";
    for(let i=0;i<durac.length;i++){
        let option = document.createElement("option");
        option.value = durac[i].id;
        option.innerText = durac[i].titulo_duracion;
        select.appendChild(option);
    }
}



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

const cargarContPostPorPublicacion = async(publicacion)=>{
    let acordion = document.querySelector('#accordionPostulaciones');
    //console.log('ta entrando ,, así que no entiendo');
    acordion.innerHTML = "";
    let i = 0 ; 
    publicacion.forEach(async p=>{
        let postulaciones = await getPostulPorPublicacion(p.id);
        let contenido_dos= ``;
        if (postulaciones.length == 0) {
            contenido_dos = 
            `<strong>No hay Postulaciones</strong></br>
            <code>Esta publicación no tiene postulaciones</code>`;
        }else{
            
            for (let j = 0; j < postulaciones.length; j++) {
                let postul = postulaciones[j];
                let aceptacion = "";
                let style_body = "";
                let style_head = "";
                if (postul.aceptacion == null) {
                    aceptacion = "Aun sin respuesta";
                }else if(postul.aceptacion == 0){
                    aceptacion = "Rechazado";
                    style_body = "border-color: #ffb0a8;background: #fff0ee";
                    style_head = "background: #ffd2cd;border-color: #ffb0a8";
                }else{
                    aceptacion = "Aceptado";
                    style_body = "border-color: #ffb0a8;background: #fff0ee";
                    style_head = "background: #ffd2cd;border-color: #ffb0a8";
                }
                let user = await getUsuarioPorId(postul.cod_usuario);
                let botones = ``;
                if(postul.aceptacion == null){
                    botones = `<button id="aceptar_postulante_${p.id}_${postul.id}" name="${postul.id}" class="btn me-5">Aceptar</button><button id="rechazar_postulante_${p.id}_${postul.id}" name="${postul.id}" class="btn btn-danger">Rechazar</button>`;
                }else{
                    botones=`<p>Ya respondido <code>${aceptacion}</code></p>`
                }
                contenido_dos += 
                    `<div class="card mb-3" style="${style_head}">
                    <div class="card-header row">
                      <div class="col-12 col-md-8 col-lg-8">
                        Postulación
                      </div>
                      <div class="col-12 col-md col-lg text-end">
                        <button id="ver_perfil_postulante_${p.id}_${postul.id}" name="${postul.cod_usuario}" class="btn btn-primary badge">Ver Perfil del usuario</button>
                      </div>
                    </div>
                    <div class="card-body" style="${style_body}">
                      <h5 class="card-title">Código de usuario: ${postul.cod_usuario} ~~~ ${user.name} ~~~ ${user.email}</h5>
                      <p class="card-text">${reajusteDeFecha(postul.fecha_postulacion)}  ~~~  ${aceptacion}</p>
                      `+botones+`
                    </div>
                  </div>`;
            }
            contenido_dos += `
            <div class="card mb-3 text-center">
                <div class="card-body">
                    <button class="btn" id="final_etapa_postul_${p.id}" name="${p.id}">Finalizar Etapa de Postulación</button>
                </div>
            </div>
            `;
        }
        
        let contenido = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                    ${p.id} ${p.titulo_publicacion}
                </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionPostulaciones">
                <div class="accordion-body">
                    `+contenido_dos+`
                </div>
            </div>
        </div>
        `;
        i++;
        acordion.innerHTML += contenido;
    });
    return publicacion;
}
const cargarTablaPostulaciones = (postulaciones)=>{
    let t_body = document.querySelector("#tbody-postulaciones");
    t_body.innerHTML = "";
    for (let index = 0; index < postulaciones.length; index++) {
        const p = postulaciones[index];
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML += p.cod_publicacion;
        let td2 = document.createElement("td");
        if (p.aceptacion == null) {
            td2.innerHTML = "Sin Respuesta";
        }else if(p.aceptacion == 0){
            td2.innerHTML += 'Solucitud Rechazada';
        }else if(p.aceptacion == 1){
            td2.innerHTML += 'Solucitud Aceptada';
        }
        
        let td3 = document.createElement("td");
        td3.innerHTML += reajusteDeFecha(p.fecha_postulacion);
        let td4 = document.createElement("td");
        let btn_eliminar = document.createElement("button");
        let btn_ver = document.createElement("button");
        btn_ver.classList.add("btn","mt-2","me-3");
        btn_eliminar.classList.add("btn","mt-2");
        btn_eliminar.idPost = p.id;
        btn_ver.idPub = p.cod_publicacion;
        btn_eliminar.addEventListener("click",eliminarPostulacionBTN);
        btn_ver.addEventListener("click",verPublicacion);
        btn_eliminar.innerText = "Borrar";
        btn_ver.innerText = "Ver publicación";
        
        td4.appendChild(btn_ver);
        td4.appendChild(btn_eliminar);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        t_body.appendChild(tr);
        
    }
}

const cargarSinPostulPorPub = ()=>{
    let elemento = document.querySelector("#contenedor-de-postulaciones-a-mis-postulaciones");
        
    let contenido = `
    <div class="ms-5 mt-5">
        <div class="ms-5">
            <div class="ms-5">
                <div class="ms-5">
                    <div class="card ms-5 shadow-lg" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">No Tienes Publicaciones Creadas</h5>
                            <h6 class="card-subtitle mb-2 text-muted">😕🛠📒</h6>
                            <p class="card-text">Al no tener ninguna publicación ningun usuario puede postular, crea publicaciones interesantes para que otros usuarios postulen a tus ofertas de trabajos</p>
                            <p>Para crear publicaciones vaya a <a href="crear_publicacion" class="card-link"><code>Creación de publicaciones</code></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `;
    elemento.innerHTML = contenido;
    
}

const cargarTabla = (publicaciones)=>{
    let t_body = document.querySelector("#tbody");
    t_body.innerHTML = "";
    publicaciones.forEach(p=>{

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML += p.cod_zona;
        let td2 = document.createElement("td");
        td2.innerHTML += p.titulo_publicacion;
        let td3 = document.createElement("td");
        td3.innerHTML += p.fecha_ini;
        let td4 = document.createElement("td");
        td4.innerText += p.cod_duracion;
        let td5 = document.createElement("td");
        let btn_eliminar = document.createElement("button");
        let btn_actualizar = document.createElement("button");
        btn_actualizar.classList.add("btn","mt-2","me-3");
        btn_eliminar.classList.add("btn","mt-2");
        btn_eliminar.idPub = p.id;
        btn_actualizar.idPub = p.id;
        btn_eliminar.addEventListener("click",eliminarPublicacionBTN);
        btn_actualizar.addEventListener("click",actualizarAccion);
        btn_eliminar.innerText = "Borrar";
        btn_actualizar.innerText = "Actualizar";
        
        td5.appendChild(btn_actualizar);
        td5.appendChild(btn_eliminar);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        t_body.appendChild(tr);
    });

}

const cargarDiv = ()=>{
    //funcion que muestra un mensaje de inexistencia de publicaciones y te guia a pagina crear publicación
    let elemento = document.querySelector("#orders-tab");
        
    let contenido = `
    <div class="ms-5">
        <div class="ms-5">
            <div class="ms-5">
                <div class="ms-5">
                    <div class="card ms-5 shadow-lg" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">No Tienes Publicaciones Creadas</h5>
                            <h6 class="card-subtitle mb-2 text-muted">🧐👌</h6>
                            <p class="card-text">Puedes crear alguna entrando a Crear Publicación</p>
                            <a href="crear_publicacion" class="card-link">Ir a Crear Publicación</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `;
    elemento.innerHTML = contenido;
}

const cargarDivPostulacion = ()=>{
    //funcion que muestra un mensaje de inexistencia de publicaciones y te guia a pagina crear publicación
    let elemento = document.querySelector("#address-tab");
        
    let contenido = `
    <div class="ms-5">
        <div class="ms-5">
            <div class="ms-5">
                <div class="ms-5">
                    <div class="card ms-5 shadow-lg" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">No Tienes Postulaciones realizadas</h5>
                            <h6 class="card-subtitle mb-2 text-muted">🤔🔎</h6>
                            <p class="card-text">Busca un trabajo y postula a la publicación</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `;
    elemento.innerHTML = contenido;
}

const cargarDatosUsuario = (datos)=>{
    console.log(datos);
    let input_cod = document.querySelector("#cod-usuario");
    let input_puntuacion = document.querySelector("#puntuacion-total");
    let prom = (datos.puntuacion_trabajador / 2 ) + (datos.puntuacion_ofertante / 2);
    input_puntuacion.innerHTML = prom;
    input_cod.innerHTML += datos.cod_usuario;
    let input_correo = document.querySelector("#correo-txt");
    input_correo.innerHTML += datos.email;
    let text_punt_trabaj = document.querySelector("#puntuacion-trabajador");
    text_punt_trabaj.innerHTML = datos.puntuacion_trabajador;
    let text_post_activas = document.querySelector("#post-activas");
    text_post_activas.innerHTML += datos.postulaciones_activas;
    let text_post_totales = document.querySelector("#total-post");
    text_post_totales.innerHTML += datos.postulaciones_realizadas_tot;
    let text_punt_ofertante = document.querySelector("#puntiacion-ofertante");
    text_punt_ofertante.innerHTML = datos.puntuacion_ofertante;
    let text_pub_act = document.querySelector("#pub-activas");
    text_pub_act.innerHTML += datos.publicaciones_activas;
    let text_pub_totales = document.querySelector("#pub-totales");
    text_pub_totales.innerHTML += datos.ofertas_total_publ;
}

const cargarDivReclamo = ()=>{
    //funcion que muestra un mensaje de inexistencia de publicaciones y te guia a pagina crear publicación
    let elemento = document.querySelector("#contenedor-reclamos");
    elemento.classList.remove("contenedor");
    elemento.classList.add("text-center");
    let contenido = `
    
    <div class="ms-5">
        <div class="ms-5">
            <div class="ms-5">
                <div class="ms-5">
                    <div class="card ms-5 shadow-lg" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">No Tiene Reclamos creados</h5>
                            <h6 class="card-subtitle mb-2 text-muted">🤔🔎</h6>
                            <p class="card-text">Si tienes un reclamo que hacer puedes crear uno con el boton crear de arriba</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `;
    elemento.innerHTML = contenido;
}

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


//FUNCIONES O ACCIONES DE BOTONES (O FORMULARIO) DESDE BLADE.php
document.querySelector("#guardar-cambios-btn").addEventListener("click",async function(){
    //Boton que guarda los cambios para actualizar una publicación
    let btn = document.querySelector("#guardar-cambios-btn");
    let get = await getPublicacionCodigo(btn.idPub);
    let titulo = document.querySelector("#titulo-txt").value;
    let fecha = document.querySelector("#fecha-date").value;
    let fecha_fin = document.querySelector("#fecha-fin-date").value;
    let descripcion_text = tinymce.get("descripcion-txt-porfiao").getContent();
    let s_zonas = document.querySelector("#zonas-select").value;
    let s_duraciones = document.querySelector("#duracion-select").value;
    let s_rubros = document.querySelector("#rubros-select").value;
    let dia1 = new Date(fecha);
    let dia2 = new Date(fecha_fin);
    let difference = dia2.getTime()-dia1.getTime();
    let dias_totales = difference/(1000 * 3600 * 24);
    //validaciones
    errores = [];
    if (fecha <= get.fecha_publicada){
        errores.push("Fecha de inicio mal ingresada, debe ser un día en el futuro");
    }
    if(dias_totales<0){
    errores.push("La fecha de fin no puede ser anterior a la fecha en que comienze el trabajo");
    }
    if (titulo == "") {
        errores.push("Debe Tener un título");
    }
    if (fecha == "" || fecha == 0) {
        errores.push("Debe Tener una fecha");
    }
    if(fecha_fin == 0){
    errores.push("Ingrese una fecha estimada de fin de trabajo");
    }
    if (s_zonas == 0) {
        errores.push("Debe seleccionar una zona");
    }
    if (s_rubros == 0) {
        errores.push("Debe seleccionar un rubro");
    }
    if (s_duraciones == 0) {
        errores.push("Debe seleccionar una duración");
    }
    if (descripcion_text == 0) {
        errores.push("Debe Tener una descripción");
    }
    if (errores.length != 0) {
        Swal.fire({
            title: "Errores de validación",
            icon: "error",
            html:errores.join("<br />")
          });
    } else {
        //si pasa las validaciones
        publicacion = {};
        publicacion.id = btn.idPub;
        publicacion.cod_duracion = s_duraciones;
        publicacion.cod_zona = s_zonas;
        publicacion.cod_rubro = s_rubros;
        publicacion.titulo = titulo;
        publicacion.fecha_ini = fecha;
        publicacion.fecha_fin = fecha_fin;
        publicacion.fecha_publicada = get.fecha_publicada;
        publicacion.descripcion = descripcion_text;
        publicacion.tipo_oferta = get.tipo_oferta;
        publicacion.cod_usuario = get.cod_usuario;

        let resp = await publicacionActualizar(publicacion);
        
        if(resp!=false){
            let id = document.querySelector("#id_usuario");
            let publicaciones = await getPublicacionesUsuario(id.name);
            let zonas = await getZonas();
            let rubros = await getRubros();
            let duraciones = await getDuraciones();
            Swal.fire("Publicación de trabajo actualizada","Publicación actualizada exitosamente", "success");
            if(publicaciones.length !=0){
                publicaciones = reajusteDeContenidoPubs(publicaciones, zonas,rubros,duraciones);
                cargarTabla(publicaciones);
            }else{
                cargarDiv();
            }
            limpiarUpdate();
        }else{
            console.log(resp);
        }
        
    }
});

document.querySelector("#actualizar-usuario").addEventListener("click", async function(){
    let id_usuario = document.querySelector("#id_usuario").name;
    let nombre = document.querySelector("#name-user").value;
    let apellido = document.querySelector("#apellido-user").value;
    let fecha_nac = document.querySelector("#fecha-nac-user").value;
    let femenino = document.querySelector("#femenino-rd");
    let masculino = document.querySelector("#masculino-rd");
    let otros = document.querySelector("#otros-rd");
    errores = [];
    let sexo = "";
    if (nombre == "") {
        errores.push("Debe ingresar un nombre");
    }
    if (apellido == "") {
        errores.push("Debe ingresar un apellido");
    }
    if (fecha_nac == 0) {
        errores.push("Debe ingresar la fecha de nacimiento");
    }
    if (!femenino.checked && !masculino.checked && !otros.checked ) {
        errores.push("Debe seleccionar un sexo");
    }else{
        if(femenino.checked){
            sexo = femenino.value;
        }else if(masculino.checked){
            sexo = masculino.value;
        }else{
            sexo = otros.value;
        }
    }
    if(errores.length != 0){
        Swal.fire({
            title: "Errores de validación",
            icon: "error",
            html:errores.join("<br />")
          });
    }else{
        let resp = await Swal.fire({
            title: "¿Seguro desea actualizar los datos?",
            icon: "info",
            showCancelButton: true,
          });
        
        if(resp.isConfirmed){

            usuario = {};
            usuario.id = id_usuario;
            usuario.name = nombre;
            usuario.sexo = sexo;
            usuario.apellido = apellido;
            usuario.fecha_nac = fecha_nac;
            let respuesta = await usuarioActualizar(usuario);

            Swal.fire({
                title: "Actualización realizada",
                icon: "success",
              });
        }
    }
});

document.querySelector('#btn-back-reclamos').addEventListener('click', ()=>{
    let contenido_reclamos = document.querySelector("#contenedor-reclamos");
    contenido_reclamos.classList.remove('d-none');
    let contenido_creacion = document.querySelector('#div-creacion-rec');
    contenido_creacion.classList.add('d-none');
    let boton_back = document.querySelector('#btn-back-reclamos');
    boton_back.classList.add('d-none');
});
document.querySelector('#btn-activar-creacion-reclamo').addEventListener('click',()=>{
    let contenido_reclamos = document.querySelector("#contenedor-reclamos");
    contenido_reclamos.classList.add('d-none');
    let contenido_creacion = document.querySelector('#div-creacion-rec');
    contenido_creacion.classList.remove('d-none');
    let boton_back = document.querySelector('#btn-back-reclamos');
    boton_back.classList.remove('d-none');
});

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
          window.location.href = "/kosb/public/perfil";
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


// document.querySelector('#publicaciones_post').addEventListener('click',async ()=>{
//     console.log('buenas');
//     let id = document.querySelector("#id_usuario");
//     let publicaciones = await getPublicacionesUsuario(id.name);

//     nuevo_metodo(publicaciones);

// });
// const ele = `

// <div class="accordion-item">
// <h2 class="accordion-header" id="headingThree">
//   <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//     Accordion Item #3
//   </button>
// </h2>
// <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
//   <div class="accordion-body">
//     <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
//   </div>
// </div>
// </div>`;

// document.querySelector('#check-for-delete').addEventListener('click',()=>{
//     let boton = document.querySelector('#elim-cuenta-btn');
//     if(document.querySelector('#check-for-delete').checked){
//         boton.disabled = false;
//     }else{
//         boton.disabled = true;
//     }
// });


//Esto es caca hay que sacarlo 

// document.querySelector('#elim-cuenta-btn').addEventListener('click',async()=>{
//     let id_usuario = document.querySelector('#id_usuario').name;
//     let resp = await Swal.fire({title:"¿Seguro que quiere crear un reclamo?", icon:"question", showCancelButton:true});
//     if (resp.isConfirmed) {
//         let respuesta = await eliminarUsuario(id_usuario);
//         if(respuesta == false){
//             await Swal.fire({
//                 title: "Algo salió mal",
//                 icon: "error",
//                 text: "Eliminación fallida",
//               });
//         }else{
//             //window.location.href = "/kosb/public/crear_perfil";
//             //console.log(respuesta);
//         }
        
//     } else {
//         await Swal.fire({
//             title: "Acción cancelada",
//             icon: "warning",
//             text: "Eliminación cancelada",
//           });
//     }
    
// });

document.querySelector('#admin-nav').addEventListener('click', async()=>{
    let codigo = document.querySelector('#id_usuario').name;
    let resp = await getAdminPorUsuario(codigo);
    if (resp.length != 0) {
        window.location.href = "/kosb/public/home_admin";
    } else {
        await Swal.fire({
            title: "No redireccionado",
            icon: "warning",
            text: "Usted no es usuario administrador",
        });
    }
    console.log(resp);
});





document.addEventListener("DOMContentLoaded",async()=>{
    //document.getElementById('descripcion-txt').disabled = true;
    //cuando el documento se carga tambien se cargan en las distintas partes de la pagina los get de las cosas del usuario
    let id = document.querySelector("#id_usuario");
    let publicaciones = await getPublicacionesUsuario(id.name);
    await cargarContPostPorPublicacion(publicaciones);
    let datos_usuario = await getDatosCompletosPorUser(id.name);
    cargarDatosUsuario(datos_usuario);
    let zonas = await getZonas();
    let rubros = await getRubros();
    let duraciones = await getDuraciones();
    
    let reclamos = await getReclamosUsuario(id.name);
    let postulaciones = await getPostulacionesUser(id.name);
    
    if (publicaciones.length != 0) {
        let a = 0;
        publicaciones.forEach( async pub => {
            let post_ = await getPostulPorPublicacion(pub.id);
            if (post_.length !=0) {
                
                for(let j=0;j<post_.length;j++){ 
                    //Aqui creo que va el boton ver perfil user
                    document.querySelector(`#ver_perfil_postulante_${pub.id}_${post_[j].id}`).addEventListener("click", async function(){
                        let id_postulante = this.name;
                        console.log(id_postulante);
                        let datos = await getDatosCompletosPorUser(id_postulante);
                        console.log(datos);
                        await Swal.fire({
                            title: `Informacion del usuario`,
                            html: ` 
                            <table>
                                <tr>
                                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="person-circle-outline"></ion-icon></b></a></td>
                                </tr>
                                <tr>
                                    <td><a><b>Nombre:</b> ${datos.name} ${datos.apellido}<a></td>
                                </tr>
                                
                                <tr>
                                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="mail-outline"></ion-icon></b></a></td>
                                </tr>
                                <tr>
                                    <td><a><b>Email:</b> ${datos.email} <a></td>
                                </tr>

                                <tr>
                                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><ion-icon name="star-half-outline"></ion-icon></b></a></td>
                                </tr>
                                <tr>
                                    <td><a><b>Puntuación Total Trabajador:</b> ${datos.puntuacion_trabajador}<a></td>
                                </tr>

                                <tr>
                                    <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="barbell-outline"></ion-icon></b></a></td>
                                </tr>
                                <tr>
                                    <td><a><b>Postulaciones Totales:</b> ${datos.postulaciones_realizadas_tot}<a></td>
                                </tr>
                            
                            
                            </table>

                            `,
                            confirmButtonText: "Listo",
                            width: 600,
                            padding: '3em',
                            color: '#5089C3',
                            
                            backdrop: `
                            rgba(0,0,123,0.4)                            
                            left top
                            no-repeat
                            `
                          })

                    }
                    );
                    
                    document.querySelector(`#final_etapa_postul_${pub.id}`).addEventListener("click", async function(){
                        let publicacion = {};
                        publicacion.id = this.name;
                        publicacion.estado = 'FPP';
                        let post_aceptadas = await getPostulAceptadasPorPublicacion(this.name);
                        
                        let resp = await Swal.fire({title:"¿Seguro que desea finalizar la etapa de postulación de la publicacion con código "+this.name+"?", icon:"question", showCancelButton:true});
                        if (resp.isConfirmed) {
                            if (post_aceptadas.length == 0){
                                Swal.fire({
                                    title: "Finalización de proceso fallido",
                                    icon: "warning",
                                    text: 'No se puede cambiar el estado de la publicación si no tiene al menos una postulacion aceptada',
                                });
                            }else{
                                let respuesta = await cambiarEstadoPublic(publicacion);
                                console.log(respuesta);
                                if (respuesta == 'No Puedes cambiar de proceso si no hay postulaciones') {
                                    await Swal.fire({
                                        title: "Cambio de estado fallido",
                                        icon: "warning",
                                        text: 'No se puede finalizar el proceso de postulación',
                                    });
                                }else{
                                    await Swal.fire({
                                        title: "Proceso Finalizado",
                                        icon: "info",
                                        text: 'Proceso de postulación',
                                    });
                                }
                            }
                            
                        }
                        
                        
                    });
                    //Fin boton ver perfil user                                    
                    if (post_[j].aceptacion == null) {
                        
                        document.querySelector(`#aceptar_postulante_${pub.id}_${post_[j].id}`).addEventListener("click",async function(){
                            let id_postulacion = this.name;
                            let resp = await Swal.fire({title:"¿Seguro que desea aceptar la postulacion con código "+id_postulacion+"?", icon:"question", showCancelButton:true});
                            if(resp.isConfirmed){
                                let postulacion = {};
                                postulacion.id = id_postulacion;
                                postulacion.aceptacion = 1;
                                let respuesta = await responderPostulacion(postulacion);
                                if (respuesta !=false) {
                                    await Swal.fire({
                                        title: "Postulante Aceptado",
                                        icon: "success",
                                        text: "El el postulante a sido aceptado",
                                    });
                                    window.location.href = "/kosb/public/perfil";
                                } else {
                                    await Swal.fire({
                                        title: "Error al Eliminar",
                                        icon: "error",
                                        text: "Hubo un error al eliminar el reclamo",
                                    });
                                }
                            }
                        });
                        document.querySelector(`#rechazar_postulante_${pub.id}_${post_[j].id}`).addEventListener("click",async function(){
                            let id_postulacion = this.name;
                            let resp = await Swal.fire({title:"¿Seguro que desea rechazar la postulacion con código "+id_postulacion+"?", icon:"question", showCancelButton:true});
                            
                            if(resp.isConfirmed){
                                let postulacion = {};
                                postulacion.id = id_postulacion;
                                postulacion.aceptacion = 0;
                                let respuesta = await responderPostulacion(postulacion);
                                if (respuesta !=false) {
                                    await Swal.fire({
                                        title: "Postulante Aceptado",
                                        icon: "success",
                                        text: "El el postulante a sido aceptado",
                                    });
                                    window.location.href = "/kosb/public/perfil";
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
            a++;
        });
    }else{
        //contenedor-de-postulaciones-a-mis-postulaciones
        cargarSinPostulPorPub();
    }
    
    
    //tengo que hacer sacar las postulaciones por las publicaciones del usuario

    let femenino = document.querySelector("#femenino-rd");
    let masculino = document.querySelector("#masculino-rd");
    let otros = document.querySelector("#otros-rd");
    if (id.value == "F"){
        femenino.checked = true;
    }if (id.value == "M"){
        masculino.checked = true;
    }if (id.value == "O"){
        otros.checked = true;
    }
    let lista;
    if(publicaciones.length != 0){
        
        lista = reajusteDeContenidoPubs(publicaciones,zonas, rubros,duraciones);
        console.log(lista);
        cargarTabla(lista);
        
    }else{
        cargarDiv();
    }
    if(postulaciones.length != 0){
        cargarTablaPostulaciones(postulaciones);
    }else{
        cargarDivPostulacion();
    }
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
                        window.location.href = "/kosb/public/perfil";
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
    //Cargar Puntuaciones Por el usuario
    
    
});








