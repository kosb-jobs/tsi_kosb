
const crearPuntuacion = async(puntuacion)=>{
    let resp = await axios.post("api/puntuaciones/create", puntuacion, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return resp.data;
};
