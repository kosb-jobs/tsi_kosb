const getZonas = async()=>{
    let resp;
    resp = await axios.get("api/zonas/get");
    return resp.data;
};


const getZonaPorId = async(id)=>{
    let resp;
    resp = await axios.get(`api/zonas/get/id?id=${id}`);
    return resp.data;
};

const getZonaPorNombre = async(nom_zona)=>{
    let resp;
    resp = await axios.get(`api/zonas/get/nom_zona?nom_zona=${nom_zona}`);
    return resp.data;
};

//EliminarZona

const eliminarZona = async(id)=>{
    try{
        let resp = await axios.post("api/zonas/delete",{id},{
            header: {
                'Content-Type':'aplication/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

//Actualizar Zona

const zonaActualizar = async(zona)=>{
    try{
        let resp = await axios.post("api/zonas/update",zona,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

//Crear Zona

const crearZona = async(zona)=>{
    let resp = await axios.post("api/zonas/create", zona, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};
