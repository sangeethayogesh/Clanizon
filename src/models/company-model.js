import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const companyModel = {
  companyList: [],
  userCompany:[],
  setCompany: action((state, payload) => {
    state.companyList = payload
  }),
  setUserCompany:action((state, payload) => {
    state.userCompany = payload
  }),
  unsetAgent: action((state, payload) => {
    state.companyList = null
  }),
  getAllCompany: thunk(async (actions, callback) => {
    actions.setCompany([])
    rest
      .get(constants.URL.GET_ALL_COMPANY)
      .then((res) => {
        actions.setCompany(res.data)
        callback()
      })
      .catch((err) => {
        message.error('Company loading failed')
        console.error(err)
      })
  }),

  getUserCompany: thunk(async (actions, data) => {
    actions.setUserCompany([])
    rest
      .get(constants.URL.GET_USER_COMPANY+data.params)
      .then((res) => {
        actions.setUserCompany(res.data)
        if(data.callback)     {
          data.callback();
        }
      })
      .catch((err) => {
        message.error('User Company loading failed')
        console.error(err)
      })
  }),
  
  addNewCompany: action((state, payload) => {
    state.companyList.push(payload)
    state.userCompany.push(payload)
  })
  // count: computed(state => state.productIds.length),
}

export default companyModel
