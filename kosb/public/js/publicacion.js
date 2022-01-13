tinymce.init({
  selector: '#descripcion-txt',
  height: 200,
  menubar: false,
  language: 'es',
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

//Funciones otras
const ver_pub = async function(){
  let id = this.idPub;
  let publicacion = await getPublicacionCodigo(id);
  let rubros = await getRubros();
  let zonas = await getZonas();
  let duraciones = await getDuraciones();
  // 
  // publicacion = cambio_de_variables(publicacion,zonas,rubros,duraciones);
  zonas.forEach(z => {
    if(publicacion.cod_zona == z.id){
      publicacion.cod_zona = z.nom_zona;
    }
  });
  rubros.forEach(r => {
    if(publicacion.cod_rubro == r.id){
      publicacion.cod_rubro = r.nom_rubro;
    }
  });
  duraciones.forEach(d => {
    if(publicacion.cod_duracion == d.id){
      publicacion.cod_duracion = d.titulo_duracion;
    }
  });
  let btn_rec_usuario = document.querySelector("#reclamo-btn");
  btn_rec_usuario.idPub = publicacion.id;
  btn_rec_usuario.idUser = publicacion.cod_usuario;
  let id_usuario = document.querySelector("#postular-btn");
  let div_footer = document.querySelector("#div-footer-postular");
  if (id_usuario.name == publicacion.cod_usuario) {
    div_footer.classList.add("d-none");
  }
  let dia1 = new Date(publicacion.fecha_ini);
  let dia2 = new Date(publicacion.fecha_fin);
  let difference = dia2.getTime()-dia1.getTime();
  let dias_totales = difference/(1000 * 3600 * 24);
  let texto_duracion;
  if (Math.trunc(dias_totales/31)==0){
    texto_duracion = "Durará menos de un mes el trabajo";
  }if (Math.trunc(dias_totales/31)==1){
    texto_duracion = "El trabajo durará al rededor de " + Math.trunc(dias_totales/31) + " mes.";
  }if (Math.trunc(dias_totales/31)>1){
    texto_duracion = "El trabajo durará al rededor de " + Math.trunc(dias_totales/31) + " meses.";
  }
  let contenedor_vista = document.querySelector("#contenedor-vista");
  contenedor_vista.classList.add("d-none");
  let contenedor_pub = document.querySelector("#container-publicacion");
  contenedor_pub.classList.remove('d-none');
  let titulo_txt = document.querySelector("#tit-pub");
  titulo_txt.innerText = publicacion.titulo_publicacion;
  let rubro_txt = document.querySelector("#tip-emp");
  rubro_txt.innerText = publicacion.cod_rubro;
  let descripcion_txt = document.querySelector("#desc-vista");
  descripcion_txt.innerHTML = publicacion.descripcion;
  let fecha_txt = document.querySelector("#fecha-change-txt");
  fecha_txt.innerText = "Desde "+publicacion.fecha_ini + " hasta "+publicacion.fecha_fin;
  let horario_txt = document.querySelector("#horario-txt");
  horario_txt.innerText = publicacion.cod_duracion;
  let direccion_txt = document.querySelector("#direccion-zona-txt");
  direccion_txt.innerText = publicacion.cod_zona;
  let duracion_txt = document.querySelector("#duracion-change-txt");
  duracion_txt.innerText = texto_duracion;
  let input_fixed = document.querySelector("#id_publicacion");
  input_fixed.name = publicacion.id;
  //boton ver ofertantnte
  let ver_ofertante = document.querySelector("#ver_ofertante");
  ver_ofertante.name=publicacion.cod_usuario;

}



const cargarContenedor = function(publicaciones){
  let contenedor_pub = document.querySelector("#contenedor-vista");
  contenedor_pub.innerHTML = "";
  publicaciones.forEach(p => {
    let card = document.createElement("div");
    card.classList.add("card","mb-3");
    let h5 = document.createElement("h5");
    h5.classList.add("card-header");
    h5.textContent = p.cod_rubro;
    let div_body = document.createElement("div");
    div_body.classList.add("card-body");
    let h5_body = document.createElement("h5");
    h5_body.classList.add("card-title");
    h5_body.textContent = p.titulo_publicacion;
    let p_ = document.createElement("p");
    p_.classList.add("card-text");
    p_.innerText = p.cod_zona;
    let boton_ver_pub = document.createElement("button");
    boton_ver_pub.classList.add("btn");
    boton_ver_pub.innerText = "Ver publicación";
    boton_ver_pub.idPub = p.id;
    boton_ver_pub.addEventListener("click",ver_pub);
    
    div_body.appendChild(h5_body);
    div_body.appendChild(p_);
    div_body.appendChild(boton_ver_pub);
    card.appendChild(h5);
    card.appendChild(div_body);

    contenedor_pub.appendChild(card);
    //contenedor_pub.appendChild(new_div);
  });
}


const cambio_de_variables = (publicaciones,zonas,rubros,duraciones)=>{
  publicaciones.forEach(p => {
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

// ID BTN Y ELEMENTOS

document.querySelector("#ver_ofertante").addEventListener("click", async()=>{
  let id_usuario = document.querySelector("#postular-btn").name;
  let id_publicacion = document.querySelector("#id_publicacion").name; 
  let user_ofertante = document.querySelector("#ver_ofertante").name;
  console.log(user_ofertante);
  let datos = await getDatosCompletosPorUser(user_ofertante);
  let aceptacion = null;
  let fecha_postulacion = cargarFechaActual();
  await Swal.fire({
    title: `Informacion del Ofertante`,
    html: ` 
    <table>
        <tr>
            <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="person-circle-outline"></ion-icon></b></a></td>
        </tr>
        <tr>
            <td><a><b>Nombre:</b>${datos.name} ${datos.apellido}</a></td>
        </tr>
        
        <tr>
            <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="mail-outline"></ion-icon></b></a></td>
        </tr>
        <tr>
            <td><a><b>Email:</b> ${datos.email} </a></td>
        </tr>

        <tr>
            <td><a style="font-size: 1.5em; padding-right: 2px ;"><ion-icon name="star-half-outline"></ion-icon></b></a></td>
        </tr>
        <tr>
            <td><a><b>Puntuación Total Ofertante:</b> ${datos.puntuacion_ofertante}</a></td>
        </tr>

        <tr>
            <td><a style="font-size: 1.5em; padding-right: 2px ;"><b><ion-icon name="barbell-outline"></ion-icon></b></a></td>
        </tr>
        <tr>
            <td><a><b>Publicaciones Totales:</b> ${datos.ofertas_total_publ} </a></td>
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
  
});

document.querySelector("#postular-btn").addEventListener("click", async()=>{
  let id_usuario = document.querySelector("#postular-btn").name;
  if (!(id_usuario == "no-logueado")){
    let id_publicacion = document.querySelector("#id_publicacion").name;
    let aceptacion = null;
    let fecha_postulacion = cargarFechaActual();
    let respuesta_crear = await Swal.fire({title:"¿Seguro que desea postular?", icon:"info", showCancelButton:true});
    if (respuesta_crear.isConfirmed) {
      postulacion = {};
      postulacion.cod_usuario = id_usuario;
      postulacion.aceptacion = aceptacion;
      postulacion.cod_publicacion = id_publicacion;
      postulacion.fecha_postulacion = fecha_postulacion;
      let respuesta = await crearPostulacion(postulacion);
      if (respuesta == "El usuario es creador de la publicación") {
        Swal.fire({title:"Error",text: "El usuario es dueño de la publicación", icon:"error"});
      }else if (respuesta != false) {
        await Swal.fire({title:"Postulación correctamente realizada", icon:"success"});
        window.location.href = "/kosb/public/buscar_trabajo";
      }else{
        Swal.fire({title:"No se ha realizado la solicitud",text:"Ya existía una postulación a esta publicación de parte de este usuario", icon:"error"});
      }
    }
  }else{
    let resp = await Swal.fire({title:"¡Espere!", text:"Antes de postular a una publicación debe iniciar sesión o registrarse", icon:"warning", showCancelButton:true});
    if (resp.isConfirmed){
      window.location.href = "/kosb/public/crear_perfil";
    }
  }
});

document.querySelector('#reclamo-btn').addEventListener('click', async ()=>{
  let btn_rec_usuario = document.querySelector("#reclamo-btn");
  let form_reclamo = document.querySelector("#form-reclamos");
  let container_pub = document.querySelector("#container-publicacion");
  if (btn_rec_usuario.name == "no-logueado") {
    let resp = await Swal.fire({title:"¡Espere!", text:"Antes de postular a una publicación debe iniciar sesión o registrarse", icon:"warning", showCancelButton:true});
    if (resp.isConfirmed) {
      window.location.href = "/kosb/public/crear_perfil";
    }
  }else{
    container_pub.classList.add('d-none');
    form_reclamo.classList.remove('d-none');
  }
});

document.querySelector('#select-tipo-reclamo').addEventListener("change",()=>{
 let constante;
 let btn_rec_usuario = document.querySelector("#reclamo-btn");
 let select_tipo_R = document.querySelector("#select-tipo-reclamo");
 let descripcion_text = tinymce.get("descripcion-txt");
 
 if (select_tipo_R.value == "P") {
  constante = "Me gustaría reclamar por la publicación con código "+ btn_rec_usuario.idPub +" y con código de usuario "+ btn_rec_usuario.idUser + ", ya que...";
  descripcion_text.setContent(constante);
 }else if(select_tipo_R.value == "U"){
  constante = "Me gustaría reclamar por el usuario con código "+ btn_rec_usuario.idUser + ", ya que...";
  descripcion_text.setContent(constante);
 }else{
  descripcion_text.setContent('');
 }

});

cargarContenedorSinPub = ()=>{
  let contenedor_pub = document.querySelector("#contenedor-vista");
  contenedor_pub.innerHTML = '';
  let card = document.createElement("div");
    card.classList.add("card","mb-3");
    let h5 = document.createElement("h5");
    h5.classList.add("card-header");
    h5.textContent = 'Mensaje';
    let div_body = document.createElement("div");
    div_body.classList.add("card-body");
    let h5_body = document.createElement("h5");
    h5_body.classList.add("card-title");
    h5_body.textContent = 'No hay publicaciones';
    let p_ = document.createElement("p");
    p_.classList.add("card-text");
    p_.innerText = 'Para este filtro';
    
    div_body.appendChild(h5_body);
    div_body.appendChild(p_);
    card.appendChild(h5);
    card.appendChild(div_body);

    contenedor_pub.appendChild(card);

}
document.querySelector('#search-btn').addEventListener('click', async()=>{
  let texto_busq = document.querySelector('#search-txt').value.trim();
  let publicaciones = await getPublicacionSearch(texto_busq);
  let contenido_pub = document.querySelector('#container-publicacion');
  let contenedor_vista = document.querySelector('#contenedor-vista');
  if(!contenido_pub.classList.contains('d-none')){
    contenido_pub.classList.add('d-none');
    contenedor_vista.classList.remove('d-none');
  }
  
  if (publicaciones.length == 0) {
    cargarContenedorSinPub();
  } else {
    let zonas = await getZonas();
    let rubros = await getRubros();
    let duraciones = await getDuraciones();
    publicaciones = cambio_de_variables(publicaciones,zonas,rubros,duraciones);
    cargarContenedor(publicaciones);
  }
  console.log();
});


document.querySelector("#ingresar-reclamo-btn").addEventListener('click', async()=>{
  let tit_reclamo = document.querySelector("#titulo-reclamo").value;
  let asunto_reclamo = document.querySelector("#select-tipo-reclamo").value;
  let descripcion_text = tinymce.get("descripcion-txt").getContent();
  let id_usuario = document.querySelector("#postular-btn").name;
  
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
        Swal.fire({
          title: "Reclamo creado",
          icon: "success",
          text: "El reclamo " + tit_reclamo + " ha sido creada con éxito",
        });
      } else {
        Swal.fire({
          title: "Error al Crear",
          icon: "error",
          text: "Hubo un error al crear el reclamo",
        });
      }
      await Swal.fire({
        title: "Bien ingresado",
        icon: "success",
        html:errores.join("<br />")
      });
      location.reload();
    }else{
        Swal.fire("Cancelado","Cancelación de petición", "info");
    }
    
  }
});

document.querySelector('#t-esporadicos').addEventListener('click', async ()=>{
  let resp = await getPublicacionesTipo('E');
  let zonas = await getZonas();
  let rubros = await getRubros();
  let duraciones = await getDuraciones();
  publicaciones = cambio_de_variables(resp,zonas,rubros,duraciones);
  if (publicaciones.length == 0) {
    cargarContenedorSinPub();
  } else {
    cargarContenedor(publicaciones);
  }
});

document.querySelector('#t-corto-plazo').addEventListener('click',async()=>{
  let resp = await getPublicacionesTipo('C');
  let zonas = await getZonas();
  let rubros = await getRubros();
  let duraciones = await getDuraciones();
  publicaciones = cambio_de_variables(resp,zonas,rubros,duraciones);
  if (publicaciones.length == 0) {
    cargarContenedorSinPub();
  } else {
    cargarContenedor(publicaciones);
  }
});

document.querySelector('#t-largo-plazo').addEventListener('click',async()=>{
  let resp = await getPublicacionesTipo('L');
  let zonas = await getZonas();
  let rubros = await getRubros();
  let duraciones = await getDuraciones();
  publicaciones = cambio_de_variables(resp,zonas,rubros,duraciones);
  if (publicaciones.length == 0) {
    cargarContenedorSinPub();
  } else {
    cargarContenedor(publicaciones);
  }
});

//DOMContentLoaded
document.addEventListener("DOMContentLoaded",async()=>{
  let publicaciones = await getPublicaciones();
  let zonas = await getZonas();
  let rubros = await getRubros();
  let duraciones = await getDuraciones();
  publicaciones = cambio_de_variables(publicaciones,zonas,rubros,duraciones);
  if (publicaciones.length == 0) {
    cargarContenedorSinPub();
  } else {
    cargarContenedor(publicaciones);
  }
});


