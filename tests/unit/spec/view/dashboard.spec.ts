import { shallowMount, createLocalVue } from '@vue/test-utils'
import dashboard from '@/views/dashboard.vue'
import Vuex from 'vuex'
import Vue from 'vue'

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

        jest.useFakeTimers();
        vm.createThrottle.call(wrapper.vm, '1', '1', search)
        jest.advanceTimersByTime(1000);
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(search).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    })


    it('dashboard-methods-createThrottle', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        const search = jest.fn()
        jest.useFakeTimers();
        vm.createThrottle.call(wrapper.vm, '2', '1', search)
        jest.advanceTimersByTime(1000);
        expect(search).toHaveBeenCalledTimes(0)
        expect(setTimeout).toHaveBeenCalledTimes(1)
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

    it('nextTick测试', done => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        jest.useFakeTimers();
        jest.advanceTimersByTime(1000);
        vm.$nextTick(() => {
            expect(vm.datas.length).toBeGreaterThan(-1)
            expect(vm.testData).toBe(888)
            done()
        })
    })

    it('will catch the error using a promise', () => {
        const wrapper = shallowMount(dashboard, {
            store,
            localVue,
            mocks: { $router }
        })
        const vm: any = wrapper.vm
        jest.useFakeTimers();
        jest.advanceTimersByTime(1000);
        return vm.$nextTick().then(function () {
            expect(vm.datas.length).toBeGreaterThan(-1)
            expect(vm.testData).toBe(888)
        })
    })
})

describe('dashboard-computed-test', () => {
    let getters;
    let store;
    let mutations;
    it('dashboard-datas-大于0小于5', () => {
        mutations = {
            ADD_MESSAGE: jest.fn()
        }
        getters = {
            getData: jest.fn(
                () => {
                    return [{
                        name: 'A',
                        id: 0
                    }, {
                        name: 'B',
                        id: 1
                    }]
                }
            )
        }

        store = new Vuex.Store({
            state: {
                data: [],
                message: [],
            },
            getters,
            mutations,
        })

        const wrapper = shallowMount(dashboard, {
            store,
            localVue
        })
        const vm: any = wrapper.vm
        const arr = vm.datas
        expect(arr.length).toBe(1)
        expect(getters.getData).toHaveBeenCalledTimes(1)
    })

    it('dashboard-datas-等于0', () => {
        mutations = {
            ADD_MESSAGE: jest.fn()
        }
        getters = {
            getData: jest.fn(
                () => {
                    return [{
                        name: 'A',
                        id: 0
                    }]
                }
            )
        }

        store = new Vuex.Store({
            state: {
                data: [],
                message: [],
            },
            getters,
            mutations,
        })

        const wrapper = shallowMount(dashboard, {
            store,
            localVue
        })
        const vm: any = wrapper.vm
        const arr = vm.datas
        expect(arr.length).toBe(0)
        expect(getters.getData).toHaveBeenCalledTimes(1)
    })

    it('dashboard-datas-大于5', () => {
        mutations = {
            ADD_MESSAGE: jest.fn()
        }
        getters = {
            getData: jest.fn(
                () => {
                    return [{
                        name: 'A',
                        id: 0
                    },
                    {
                        name: 'B',
                        id: 1
                    },
                    {
                        name: 'C',
                        id: 2
                    },
                    {
                        name: 'D',
                        id: 3
                    },
                    {
                        name: 'E',
                        id: 4
                    }]
                }
            )
        }

        store = new Vuex.Store({
            state: {
                data: [],
                message: [],
            },
            getters,
            mutations,
        })

        const wrapper = shallowMount(dashboard, {
            store,
            localVue
        })
        const vm: any = wrapper.vm
        const arr = vm.datas
        expect(arr.length).toBe(4)
        expect(getters.getData).toHaveBeenCalledTimes(1)
    })

    it('dashboard-datas-大于5', () => {
        mutations = {
            ADD_MESSAGE: jest.fn()
        }
        getters = {
            getData: jest.fn(
                () => {
                    return null
                }
            )
        }

        store = new Vuex.Store({
            state: {
                data: [],
                message: [],
            },
            getters,
            mutations,
        })

        const wrapper = shallowMount(dashboard, {
            store,
            localVue
        })
        const vm: any = wrapper.vm
        const arr = vm.datas
        expect(arr.length).toBe(0)
        expect(getters.getData).toHaveBeenCalledTimes(1)
    })
})
