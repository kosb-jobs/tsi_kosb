const getTrabajadorPorUsuario = async (id)=>{
    let resp;

    resp = await axios.get(`api/trabajador/get/user?id=${id}`);
    return resp.data;
};

const actualizarPostTotales = async(id)=>{
    let resp = await axios.post("api/trabajador/agregarpost", {id}, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};


const actualizarPuntuacionTrabajador= async(puntuaciones)=>{
    try{
        let resp = await axios.post("api/trabajador/actualizar/puntuacion",puntuaciones,{
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    }catch(e){
        return false;
    }
}



const getPuntuacionTrabajador = async (cod_usuario)=>{
    let resp;

    resp = await axios.get(`api/trabajador/get/cod_usuario?cod_usuario=${cod_usuario}`);
    return resp.data;
};