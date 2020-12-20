import axios from "axios";

const apiUrl = "http://localhost:8080/api";

export async function getMakes() {
    const res = await axios.get(`${apiUrl}/makes`);
    return res;
}

export async function getModels(make) {
    const res = await axios.get(`${apiUrl}/models?make=${make}`);
    return res;
}

export async function getVehicles(model, make) {
    const res = await axios.get(
        `${apiUrl}/vehicles?make=${model}&model=${make}`
    );
    return res.data;
}
