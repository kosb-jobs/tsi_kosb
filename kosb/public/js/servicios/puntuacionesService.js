
const crearPuntuacion = async(puntuacion)=>{
    let resp = await axios.post("api/puntuaciones/create", puntuacion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};


const getPuntuacionPorPublicacion = async(id_publicaciones)=>{
    let resp;
    resp = await axios.get(`api/puntuaciones/get/id_publicaciones?id_publicaciones=${id_publicaciones}`);
    return resp.data;
};



const getPuntuacionPorUsuario = async(cod_usuario)=>{
    let resp;
    resp = await axios.get(`api/puntuaciones/get/id_user?id_user=${cod_usuario}`);
    return resp.data;
};



