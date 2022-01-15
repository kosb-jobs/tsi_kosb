
const cargarBreadCrum = function(){
let selector = document.querySelector("#bc_id_active");
let active_a = document.querySelector("#id_active_a");
var URLactual = window.location.pathname;
let nueva_url = URLactual.slice(13);

 

console.log('Soy el log');
console.log(nueva_url);
selector.textContent= nueva_url;

if (nueva_url=="crear_perfil"){
    selector.textContent= "Bienvenido";

}

if (nueva_url=="crear_publicacion"){
    selector.textContent= "Crear Publicacion";

}

if (nueva_url=="perfil"){

    let selector_dos = document.querySelector("#bc_perfil");
    selector_dos.textContent = "Panel De Administracion";
    selector_dos.setAttribute('aria-current', "step");
    
    
     


    document.getElementById('panel_id').addEventListener("click", function() {      
        

        selector_dos.textContent = "Panel De Administracion";
    
    
    
    });
    
    document.getElementById('publicaciones_id').addEventListener("click", function() {
        selector_dos.textContent = "Mis Publicaciones";    
    
    
    });

    document.getElementById('puntuacion_id').addEventListener("click", function() {
        selector_dos.textContent = "Mi Puntuacion";   
    
    
    });

    
    document.getElementById('mis_postulaciones_id').addEventListener("click", function() {
        selector_dos.textContent = "Postulaciones A Mis Publicaciones";      
    
    });

    document.getElementById('postulaciones_id').addEventListener("click", function() {
        selector_dos.textContent = "Mis Postulaciones";      
    
    });

    document.getElementById('detalles_id').addEventListener("click", function() {
        selector_dos.textContent = "Detalles De Mi Cuenta";      
    
    });

    document.getElementById('reclamos_id').addEventListener("click", function() {
        selector_dos.textContent = "Mis Reclamos";      
    
    });



    


}

}




document.addEventListener("DOMContentLoaded",()=>{
    cargarBreadCrum();   
    
});
