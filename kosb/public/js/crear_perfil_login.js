document.querySelector("#btn-ingresar-login").addEventListener("click",()=>{
    let usuario = document.querySelector("#user-txt").value;
    let pass = document.querySelector("#pass-txt").value;

    errores = [];
    if(usuario == ""){
        errores.push("Debes ingresar un nombre de usuario.");
    }
    
    if(pass ==""){
        errores.push("Debes ingresar una contraseña.");
    }
    console.log(errores);

    if(errores.length != 0){
        Swal.fire({
            title: "Error al ingresar",
            icon: "warning",
            html: errores.join("<br />")
        });
    }else{
        
        window.location.href="/kosb/public/perfil";
    }
});