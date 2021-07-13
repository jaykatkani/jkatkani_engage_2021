import axios from 'axios';

// it takes url and payload if any and responses the data

/////////////////////////// POST_REQUEST /////////////////////
export const postRequest = async (url, payload = {}) => {
    const data = await axios.post(url, payload)
        .then(resp => resp.data)
        .catch(err => (
            { error: err.response.data }
        ));
    return data;
}
/////////////////////////////////////////////////////////////

/////////////////////////// PUT_REQUEST /////////////////////
export const putRequest = async (url, payload = {}) => {
    const data = await axios.put(url, payload)
        .then(resp => resp.data)
        .catch(err => (
            { error: err.response.data }
        ));
    return data;
}
/////////////////////////////////////////////////////////////

/////////////////////////// GET_REQUEST /////////////////////
export const getRequest = async (url) => {
    const data = await axios.get(url)
        .then(resp => resp.data)
        .catch(err => (
            { error: err.response.data }
        ));
    return data;
}
/////////////////////////////////////////////////////////////

/////////////////////////// DELETE_REQUEST /////////////////////
export const deleteRequest = async (url) => {
    const data = await axios.delete(url)
        .then(resp => resp.data)
        .catch(err => (
            { error: err.response.data }
        ));
    return data;
}
/////////////////////////////////////////////////////////////