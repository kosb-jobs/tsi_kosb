const getPublicaciones = async()=>{
    let resp;
    resp = await axios.get("api/publicaciones/get");
    return resp.data;
};

const getPublicacionesUsuario = async (filtro)=>{
    let resp;
    resp = await axios.get(`api/publicaciones/get/user?filtro=${filtro}`);
    return resp.data;
};

const getPublicacionesTipo = async (filtro)=>{
    let resp;
    resp = await axios.get(`api/publicaciones/get/tipo?tipo=${filtro}`);
    return resp.data;
};

const getPublicacionCodigo = async (filtro)=>{
    let resp;

    resp = await axios.get(`api/publicaciones/get/id?filtro=${filtro}`);
    return resp.data;
};

const getPublicacionSearch = async (filtro)=>{
    let resp;
    resp = await axios.get(`api/publicaciones/get/text?filtro=${filtro}`);
    return resp.data;
};

const eliminarPublicacion = async(id)=>{
    try{
        let resp = await axios.post("api/publicaciones/delete",{id},{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

const publicacionActualizar = async(publicacion)=>{
    try{
        let resp = await axios.post("api/publicaciones/update",publicacion,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const cambiarEstadoPublic = async(publicacion)=>{
    try{
        let resp = await axios.post("api/publicaciones/estado",publicacion,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const crearPublicacion = async(publicacion)=>{
    let resp = await axios.post("api/publicaciones/create", publicacion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};

