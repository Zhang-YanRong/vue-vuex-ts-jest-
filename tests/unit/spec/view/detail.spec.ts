import { shallowMount, createLocalVue } from '@vue/test-utils'
import detail from '@/views/heroDetail.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('detail.vue', () => {
    let $router: any;
    let $route: any;
    let mutations: any;
    let getters: any;
    let store: any;
    beforeEach(() => {
        mutations = {
            EDICT_HERO: jest.fn(),
            ADD_MESSAGE: jest.fn(),
        }

        getters = {
            getData: jest.fn(() => {
                return [{
                    name: 'B',
                    id: 1
                }]
            })
        }

        store = new Vuex.Store({
            state: {
                data: [{
                    name: 'A',
                    id: 1
                }],
                message: []
            },
            mutations,
            getters,
        })

        $router = {
            go: jest.fn(() => {
                return -1
            }),
            push: jest.fn()
        }


        $route = {
            path: '/heroDetail/:id',
            params: {
                id: 1
            }
        }
    })

    it('detail正常渲染', () => {
        const wrapper = shallowMount(detail, {
            store,
            localVue,
            mocks: { $router, $route }
        })
        expect(wrapper.contains('div')).toBe(true)
    })

    it('返回上一页', () => {
        const wrapper = shallowMount(detail, {
            store,
            localVue,
            mocks: { $router, $route }
        })
        const vm: any = wrapper.vm;
        vm.goBack.call(vm)
        expect($router.go).toHaveBeenCalled();
    })

    it('保存', () => {
        const wrapper = shallowMount(detail, {
            store,
            localVue,
            mocks: { $router, $route }
        })
        const vm: any = wrapper.vm
        vm.save.call({ name: 'ASD', id: 1 })
        expect($router.push).toHaveBeenCalled();
    })

})