/* eslint-disable no-unused-vars */
const BASE_URL = 'localhost:8080/api/'
const NAME_SPACE = 'api/'
const today = new Date().toISOString().split('T')[0]
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: 'http://35.154.38.203:8083/api/user/usermessages',
    ADD_NEW_MESSAGE: 'http://35.154.38.203:8083/api/user/createmessage',
    GET_TODAY_LEADS:
      'http://35.154.38.203:8083/api/leads/leadbyagentanddate?date=' + today,
    GET_ALL_AGENTS: 'http://35.154.38.203:8083//api/user/userbyrole?roleId=2',
    ADD_NEW_AGENT: 'http://35.154.38.203:8083//api/user/createuser',
    ADD_NEW_LEAD: 'http://35.154.38.203:8083/api/leads/createlead',
    GET_LEAD_STATUS_COUNT: 'http://35.154.38.203:8083/api/leads/leadbystatus',
    ADD_NEW_AUDIT: 'http://35.154.38.203:8083/api/leads/leadaudit',
    GET_LEAD_BY_AGENT: 'http://35.154.38.203:8083/api/leads/leadbyagent',
    LOGIN: 'http://35.154.38.203:8083/api/user/login',
    GET_ASSET_GROUPS: 'http://35.154.38.203:8083/api/asset/listAssetGroup',
    ADD_IMAGE_TO_ASSET_GROUP:'http://35.154.38.203:8083/api/documents/adddocument',
    LIST_GROUP_IMAGE:'http://35.154.38.203:8083/api/documents/listdocumentbygroup?groupId=',
    ADD_NEW_GROUP: 'http://35.154.38.203:8083/api/asset/addgroup',
    GET_ASSET_BY_GROUP_ID:
      'http://35.154.38.203:8083/api/asset/listAssetByGroupId',
    ADD_ASSET: 'http://35.154.38.203:8083/api/asset/addAsset',
    ADD_NEW_COMPANY: 'http://localhost:8084/api/user/createcompany',
    GET_ALL_COMPANY:'http://localhost:8084/api/user/listcompany',
    GET_REF_DATA:'http://localhost:8084/api/user/referencedata',
    ADD_PRODUCT:'http://localhost:8084/api/asset/addAsset',
    GET_COMPANY_DETAIl:'http://localhost:8084/api/user/getcomapanydetail',
    GET_PRODUCT:'http://localhost:8084/api/asset/listproductbyBusiness',
    GET_ALL_PRODUCT:'http://localhost:8084/api/asset/listallproduct'
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
