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