const getUsuarios = async()=>{
    let resp;
    resp = await axios.get("api/users/get");
    return resp.data;
};

const getUsuarioPorId = async (id)=>{
    let resp;

    resp = await axios.get(`api/users/get/id?id=${id}`);
    return resp.data;
};

const getDatosCompletosPorUser = async (id)=>{
    let resp;

    resp = await axios.get(`api/users/get/datos/completos?id=${id}`);
    return resp.data;
};

const usuarioActualizar = async(usuario)=>{
    try{
        let resp = await axios.post("api/users/update",usuario,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const suspenderUsuario = async(usuario)=>{
    try{
        let resp = await axios.post("api/users/desactivar",usuario,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const activarUsuario = async(usuario)=>{
    try{
        let resp = await axios.post("api/users/activar",usuario,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const eliminarUsuario = async(id)=>{
    let resp;
    resp = await axios.post("api/users/delete",{id},{
        headers: {
            'Content-Type':'application/json'
        }
    });
    if (resp.data == 'Es administrador') {
        return false;
    } else {
        return resp.data;
    }
    
};

