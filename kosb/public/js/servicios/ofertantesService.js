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


const getPuntuacionOfertante = async (cod_usuario)=>{
    let resp;

    resp = await axios.get(`api/ofertante/get/cod_usuario?cod_usuario=${cod_usuario}`);
    return resp.data;
};


const actualizarPuntuacionOfertante= async(puntuaciones)=>{
    try{
        let resp = await axios.post("api/ofertante/actualizar/puntuacion",puntuaciones,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}