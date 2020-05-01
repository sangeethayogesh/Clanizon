/* eslint-disable no-unused-vars */

console.log(process.env)
const BASE_URL = process.env.REACT_APP_BASE_URL

const constants = {
  URL: {
    GET_ADMIN_MESSAGES: BASE_URL + 'admin_messages'
  }
}

export default constants
