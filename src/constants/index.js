/* eslint-disable no-unused-vars */
const BASE_URL = 'localhost:8080/api/'
const NAME_SPACE = 'api/'
const today = new Date().toISOString().split('T')[0]
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: NAME_SPACE + 'admin_messages',
    GET_TODAY_LEADS:
      'http://realkeyip.in:8083/api/leads/leadbyagentanddate?mobile=8122723731&date=' +
      today,
    GET_ALL_AGENTS: 'http://realkeyip.in:8083//api/user/userbyrole?roleId=2',
    ADD_NEW_AGENT: 'http://realkeyip.in:8083//api/user/createuser',
    ADD_NEW_LEAD: 'http://realkeyip.in:8083/api/leads/createlead',
    GET_LEAD_STATUS_COUNT:
      'http://realkeyip.in:8083/api/leads/leadbystatus?mobile=8122723731',
    ADD_NEW_AUDIT: 'http://realkeyip.in:8083/api/leads/leadaudit'
  },
  DATA: {
    admin_messages: [
      { message: 'hello new plot added on madurai', createdAt: new Date() },
      { message: 'hello new plot added on chennai', createdAt: new Date() }
    ]
  },
  currentAgent: {
    mobile: '8122723731'
  },
  auditStatus: [
    {
      auditStatusId: 1,
      auditStatus: 'ScheduledCall'
    },
    {
      auditStatusId: 2,
      auditStatus: 'Created'
    },
    {
      auditStatusId: 3,
      auditStatus: 'DealClose'
    },
    {
      auditStatusId: 4,
      auditStatus: 'SiteVisited'
    }
  ]
}

export default constants
