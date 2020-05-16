/* eslint-disable no-unused-vars */
const BASE_URL = 'localhost:8080/api/'
const NAME_SPACE = 'api/'
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: NAME_SPACE + 'admin_messages',
    GET_TODAY_LEADS: NAME_SPACE + 'today_leads'
  },
  DATA: {
    admin_messages: [{ message: 'hello new plot added on madurai', createdAt: new Date() }, { message: 'hello new plot added on chennai', createdAt: new Date() }],
    today_leads: getTodayLeads()
  }
}
function getTodayLeads () {

}

export default constants
