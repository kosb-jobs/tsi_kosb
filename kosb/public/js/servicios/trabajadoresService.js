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
