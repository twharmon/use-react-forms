import MomentValidator from './MomentValidator'
import moment, { Moment } from 'moment'

describe('required', () => {
    it('passes when required given moment()', () => {
        const validator = new MomentValidator()
        validator.required()
        const violation = validator.violation(moment())
        expect(violation).toBe('')
    })

    it('fails when required given undefined', () => {
        const validator = new MomentValidator()
        validator.required()
        const violation = validator.violation(undefined)
        expect(violation).toBe('Required')
    })
})

describe('min', () => {
    it('passes when min moment() given undefined', () => {
        const validator = new MomentValidator()
        validator.min(moment())
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when min moment() given future', () => {
        const validator = new MomentValidator()
        validator.min(moment())
        const violation = validator.violation(moment().add(1, 'day'))
        expect(violation).toBe('')
    })

    it('fails when min moment() given past', () => {
        const validator = new MomentValidator()
        validator.min(moment())
        const violation = validator.violation(moment().subtract(1, 'day'))
        expect(violation).toContain('Must not be before')
    })
})

describe('max', () => {
    it('passes when max moment() given undefined', () => {
        const validator = new MomentValidator()
        validator.max(moment())
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when max moment() given past', () => {
        const validator = new MomentValidator()
        validator.max(moment())
        const violation = validator.violation(moment().subtract(1, 'day'))
        expect(violation).toBe('')
    })

    it('fails when max moment() given future', () => {
        const validator = new MomentValidator()
        validator.max(moment())
        const violation = validator.violation(moment().add(1, 'day'))
        expect(violation).toContain('Must not be after')
    })
})

describe('custom', () => {
    const customErrMsg = 'Date 1 not allowed'
    const customValidator = (m: Moment | undefined) => {
        if (m && m.date() === 1) return customErrMsg
        return ''
    }

    it('passes when custom given undefined', () => {
        const validator = new MomentValidator()
        validator.custom(customValidator)
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when custom given valid', () => {
        const validator = new MomentValidator()
        validator.custom(customValidator)
        const violation = validator.violation(moment([2010, 0, 31]))
        expect(violation).toBe('')
    })

    it('fails when custom given invalid', () => {
        const validator = new MomentValidator()
        validator.custom(customValidator)
        const violation = validator.violation(moment([2010, 0, 1]))
        expect(violation).toBe(customErrMsg)
    })
})