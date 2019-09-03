import index from '@/store/index.ts'

describe('index', () => {
    it('index is exists', () => {
        expect(typeof index).toBe('object')
    })
})