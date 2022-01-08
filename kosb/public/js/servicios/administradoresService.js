const getAdminPorUsuario = async (id)=>{
    let resp;

    resp = await axios.get(`api/admin/get/user?id=${id}`);
    return resp.data;
};


const getAdministradores = async()=>{
    let resp;
    resp = await axios.get("api/admin/get");
    return resp.data;
};



const eliminarAdministrador = async(id)=>{
    let resp;
    resp = await axios.post("api/admin/delete",{id},{
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};

const crearAdmin = async(admin)=>{
    try {
        let resp = await axios.post("api/admin/crear", admin, {
            headers: {
                'Content-Type':'application/json'
            }
        });
        return resp.data;
    } catch (error) {
        return false;
    }
    
};
