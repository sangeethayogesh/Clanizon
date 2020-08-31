import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const productModel = {
  userproductList:null,
  
  setUserProduct: action((state, payload) => {
    state.userproductList = payload
  }),
  unsetUserProduct: action((state, payload) => {
    state.userproductList = null
  }),
  getAllProduct: thunk(async (actions, callback) => {
    actions.setProduct([])
    rest
      .get(constants.URL.GET_ALL_PRODUCT)
      .then((res) => {
        actions.setProduct(res.data)
       
        callback()
      })
      .catch((err) => {
        message.error('Product loading failed')
        console.error(err)
      })
  }),  
  getUserProduct: thunk(async (actions, data) => {
    actions.setUserProduct([])
    rest
      .get(constants.URL.GET_USER_PRODUCT +data.params)
      .then((res) => {
        actions.setUserProduct(res.data)
        localStorage.productList=JSON.stringify(res.data);   
        if(data.callback)     {
          data.callback()
        }
      })
      .catch((err) => {
        message.error('user Product loading failed')
        console.error(err)
      })
  }),
  addNewProduct: action((state, payload) => {
    state.userproductList.push(payload)
  })
  // count: computed(state => state.productIds.length),
}

export default productModel
