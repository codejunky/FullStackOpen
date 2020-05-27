import axios from 'axios'

const BASE_URL = "http://localhost:3001"

const getAll = () => {
    return axios
        .get(`${BASE_URL}/persons`)
        .then(({data}) => data)
}

const addPerson = data => {
    return axios
        .post(`${BASE_URL}/persons`, data)
        .then(({ data }) => data)
}

const deletePerson = id => axios.delete(`${BASE_URL}/persons/${id}`)

export default {
    getAll,
    addPerson,
    deletePerson
}