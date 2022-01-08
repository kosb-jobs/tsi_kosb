const getDuraciones = async()=>{
    let resp;
    resp = await axios.get("api/duraciones/get");
    return resp.data;
};

const getDuracionPorId = async(id)=>{
    let resp;
    resp = await axios.get(`api/duraciones/get/id?id=${id}`);
    return resp.data;
};

const getDuracionPorNombre = async(titulo_duracion)=>{
    let resp;
    resp = await axios.get(`api/duraciones/get/titulo_duracion?titulo_duracion=${titulo_duracion}`);
    return resp.data;
};


//EliminarZona

const eliminarDuracion = async(id)=>{
    try{
        let resp = await axios.post("api/duraciones/delete",{id},{
            header: {
                'Content-Type':'aplication/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

const duracionActualizar = async(duracion)=>{
    try{
        let resp = await axios.post("api/duraciones/update",duracion,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const crearDuracion = async(duracion)=>{
    let resp = await axios.post("api/duraciones/create", duracion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};