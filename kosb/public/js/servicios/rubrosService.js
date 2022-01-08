const getRubros = async()=>{
    let resp;
    resp = await axios.get("api/rubros/get");
    return resp.data;
};

const getRubroPorId = async(id)=>{
    let resp;
    resp = await axios.get(`api/rubros/get/id?id=${id}`);
    return resp.data;
};

const getRubroPorNombre = async(nom_rubro)=>{
    let resp;
    resp = await axios.get(`api/rubros/get/nom_rubro?nom_rubro=${nom_rubro}`);
    return resp.data;
};

const eliminarRubro = async(id)=>{
    try{
        let resp = await axios.post("api/rubros/delete",{id},{
            header: {
                'Content-Type':'aplication/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

const rubroActualizar = async(rubro)=>{
    try{
        let resp = await axios.post("api/rubros/update",rubro,{
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

const crearRubro = async(Rubro)=>{
    let resp = await axios.post("api/rubros/create", rubro, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};