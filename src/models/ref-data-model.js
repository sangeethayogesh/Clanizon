import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const refDataModel = {
  referencedata: null,

  setRefData: action((state, payload) => {
    state.referencedata = payload
  }),
  unsetAgent: action((state, payload) => {
    state.companyList = null
  }),
  getRefData: thunk(async (actions, callback) => {
    actions.setRefData({})
    rest
      .get(constants.URL.GET_REF_DATA)
      .then((res) => {
        actions.setRefData(res.data)
       
      })
      .catch((err) => {
        
        console.error(err)
      })
  })
  // count: computed(state => state.productIds.length),
}

export default refDataModel
