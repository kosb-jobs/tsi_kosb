const getOfertantePorUsuario = async (id)=>{
    let resp;

    resp = await axios.get(`api/ofertante/get/user?id=${id}`);
    return resp.data;
};

const actualizarPubTotales = async(ofertante)=>{
    let resp = await axios.post("api/ofertante/agregarpub", ofertante, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};