import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'

interface State {
    data: object[];
    message: string[];
}

interface Data {
    data: number;
    nub: object;
}

interface People {
    name: string;
    id: number
}


describe('App.vue面向功能测试', () => {
    let $router: any;
    let $route: any;
    let mutations: any;
    let store: any;
    let clearLogMethod: any;

    it('App是否能正常渲染', () => {
        const wrapper = shallowMount(App, {
            mocks: { $router, $route },
            stubs: ['router-link', 'router-view']
        })
        expect(wrapper.contains('div')).toBe(true)
    })
})
