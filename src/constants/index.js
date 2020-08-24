/* eslint-disable no-unused-vars */
const BASE_URL = 'localhost:8080/api/'
const NAME_SPACE = 'api/'
const today = new Date().toISOString().split('T')[0]
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: 'http://13.233.158.187:8085/api/user/usermessages',
    ADD_NEW_MESSAGE: 'http://13.233.158.187:8085/api/user/createmessage',
    GET_TODAY_LEADS:
      'http://13.233.158.187:8085/api/leads/leadbyagentanddate?date=' + today,
    GET_ALL_AGENTS: 'http://13.233.158.187:8085//api/user/userbyrole?roleId=2',
    ADD_NEW_AGENT: 'http://13.233.158.187:8085//api/user/createuser',
    ADD_NEW_LEAD: 'http://13.233.158.187:8085/api/leads/createlead',
    GET_LEAD_STATUS_COUNT: 'http://13.233.158.187:8085/api/leads/leadbystatus',
    ADD_NEW_AUDIT: 'http://13.233.158.187:8085/api/leads/leadaudit',
    GET_LEAD_BY_AGENT: 'http://13.233.158.187:8085/api/leads/leadbyagent',
    LOGIN: 'http://13.233.158.187:8085/api/user/login',
    GET_ASSET_GROUPS: 'http://13.233.158.187:8085/api/asset/listAssetGroup',
    ADD_IMAGE_TO_ASSET_GROUP:'http://13.233.158.187:8085/api/documents/adddocument',
    LIST_GROUP_IMAGE:'http://13.233.158.187:8085/api/documents/listdocumentbygroup?groupId=',
    ADD_NEW_GROUP: 'http://13.233.158.187:8085/api/asset/addgroup',
    GET_ASSET_BY_GROUP_ID:
      'http://13.233.158.187:8085/api/asset/listAssetByGroupId',
    ADD_ASSET: 'http://13.233.158.187:8085/api/asset/addAsset',
    ADD_NEW_COMPANY: 'http://13.233.158.187:8085/api/user/createcompany',
    GET_ALL_COMPANY:'http://13.233.158.187:8085/api/user/listcompany',
    GET_REF_DATA:'http://13.233.158.187:8085/api/user/referencedata',
    ADD_PRODUCT:'http://13.233.158.187:8085/api/asset/addAsset',
    GET_COMPANY_DETAIl:'http://13.233.158.187:8085/api/user/getcomapanydetail',
    GET_PRODUCT:'http://13.233.158.187:8085/api/asset/listproductbyBusiness',
    GET_ALL_PRODUCT:'http://13.233.158.187:8085/api/asset/listallproduct',
    GET_LEAD_DETAIL:'http://13.233.158.187:8085/api/leads/getleaddetail'
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
    else if (id == 2) return 'Market Platform'
    else if (id == 3) return 'Working Platform'
    else if (id == 4) return 'Buying Platform'
    else if (id == 5) return 'Completed'
  }
}

export default constants
