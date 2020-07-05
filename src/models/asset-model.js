import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'

const assetModel = {
  assetGroups: null,
  asssetDetails: null,
  setGroup: action((state, payload) => {
    state.assetGroups = payload
  }),
  setAsset: action((state, payload) => {
    state.assetDetails = payload
  }),
  addAsset: action((state, payload) => {
    state.assetDetails.push(payload)
  }),
  unsetGroup: action((state, payload) => {
    state.assetGroups = null
  }),
  addNewGroup: action((state, payload) => {
    state.assetGroups.push(payload)
  }),
  getAssetGroups: thunk(async (actions, callback) => {
    rest
      .get(constants.URL.GET_ASSET_GROUPS)
      .then((res) => {
        actions.setGroup(res.data)
        callback()
      })
      .catch((err) => {
        console.error(err)
      })
  }),
  getAssetById: thunk(async (actions, data) => {
    rest
      .get(constants.URL.GET_ASSET_BY_GROUP_ID + '?groupId=' + data.id)
      .then((res) => {
        actions.setAsset(res.data)
        data.callback()
      })
      .catch((err) => {
        console.error(err)
      })
  })
  // count: computed(state => state.productIds.length),
}

export default assetModel
