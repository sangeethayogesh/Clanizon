import { action, computed, thunk } from 'easy-peasy'
import constants from '../constants'
import rest from '../services/http'

const broadCastMeassageModel = {
  messages: [],
  total: computed(state => state.messages.length),
  setMessages: action((state, payload) => {
    state.messages = payload
  }),
  unsetMessages: action((state, payload) => {
    state.messages = []
  }),
  getMessages: thunk(async (actions, callback) => {
    actions.setMessages([])
    rest.get(constants.URL.GET_ADMIN_MESSAGES)
      .then((res) => {
        console.log(res);
        actions.setMessages(res.data)
        callback()
      }).catch((err) => {
        console.error(err)
      })
  })
  // count: computed(state => state.productIds.length),
}

export default broadCastMeassageModel
