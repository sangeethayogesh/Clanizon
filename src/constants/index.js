/* eslint-disable no-unused-vars */

const NAME_SPACE = 'api/'
//const BASE_URL='http://localhost:8085'
const BASE_URL='https://api.realkeyip.in/'
const today = new Date().toISOString().split('T')[0]
const constants = {
  URL: {
    GET_ADMIN_MESSAGES: BASE_URL+'/api/user/usermessages',
    ADD_NEW_MESSAGE: BASE_URL+'/api/user/createmessage',
    GET_TODAY_LEADS:
      BASE_URL+'/api/leads/leadbyagentanddate?date=' + today,
    GET_ALL_AGENTS: BASE_URL+'//api/user/userbyrole?roleId=2',
    GET_LEAD_STATUS_AGENT:BASE_URL+'/api/leads/leadbyagentstatus',
    GET_ALL_AGENT_BYADMIN:BASE_URL+'//api/user/userbyroleadmin?roleId=2',
    ADD_NEW_AGENT: BASE_URL+'//api/user/createuser',
    ADD_NEW_LEAD: BASE_URL+'/api/leads/createlead',
    GET_LEAD_STATUS_COUNT: BASE_URL+'/api/leads/leadbyadminstatus',
    ADD_NEW_AUDIT: BASE_URL+'/api/leads/leadaudit',
    GET_LEAD_BY_AGENT: BASE_URL+'/api/leads/leadbyagent',
    LOGIN: BASE_URL+'/api/user/login',
    GET_ASSET_GROUPS: BASE_URL+'/api/asset/listAssetGroup',
    ADD_IMAGE_TO_ASSET_GROUP:BASE_URL+'/api/documents/adddocument',
    LIST_GROUP_IMAGE:BASE_URL+'/api/documents/listdocumentbygroup?groupId=',
    ADD_NEW_GROUP: BASE_URL+'/api/asset/addgroup',
    GET_ASSET_BY_GROUP_ID:
      BASE_URL+'/api/asset/listAssetByGroupId',
    ADD_ASSET: BASE_URL+'/api/asset/addAsset',
    ADD_NEW_COMPANY: BASE_URL+'/api/user/createcompany',
    GET_ALL_COMPANY:BASE_URL+'/api/user/listcompany',
    GET_REF_DATA:BASE_URL+'/api/user/referencedata',
    ADD_PRODUCT:BASE_URL+'/api/asset/addAsset',
    GET_COMPANY_DETAIl:BASE_URL+'/api/user/getcomapanydetail',
    GET_PRODUCT:BASE_URL+'/api/asset/listproductbyBusiness',
    GET_ALL_PRODUCT:BASE_URL+'/api/asset/listallproduct',
    GET_USER_PRODUCT:BASE_URL+'/api/asset/listproductbyadmin',
    GET_LEAD_DETAIL:BASE_URL+'/api/leads/getleaddetail',
    GET_All_LEAD : BASE_URL+'/api/leads/getAllLeads',
    GET_All_LEAD_BYADMIN : BASE_URL+'/api/leads/getleadByAdmin',
    ADD_FINANCIAL_METRICS:BASE_URL+'/api/user/addmetrics',
    GET_METRICS:BASE_URL+'/api/user/metricsbyadmin',
    GET_USER_COMPANY:BASE_URL+'/api/user/listcompanybyuser',

    GET_AGENT_PERFORMANCE:BASE_URL+'/api/leads/getperformancebyagent',
    GET_PERFORMANCE_DATA:BASE_URL+'/api/leads/getperformancedata',
    ADD_LEAD_DOCUMENT:BASE_URL+'/api/documents/adddocument',
    GET_LEAD_DOCUMENT:BASE_URL+'/api/documents/listdocumentbylead',
    
    GET_BUSINESS_METRICS:BASE_URL+'/api/asset/metricsbybusiness',
    GET_AMOUNT_METRICS:BASE_URL+'/api/asset/metricsbyamount'
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
  },
  getBusinessType: (id) => {
    if (id == 1) return 'Ups'
    else if (id == 2) return 'connectivity'
    else if (id == 3) return 'Racks'
    else if (id == 4) return 'Industrial and service'
    else if (id == 5) return 'Accessories'
    else if (id == 5) return 'Battery'
  },

  getproductModel: (id,prodList) => {
    var model='';
    prodList.map((product) => {
      console.log(product.productId==id)
      if(product.productId==id) {
        model=product.productModel;
      }
    })   
    return model     
  }
}

export default constants
