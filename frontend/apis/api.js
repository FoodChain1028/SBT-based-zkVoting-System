import axios from "axios"
const API_URL = "http://localhost:8080/api/"

const generateCallData = async (secret, publicNum) => {
    return axios.get(API_URL + "generate-call-data?secret=" + secret + "&publicNum=" + publicNum).then((res) => {
        return res.data
    })
}

export default { generateCallData }