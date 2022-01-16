const crearPostulacion = async(postulacion)=>{
    let resp = await axios.post("api/postulaciones/create", postulacion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    if (resp.data == true) {
        return false;
    }
    return resp.data;
};
const responderPostulacion = async(postulacion)=>{
    let resp = await axios.post("api/postulaciones/responder", postulacion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    if (resp.data == true) {
        return false;
    }
    return resp.data;
};


const eliminarPostulacion = async(id)=>{
    try{
        let resp = await axios.post("api/postulaciones/delete",{id},{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

const getPostulacionesUser = async (cod_usuario)=>{
    let resp;

    resp = await axios.get(`api/postulaciones/get/user?cod_usuario=${cod_usuario}`);
    return resp.data;
};

const getPostulacionInfoCompleta = async (cod_postulacion)=>{
    let resp;

    resp = await axios.get(`api/postulaciones/get/user/completa?id=${cod_postulacion}`);
    return resp.data;
};

const getPostulacionesAceptUser = async (cod_usuario)=>{
    let resp;

    resp = await axios.get(`api/postulaciones/get/user/aceptadas?cod_usuario=${cod_usuario}`);
    return resp.data;
};

const getPostulPorPublicacion = async (cod_publicacion)=>{
    let resp;

    resp = await axios.get(`api/postulaciones/get/pub?cod_publicacion=${cod_publicacion}`);
    return resp.data;
};

const getPostulAceptadasPorPublicacion = async (cod_publicacion)=>{
    let resp;

    resp = await axios.get(`api/postulaciones/get/aceptadas?cod_publicacion=${cod_publicacion}`);
    return resp.data;
};