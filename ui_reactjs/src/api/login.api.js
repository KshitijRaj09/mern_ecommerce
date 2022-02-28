import axios from 'axios';

export const loginApi = async (body) => {
    body = JSON.stringify(body);
    const config = {
        headers: {
            'Content-type': "application/json"
        }
    }
    try {
        const { data } = await axios.post("/api/login", body, config);
        return data;
    }
    catch (error) {

        return Promise.reject(error);
    }

}
