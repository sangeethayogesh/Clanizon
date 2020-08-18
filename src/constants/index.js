/* eslint-disable no-unused-vars */
const BASE_URL = 'localhost:8080/api/'
const NAME_SPACE = 'api/'
const today = new Date().toISOString().split('T')[0]
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: 'http://realkeyip.in:8083/api/user/usermessages',
    ADD_NEW_MESSAGE: 'http://realkeyip.in:8083/api/user/createmessage',
    GET_TODAY_LEADS:
      'http://realkeyip.in:8083/api/leads/leadbyagentanddate?date=' + today,
    GET_ALL_AGENTS: 'http://realkeyip.in:8083//api/user/userbyrole?roleId=2',
    ADD_NEW_AGENT: 'http://realkeyip.in:8083//api/user/createuser',
    ADD_NEW_LEAD: 'http://realkeyip.in:8083/api/leads/createlead',
    GET_LEAD_STATUS_COUNT: 'http://realkeyip.in:8083/api/leads/leadbystatus',
    ADD_NEW_AUDIT: 'http://realkeyip.in:8083/api/leads/leadaudit',
    GET_LEAD_BY_AGENT: 'http://realkeyip.in:8083/api/leads/leadbyagent',
    LOGIN: 'http://realkeyip.in:8083/api/user/login',
    GET_ASSET_GROUPS: 'http://realkeyip.in:8083/api/asset/listAssetGroup',
    ADD_IMAGE_TO_ASSET_GROUP:'http://realkeyip.in:8083/api/documents/adddocument',
    LIST_GROUP_IMAGE:'http://realkeyip.in:8083/api/documents/listdocumentbygroup?groupId=',
    ADD_NEW_GROUP: 'http://realkeyip.in:8083/api/asset/addgroup',
    GET_ASSET_BY_GROUP_ID:
      'http://realkeyip.in:8083/api/asset/listAssetByGroupId',
    ADD_ASSET: 'http://realkeyip.in:8083/api/asset/addAsset'
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
  ],
  getLeadStatusById: (id) => {
    if (id == 1) return 'Created'
    else if (id == 2) return 'Prospecting'
    else if (id == 3) return 'Closure'
    else if (id == 4) return 'Converted'
    else if (id == 5) return 'Completed'
  }
}

export default constants
