import Axios from 'axios'
const rest = Axios.create()
rest.defaults.timeout = 5000

export default rest
