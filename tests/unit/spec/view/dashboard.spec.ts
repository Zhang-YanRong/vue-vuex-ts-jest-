import { shallowMount, createLocalVue } from '@vue/test-utils'
import dashboard from '@/views/dashboard.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('dashboard.vue', () => {
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
            path: '/dashboard'
        }]
    })

    afterEach(() => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm && vm.$destroy();
        wrapper && wrapper.destroy();
    });

    it('dashboard正常渲染', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        expect(wrapper.contains('div')).toBe(true)
    })

    it('dashboard-methods-search', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.search.call(vm, 'a')
        expect(getters.getData).toBeCalledTimes(1);
    })

    it('dashboard-methods-goDetail', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        vm.goDetail.call(vm, 0)
        expect(vm.$router[1].path).toBe("/heroDetail/0");
    })

    it('dashboard-methods-createThrottle', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        const search = jest.fn()
        vm.createThrottle.call(wrapper.vm, '1', '1', search)
        // console.log(vm.createThrottle)
        // console.log(search.mock.calls)
        // expect(search).toBeCalled();
        expect(vm.createThrottle()).toBeGreaterThan(0);
        expect(vm.createThrottle()).toBeTruthy();
        // expect(search()).toBeCalledTimes(1);
        // expect(search).toBeCalledWith(expect.anything());
        // expect(search.mock.calls[0][0]).toBe(0);//确保被调用一次 这里是0
        // expect(vm.search).toBeCalledWith(expect.anything()) //确保调用回调

    })

    it('test-watch-searchData', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        let searchData: string = vm.searchData
        vm.onSearchDataChange('1', '')
        expect(vm.searchData).toBe('1')

    })
})

describe('dashboard-computed-test', () => {
    let getters;
    let store;
    it('dashboard-datas', () => {
        store = new Vuex.Store({
            state: {
                data: [{
                    name: 'A',
                    id: 0
                }],
                message: []
            }
        })

        const wrapper = shallowMount(dashboard, {
            store,
            localVue
        })
        // expect(store.getters).toHaveBeenCalled()
    })
})
