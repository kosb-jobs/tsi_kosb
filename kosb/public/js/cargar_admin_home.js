document.addEventListener("DOMContentLoaded", async()=>{
    let publicaciones = await getPublicaciones();
    let reclamos = await getReclamosSinResp();
    let usuarios = await getUsuarios();
    let cant_users = document.querySelector("#cant-usuarios");
    let cant_public = document.querySelector("#cant-public");
    let div_reclamos = document.querySelector("#reclamos-sin-R");
    cant_public.textContent = publicaciones.length;
    cant_users.textContent = usuarios.length;
    div_reclamos.textContent = reclamos.length;

});