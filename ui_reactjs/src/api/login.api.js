import axios from 'axios';

export const loginApi = async (body) => {
    body = JSON.stringify(body);
    console.log("inside action", body);
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
        console.log(error.response);
        return Promise.reject(error);
    }

}
