import { shallowMount, createLocalVue } from '@vue/test-utils'
import home from '@/views/home.vue'
import Vuex from 'vuex'
import store from '@/store';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('home.vue', () => {
    let $router: any;
    let mutations: any;
    let getters: any;
    let store: any;
    beforeEach(() => {
        mutations = {
            ADD_MESSAGE: jest.fn()
        }

        getters = {
            getData: jest.fn(() => {
                return [{
                    name: 'A',
                    id: 0
                },
                {
                    name: 'B',
                    id: 1
                }]
            }),
            getTop: jest.fn(() => {
                return 1
            })
        }

        store = new Vuex.Store({
            state: {
                data: [{
                    name: 'A',
                    id: 0
                }],
                message: []
            },
            mutations,
            getters,
        })


        $router = [{
            path: '/home'
        }]
    })

    afterEach(() => {
        const wrapper = shallowMount(home, {
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm && vm.$destroy();
        wrapper && wrapper.destroy();
    });

    it('heroes正常渲染', () => {
        const wrapper = shallowMount(home, {
            store,
            localVue,
            mocks: { $router }
        })
        expect(wrapper.contains('div')).toBe(true)
    })
})