import axios from 'axios'
import { API_ROOT } from '../pages/utils/constants.js'

export const fetchProductAPI = async (productId) => {
    const response = await axios.get(`${API_ROOT}/products/${productId}`)
    return response.data
}
 