import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const companyModel = {
  companyList: null,

  setCompany: action((state, payload) => {
    state.companyList = payload
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
  addNewCompany: action((state, payload) => {
    state.companyList.push(payload)
  })
  // count: computed(state => state.productIds.length),
}

export default companyModel
