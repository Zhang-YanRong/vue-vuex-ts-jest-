import state from './state'
import { RootStateTypes } from './type'
import { GetterTree } from 'vuex'

const getters: GetterTree<RootStateTypes, any> = {
  getData: (state: RootStateTypes) => {
    return state.data
  },
  getMessage: (state: RootStateTypes) => {
    return state.message
  },

}

export default getters