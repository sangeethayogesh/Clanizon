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
  setAgentByAdmin: action((state, payload) => {
    state.agentlistAdmin = payload
  }),
  unsetAgentByAdmin: action((state, payload) => {
    state.agentlistAdmin = null
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

  getAllAgentByAdmin: thunk(async (actions, data) => {
    actions.setAgentByAdmin([])
    rest
      .get(constants.URL.GET_ALL_AGENT_BYADMIN+ '&adminMobile=' + data)
      .then((res) => {
        actions.setAgentByAdmin(res.data)
      
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
