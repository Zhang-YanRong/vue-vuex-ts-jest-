import getters from '@/store/getters'
import { RootStateTypes } from '@/store/type'
const state: RootStateTypes = {
    data: [],
    message: [],
}


describe('getters', () => {
    it('getters is exists', () => {
        expect(typeof getters).toBe('object')
    })
    it("getters value", () => {
        expect((getters as any).getData(state).length).toBe(0)
        expect((getters as any).getMessage(state).length).toBe(0)
    })
})