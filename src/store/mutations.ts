import state from './state'
import { RootStateTypes } from './type'
import { MutationTree } from 'vuex'
import store from './index'

const mutations: MutationTree<RootStateTypes> = {
  ADD_HERO(state: RootStateTypes, data: any) {
    let obj: any = data.data
    switch (state.data.length) {
      case 0:
        obj.id = 0;
        break;

      default:
        let Nub: number = state.data.length - 1
        let id: number = (state.data[Nub] as any).id
        obj.id = id + 1
        break;
    }
    state.data.push(obj)
  },

  DELETE_HERO(state: any, data: any) {
    store.commit('ADD_MESSAGE', `delete id=${state.data[data.index].id}`)
    state.data.splice(data.index, 1)
  },

  ADD_MESSAGE(state: RootStateTypes, data: string) {
    let str: any = 'HeroService:' + data
    state.message.push(str)
  },

  CLEAR_MESSAGE(state: RootStateTypes) {
    state.message = []
  },

  EDICT_HERO(state: RootStateTypes, data: any) {
    state.data.forEach((v: any, i: number) => {
      if (v.id == data.id) {
        state.data[i] = data
      }
    })
  }
}

export default mutations