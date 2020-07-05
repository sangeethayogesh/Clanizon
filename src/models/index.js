import authModel from './auth-model'
import broadCastMeassageModel from './broadcast-message-model'
import usersModel from './usersModel'
import leads from './lead-model.js'
import agentModel from './agent-model'
import assetModel from './asset-model'
const models = {
  auth: authModel,
  broadCastMeassages: broadCastMeassageModel,
  users: usersModel,
  leads: leads,
  agents: agentModel,
  assets: assetModel
}

export default models
