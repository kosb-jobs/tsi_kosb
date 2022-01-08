const getReclamos = async()=>{
    let resp;
    resp = await axios.get("api/reclamos/get");
    return resp.data;
};

const getReclamosUsuario = async (filtro)=>{
    let resp;
    resp = await axios.get(`api/reclamos/get/user?filtro=${filtro}`);
    return resp.data;
};

const getReclamosCodigo = async (id)=>{
    let resp;

    resp = await axios.get(`api/reclamos/get/id?id=${id}`);
    return resp.data;
};
const getReclamosSinResp = async ()=>{
    let resp;

    resp = await axios.get("api/reclamos/get/sinRespuesta");
    return resp.data;
};

const eliminarReclamo = async(id)=>{
    try{
        let resp = await axios.post("api/reclamos/delete",{id},{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
};

const reclamoActualizar = async(reclamo)=>{
    try{
        let resp = await axios.post("api/reclamos/update",reclamo,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}

const crearReclamo = async(reclamo)=>{
    try {
        let resp = await axios.post("api/reclamos/create", reclamo, {
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
        
    } catch (e) {
        return false;
    }
    
};

