import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(`${BASE_URL}`)
    .then(res => res.data)
}

const create = (person) => {
  return axios
    .post(`${BASE_URL}`, person)
    .then(res => res.data)
}

const update = (person) => {
  return axios
    .put(`${BASE_URL}/${person.id}`, person)
    .then(res => res.data)
}

const deletePerson = (personId) => {
  return axios
    .delete(`${BASE_URL}/${personId}`)
    .then(res => res.data)
}

export default { getAll, create, update, deletePerson }