import mutations from '@/store/mutations.ts'
import { RootStateTypes } from '@/store/type'


interface Data {
    data: {
        name: string;
    }
}
describe("mutations", () => {
    it('ADD_HERO', () => {
        const state: RootStateTypes = {
            data: [],
            message: [],
        }
        const D: Data = {
            data: {
                name: 'test'
            }
        }
        mutations.ADD_HERO(state, D)
        expect(state.data.length).toBe(1)
        expect((state.data[0] as any).id).toBe(0)
        expect((state.data[0] as any).name).toBe('test')
        mutations.ADD_HERO(state, D)
        expect(state.data.length).toBe(2)
        expect((state.data[1] as any).id).toBe(1)
        expect((state.data[1] as any).name).toBe('test')
    })

    it('DELETE_HERO', () => {
        const state: RootStateTypes = {
            data: [{
                name: 'test',
                id: 0
            }],
            message: [],
        }
        const D = {
            index: 0
        }
        mutations.DELETE_HERO(state, D)
        expect(state.data.length).toBe(0)
    })

    it('ADD_MESSAGE', () => {
        const state: RootStateTypes = {
            data: [],
            message: [],
        }
        const data: string = 'test message'
        mutations.ADD_MESSAGE(state, data)
        expect(state.message.length).toBe(1)
    })

    it('CLEAR_MESSAGE', () => {
        const state: RootStateTypes = {
            data: [],
            message: ['test message1', 'test message2',]
        }
        mutations.CLEAR_MESSAGE(state)
        expect(state.message.length).toBe(0)
    })

    it('EDICT_HERO', () => {
        const state: RootStateTypes = {
            data: [{
                name: 'test',
                id: 0
            }],
            message: [],
        }
        const data1 = {
            name: 'test1',
            id: 0
        }
        const data2 = {
            name: 'test2',
            id: 2
        }
        mutations.EDICT_HERO(state, data1)
        expect(state.data.length).toBe(1)
        expect((state.data[0] as any).id).toBe(0)
        expect((state.data[0] as any).name).toBe('test1')
        mutations.EDICT_HERO(state, data2)
        expect(state.data.length).toBe(1)
        expect((state.data[0] as any).id).toBe(0)
        expect((state.data[0] as any).name).toBe('test1')
    })
})