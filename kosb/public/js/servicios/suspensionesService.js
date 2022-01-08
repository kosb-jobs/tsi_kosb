//Crear Suspension

const crearSuspension = async(suspension)=>{
    let resp = await axios.post("api/suspensiones/create", suspension, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};
