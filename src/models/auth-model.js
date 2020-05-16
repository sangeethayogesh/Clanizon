import { action, computed, persist } from 'easy-peasy'

const authModel = persist({
  user: null,
  isLoggedIn: computed(state => state.user != null),
  setUser: action((state, payload) => {
    state.user = payload
  }),
  unsetUser: action((state, payload) => {
    state.user = null
  })
  // count: computed(state => state.productIds.length),
})

export default authModel
