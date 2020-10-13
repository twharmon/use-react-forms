import NumberValidator from './NumberValidator'

describe('required', () => {
    it('passes when given 5', () => {
        const validator = new NumberValidator()
        validator.required()
        const violation = validator.violation(5)
        expect(violation).toBe('')
    })
})

describe('min', () => {
    it('passes when min 0 given 0', () => {
        const validator = new NumberValidator()
        validator.min(0)
        const violation = validator.violation(0)
        expect(violation).toBe('')
    })

    it('passes when min 0 given 5', () => {
        const validator = new NumberValidator()
        validator.min(0)
        const violation = validator.violation(5)
        expect(violation).toBe('')
    })

    it('passes when min 3 given 5', () => {
        const validator = new NumberValidator()
        validator.min(3)
        const violation = validator.violation(5)
        expect(violation).toBe('')
    })

    it('fails when min 5 given 0', () => {
        const validator = new NumberValidator()
        validator.min(5)
        const violation = validator.violation(0)
        expect(violation).toContain('at least')
    })

    it('fails when min 5 given 3', () => {
        const validator = new NumberValidator()
        validator.min(5)
        const violation = validator.violation(3)
        expect(violation).toContain('at least')
    })
})

describe('max', () => {
    it('fails when max 0 given 3', () => {
        const validator = new NumberValidator()
        validator.max(0)
        const violation = validator.violation(3)
        expect(violation).toContain('no more than')
    })

    it('fails when max -1 given 0', () => {
        const validator = new NumberValidator()
        validator.max(-1)
        const violation = validator.violation(0)
        expect(violation).toContain('no more than')
    })

    it('passes when max 0 given 0', () => {
        const validator = new NumberValidator()
        validator.max(0)
        const violation = validator.violation(0)
        expect(violation).toBe('')
    })

    it('passes when max 0 given -1', () => {
        const validator = new NumberValidator()
        validator.max(0)
        const violation = validator.violation(-1)
        expect(violation).toBe('')
    })

    it('passes when max 5 given 3', () => {
        const validator = new NumberValidator()
        validator.max(5)
        const violation = validator.violation(3)
        expect(violation).toBe('')
    })

    it('passes when max 5 given 5', () => {
        const validator = new NumberValidator()
        validator.max(5)
        const violation = validator.violation(5)
        expect(violation).toBe('')
    })
})

describe('in', () => {
    it('passes when [3, 5] given 3', () => {
        const validator = new NumberValidator()
        validator.in([3, 5])
        const violation = validator.violation(3)
        expect(violation).toBe('')
    })

    it('fails when [3, 5] given 8', () => {
        const validator = new NumberValidator()
        validator.in([3, 5])
        const violation = validator.violation(8)
        expect(violation).toContain('or')
    })
})

describe('custom', () => {
    const customErrMsg = '5 not allowed'
    const customValidator = (n: number) => {
        if (n === 5) return customErrMsg
        return ''
    }

    it('passes when custom given valid', () => {
        const validator = new NumberValidator()
        validator.custom(customValidator)
        const violation = validator.violation(3)
        expect(violation).toBe('')
    })

    it('fails when custom given invalid', () => {
        const validator = new NumberValidator()
        validator.custom(customValidator)
        const violation = validator.violation(5)
        expect(violation).toBe(customErrMsg)
    })
})