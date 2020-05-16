import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'

const usersModel = ({
  users: null,

  setUser: action((state, payload) => {
    state.user = payload
  }),
  unsetUser: action((state, payload) => {
    state.user = null
  }),
  getUsers: thunk(async (actions, callback) => {
    actions.setMessages([])
    rest.get(constants.URL.GET_USERS)
      .then((res) => {
        actions.setUser(res.data)
        callback()
      }).catch((err) => {
        console.error(err)
      })
  })
  // count: computed(state => state.productIds.length),
})

export default usersModel
