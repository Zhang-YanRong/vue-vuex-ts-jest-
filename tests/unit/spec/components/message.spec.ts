import { shallowMount, createLocalVue } from '@vue/test-utils'
import message from '@/components/messageLog.vue'
import Vuex from 'vuex'
import store from '@/store';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('message.vue', () => {
    let $router: any;
    let mutations: any;
    let getters: any;
    let store: any;
    beforeEach(() => {
        mutations = {
            ADD_HERO_ACTION: jest.fn(),
            DELETE_HERO: jest.fn(),
            CLEAR_MESSAGE: jest.fn(),
        }

        getters = {
            getMessage: jest.fn()
        }

        store = new Vuex.Store({
            state: {
                data: [{
                    name: 'A',
                    id: 0
                }],
                message: ['test']
            },
            mutations,
            getters,
        })


    })

    it('dashboard正常渲染', () => {
        const wrapper = shallowMount(message, {
            store,
            localVue,
            mocks: { $router }
        })
        expect(wrapper.contains('div')).toBe(true)
    })

    it('clear-test', () => {
        const wrapper = shallowMount(message, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.clear.call(vm)
        expect(mutations.CLEAR_MESSAGE).toHaveBeenCalledTimes(1)
    })

    it('getMessage-test', () => {
        const wrapper = shallowMount(message, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        const arr = vm.messages
        expect(getters.getMessage).toHaveBeenCalledTimes(1)
    })
})