import authModel from './auth-model'
import broadCastMeassageModel from './broadcast-message-model'
import usersModel from './usersModel'
import leads from './lead-model.js'
import agentModel from './agent-model'
import assetModel from './asset-model'
import companyModel from './company-model'
import refDataModel from './ref-data-model'
import productModel from './product-model'


const models = {
  auth: authModel,
  broadCastMeassages: broadCastMeassageModel,
  users: usersModel,
  leads: leads,
  agents: agentModel,
  assets: assetModel,
  company:companyModel,
  refData:refDataModel,
  product:productModel
}

export default models
