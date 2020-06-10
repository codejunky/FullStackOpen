import axios from 'axios'

const BASE_URL = "/api/persons"

const getAll = () => {
    return axios
        .get(BASE_URL)
        .then(({ data }) => data)
}

const addPerson = data => {
    return axios
        .post(BASE_URL, data)
        .then(({ data }) => data)
}

const updatePerson = (id, newData) => (
    axios
        .put(`${BASE_URL}/${id}`, newData)
        .then(({ data }) => data)
)

const deletePerson = id => axios.delete(`${BASE_URL}/${id}`)

export default {
    getAll,
    addPerson,
    deletePerson,
    updatePerson
}