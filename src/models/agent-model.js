import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const agentModel = {
  list: null,

  setAgent: action((state, payload) => {
    state.list = payload
  }),
  unsetAgent: action((state, payload) => {
    state.list = null
  }),
  getAllAgents: thunk(async (actions, callback) => {
    actions.setAgent([])
    rest
      .get(constants.URL.GET_ALL_AGENTS)
      .then((res) => {
        actions.setAgent(res.data)
        callback()
      })
      .catch((err) => {
        message.error('Agent loading failed')
        console.error(err)
      })
  }),
  addNewAgent: action((state, payload) => {
    state.list.push(payload)
  })
  // count: computed(state => state.productIds.length),
}

export default agentModel
