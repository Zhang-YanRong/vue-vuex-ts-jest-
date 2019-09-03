import state from './state'
import { RootStateTypes } from './type'
import { GetterTree } from 'vuex'

const getters: GetterTree<RootStateTypes, any> = {
  getData: (state: RootStateTypes) => state.data,
  getMessage: (state: RootStateTypes) => state.message,
  getTop: (state: RootStateTypes) => state.data.filter((v: object, i: number) => i > 0 && i < 5)
}

export default getters