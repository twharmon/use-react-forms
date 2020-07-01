import { Valid } from './Valid'
import StringValidator from './StringValidator'
import NumberValidator from './NumberValidator'
import BooleanValidator from './BooleanValidator'
import MomentValidator from './MomentValidator'

describe('string', () => {
    it('returns instance of StringValidator', () => {
        expect(Valid.string()).toBeInstanceOf(StringValidator)
    })
})

describe('number', () => {
    it('returns instance of NumberValidator', () => {
        expect(Valid.number()).toBeInstanceOf(NumberValidator)
    })
})

describe('boolean', () => {
    it('returns instance of BooleanValidator', () => {
        expect(Valid.boolean()).toBeInstanceOf(BooleanValidator)
    })
})

describe('moment', () => {
    it('returns instance of MomentValidator', () => {
        expect(Valid.moment()).toBeInstanceOf(MomentValidator)
    })
})