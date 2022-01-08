const nuevo_metodo = (publicaciones)=>{
    let a = 0;
    publicaciones.forEach( async pub => {
        let post_ = await getPostulPorPublicacion(pub.id);
        console.log(pub);
        if (post_.length !=0) {
            for(let j=0;j<post_.length;j++){
                if (post_[j].aceptacion == null) {
                    document.querySelector(`#aceptar_postulante_${a}_${j}`).addEventListener("click",async function(){
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
                    document.querySelector(`#rechazar_postulante_${a}_${j}`).addEventListener("click",async function(){
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


    
}