import axios from "axios";

export const getReps = async () => {
    const response = await axios.get('https://api.propublica.org/congress/v1/117/house/members', { headers: { 'X-API-Key': process.env.REACT_APP_API_KEY } });
    return response.data.results[0].members;
}

export const getSenators = async () => {
    const response = await axios.get('https://api.propublica.org/congress/v1/117/senate/members', { headers: { 'X-API-Key': process.env.REACT_APP_API_KEY } });
    return response.data.results[0].members;
}
