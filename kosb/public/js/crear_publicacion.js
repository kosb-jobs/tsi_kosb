
tinymce.init({
  selector: '#descripcion-txt',
  height: 200,
  menubar: false,
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

const cargarSelectZonas = (zonas,id_zona)=>{
  let select = document.querySelector(id_zona);
  for(let i=0;i<zonas.length;i++){
        let option = document.createElement("option");
        option.value = zonas[i].id;
        option.innerText = zonas[i].nom_zona;
        select.appendChild(option);
    }
}
const cargarSelectRubros = (rubros,id)=>{
  let select = document.querySelector(id);
  for(let i=0;i<rubros.length;i++){
        let option = document.createElement("option");
        option.value = rubros[i].id;
        option.innerText = rubros[i].nom_rubro;
        select.appendChild(option);
    }
}
const cargarSelectDurac = (durac,id)=>{
  let select = document.querySelector(id);
  for(let i=0;i<durac.length;i++){
        let option = document.createElement("option");
        option.value = durac[i].id;
        option.innerText = durac[i].titulo_duracion;
        select.appendChild(option);
    }
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



document.querySelector("#btn-vista-previa").addEventListener("click", async()=>{
  // En esta funcion al hacer click en el boton de vista previa se cargan las cosas en 
  let botonGuardar = document.querySelector("#guardar-btn");
    
  let titulo_publicacion = document.querySelector('#nom-publicacion').value;
  let rubro = document.querySelector('#select-tipo-trabajo');
  let duracion = document.querySelector('#duracion-select');
  let zona = document.querySelector('#zona-select');
  let fecha_ini = document.querySelector('#fecha-trabajo').value;
  let fecha_fin = document.querySelector('#fecha-fin-trabajo').value;
  let fecha_publicada = cargarFechaActual();
  let descripcion = tinymce.get("descripcion-txt").getContent();
  let cod_usuario = botonGuardar.name;
  let dia1 = new Date(fecha_ini);
  let dia2 = new Date(fecha_fin);
  let difference = dia2.getTime()-dia1.getTime();
  let dias_totales = difference/(1000 * 3600 * 24);
  //console.log(dias_totales);

  errores = [];
  if (fecha_ini <= fecha_publicada){
    errores.push("Fecha de inicio mal ingresada, debe ser un dia en el futuro");
  }
  if(dias_totales<0){
    errores.push("La fecha de fin no puede ser anterior a la fecha en que comienze el trabajo");
  }
  if(titulo_publicacion == ""){
    errores.push("Fiene que ingresar un título, ingrese nuevamente");
  }

  if(rubro.value == 0){
    errores.push("Tiene que seleccionar un rubro");
  }
  if(duracion.value == 0){
    errores.push("Tiene que seleccionar una duración");
  }
  if(zona.value == 0){
    errores.push("Tiene que seleccionar una zona");
  }

  if(fecha_ini == ""){
    errores.push("Ingrese una fecha de inicio");
  }
  if(fecha_fin == 0){
    errores.push("Ingrese una fecha estimada de fin de trabajo");
  }

  if(descripcion == 0){
    errores.push("Tiene que ingresar una descripción");
  }

  if(errores.length != 0){
    Swal.fire({
      title: "Errores de validación",
      icon: "error",
      html:errores.join("<br />")
    });
  }else{
    Swal.fire({
      title: "Ingreso correcto",
      icon: "success",
      text: "Vea la vista previa de su trabajo por publicar"
    });


    let desc_formulario = document.querySelector('#desc-vista');
    let titul_pub = document.querySelector("#tit-pub");
    let fecha_div = document.querySelector("#fecha-change-txt");
    let direccion_zona = document.querySelector("#direccion-zona-txt");
    let duracion_txt = document.querySelector("#duracion-change-txt");
    let horario_txt = document.querySelector("#horario-txt");
    let tipo_trabajo = document.querySelector("#tip-emp");
    let texto_duracion;
    desc_formulario.innerHTML = descripcion;
    titul_pub.innerHTML = titulo_publicacion;
    tipo_trabajo.innerHTML = rubro.options[rubro.selectedIndex].text;
    fecha_div.innerHTML = "Desde " + fecha_ini + " hasta " + fecha_fin;
    horario_txt.innerHTML = duracion.options[duracion.selectedIndex].text;
    if (Math.trunc(dias_totales/31)==0){
      texto_duracion = "Durará menos de un mes el trabajo";
    }if (Math.trunc(dias_totales/31)==1){
      texto_duracion = "El trabajo durará al rededor de " + Math.trunc(dias_totales/31) + " mes.";
    }if (Math.trunc(dias_totales/31)>1){
      texto_duracion = "El trabajo durará al rededor de " + Math.trunc(dias_totales/31) + " meses.";
    }
    duracion_txt.innerHTML = texto_duracion;
    direccion_zona.innerHTML = zona.options[zona.selectedIndex].text;
    botonGuardar.disabled = false;

    document.querySelector("#guardar-btn").addEventListener("click",async()=>{
      publicacion = {};
      publicacion.titulo_publicacion = titulo_publicacion;
      publicacion.cod_rubro = rubro.value;
      publicacion.cod_zona = zona.value;
      publicacion.cod_duracion = duracion.value;
      publicacion.fecha_ini = fecha_ini;
      publicacion.fecha_fin = fecha_fin;
      publicacion.fecha_publicada = fecha_publicada;
      publicacion.descripcion = descripcion;
      let t_oferta;
      if (dias_totales <= 7){
        t_oferta = "E";
      }else if (dias_totales >= 122){
        t_oferta = "L";
      }else if (dias_totales <= 31){
        t_oferta = "C";
      }
      publicacion.tipo_oferta = t_oferta;
      
      publicacion.cod_usuario = cod_usuario;
      
      let ofert = await getOfertantePorUsuario();
      let ofertante = {};
      ofertante.id = cod_usuario;
      // ofertante.post_totales = ofert.ofertas_total_publ + 1;
      // ofertante.post_activos = ofert.publicaciones_activas + 1;
      let resp = await crearPublicacion(publicacion);
      await actualizarPubTotales(ofertante);//ESTO ESTÁ MALO
      
      await Swal.fire({
        title: "Creación de publicación correcta",
        icon: "success",
        text: "Trabajo creado exitosamente."
      });
      botonGuardar.disabled = true;

      window.location.href = "/kosb/public/crear_publicacion";
    });
  }
});


document.addEventListener("DOMContentLoaded",async()=>{

  today = cargarFechaActual();

  let fecha = document.querySelector("#fecha-trabajo");
  fecha.value = today;
  let zonas = await getZonas();
  let rubros = await getRubros();
  let duraciones = await getDuraciones();
  cargarSelectZonas(zonas,"#zona-select");
  cargarSelectRubros(rubros,"#select-tipo-trabajo");
  cargarSelectDurac(duraciones,"#duracion-select");
});

