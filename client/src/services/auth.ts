import axios from 'axios'
const baseUrl = 'http://localhost:3001/auth/google/'


const authenticate = () => {
  const request = axios({
    
  })
  return request.then(response => response.data)
}

export default { authenticate }
