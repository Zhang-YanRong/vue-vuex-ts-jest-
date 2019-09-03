import { shallowMount, createLocalVue } from '@vue/test-utils'
import heroes from '@/views/heroes.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('heroes.vue', () => {
    let $router: any;
    let mutations: any;
    let getters: any;
    let store: any;
    beforeEach(() => {
        mutations = {
            ADD_HERO: jest.fn(),
            DELETE_HERO: jest.fn(),
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
                    id: 0
                }],
                message: []
            },
            mutations,
            getters,
        })

        $router = [{
            path: '/heroes'
        }]
    })

    afterEach(() => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm && vm.$destroy();
        wrapper && wrapper.destroy();
    });

    it('heroes正常渲染', () => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        expect(wrapper.contains('div')).toBe(true)
    })

    it('heroes-test-addPeople', () => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.addPeople.call(vm)
        expect(mutations.ADD_HERO).toHaveBeenCalled()
    })

    it('heroes-test-deleteHero', () => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.deleteHero.call(vm, 0)
        expect(mutations.DELETE_HERO).toHaveBeenCalled()
    })

    it('heroes-test-goDetail', () => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.goDetail.call(vm, 1)
        expect(vm.$router[1].path).toBe("/heroDetail/1");
    })

    it('computed-datas-test', () => {
        const wrapper = shallowMount(heroes, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        const arr = vm.datas
        expect(arr.length).toBe(1)
        expect(getters.getData).toHaveBeenCalledTimes(1)
    })
})