import { action, computed, thunk } from 'easy-peasy'
import rest from '../services/http'
import { message } from 'antd'
const leads = {
  today_leads: [],
  allLeads: [],
  leadsByAgent: [],
  statusCount: {
    created: 0,
    prospecting: 0,
    closer: 0,
    completed: 0
  },
  total: computed((state) => state.today_leads.length),
  setTodayLeads: action((state, payload) => {
    state.today_leads = payload
  }),
  unsetTodayLeads: action((state, payload) => {
    state.today_leads = []
  }),
  getTodayLeads: thunk(async (actions, data) => {
    actions.setTodayLeads([])
    rest
      .get(data.url)
      .then((res) => {
        // const data = res.data.map((item) => ({
        //   ...item,
        //   next_schedule: '10:30AM'
        // }))
        actions.setTodayLeads(res.data)
        data.callback()
      })
      .catch((err) => {
        console.error(err)
      })
  }),
  setAllLeads: action((state, payload) => {
    state.allLeads = payload
  }),
  unsetAllLeads: action((state, payload) => {
    state.allLeads = []
  }),
  addLead: action((state, payload) => {
    state.allLeads.push(payload)
  }),
  getLeadStatusCount: thunk(async (actions, url) => {
    rest
      .get(url)
      .then((res) => {
        actions.setLeadStatusCount(res.data)
      })
      .catch((err) => {
        console.error(err)
        message.error('Failed loading status count!')
      })
  }),
  setLeadStatusCount: action((state, payload) => {
    const created = payload.filter((leads) => leads.category == 'Created')
    const prospecting = payload.filter(
      (leads) => leads.category == 'Prospecting'
    )
    const closure = payload.filter((leads) => leads.category == 'Closure')
    const completed = payload.filter((leads) => leads.category == 'Completed')
    state.statusCount = {
      created: created[0] ? created[0].count : 0,
      prospecting: prospecting[0] ? prospecting[0].count : 0,
      closure: closure[0] ? closure[0].count : 0,
      completed: completed[0] ? completed[0].count : 0
    }
    console.log(state.statusCount)
  }),
  getLeadsByAgent: thunk(async (actions, data) => {
    rest
      .get(data.url)
      .then((res) => {
        actions.setLeadsByAgent(res.data)
        data.callback()
      })
      .catch((err) => {
        console.error(err)
        message.error('Failed loading leads!')
      })
  }),
  setLeadsByAgent: action((state, payload) => {
    state.leadsByAgent = payload
  })
  // count: computed(state => state.productIds.length),
}

export default leads
