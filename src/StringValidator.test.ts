import StringValidator from './StringValidator'

describe('required', () => {
    it('fails when given undefined', () => {
        const validator = new StringValidator()
        validator.required()
        const violation = validator.violation(undefined)
        expect(violation).toBe('Required')
    })

    it('fails when given empty string', () => {
        const validator = new StringValidator()
        validator.required()
        const violation = validator.violation('')
        expect(violation).toBe('Required')
    })

    it('passes when given non-empty string', () => {
        const validator = new StringValidator()
        validator.required()
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })
})

describe('min', () => {
    it('fails when required & min 0 given undefined', () => {
        const validator = new StringValidator()
        validator.required().min(0)
        const violation = validator.violation(undefined)
        expect(violation).toBe('Required')
    })

    it('passes when min 3 given undefined', () => {
        const validator = new StringValidator()
        validator.min(3)
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when min 0 given empty string', () => {
        const validator = new StringValidator()
        validator.min(0)
        const violation = validator.violation('')
        expect(violation).toBe('')
    })

    it('fails when min 1 with singular character', () => {
        const validator = new StringValidator()
        validator.min(1)
        const violation = validator.violation('')
        expect(violation.endsWith('character')).toBe(true)
    })

    it('fails when min 2 with plural characters', () => {
        const validator = new StringValidator()
        validator.min(2)
        const violation = validator.violation('')
        expect(violation.endsWith('characters')).toBe(true)
    })

    it('fails when min 6 given length 3', () => {
        const validator = new StringValidator()
        validator.min(6)
        const violation = validator.violation('foo')
        expect(violation).toContain('at least')
    })

    it('passes when min 3 given length 3', () => {
        const validator = new StringValidator()
        validator.min(3)
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })

    it('passes when min 3 given length 6', () => {
        const validator = new StringValidator()
        validator.min(3)
        const violation = validator.violation('foobar')
        expect(violation).toBe('')
    })
})

describe('max', () => {
    it('fails when max 0 given length 3', () => {
        const validator = new StringValidator()
        validator.max(0)
        const violation = validator.violation('foo')
        expect(violation).toContain('no more than')
    })

    it('passes when max 3 given undefined', () => {
        const validator = new StringValidator()
        validator.max(3)
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when max 3 given length 3', () => {
        const validator = new StringValidator()
        validator.max(3)
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })

    it('passes when max 6 given length 3', () => {
        const validator = new StringValidator()
        validator.max(6)
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })

    it('fails when max 3 given length 6', () => {
        const validator = new StringValidator()
        validator.max(3)
        const violation = validator.violation('foobar')
        expect(violation).toContain('no more than')
    })
})

describe('pattern', () => {
    it('passes when /[a-z]/ given undefined', () => {
        const validator = new StringValidator()
        validator.pattern(/[a-z]/)
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when /[a-z]/ given foo', () => {
        const validator = new StringValidator()
        validator.pattern(/[a-z]/)
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })

    it('fails when /[a-z]/ given 123', () => {
        const validator = new StringValidator()
        validator.pattern(/[a-z]/)
        const violation = validator.violation('123')
        expect(violation).toContain('Invalid format')
    })

    it('passes when /[a-z]/ given empty string', () => {
        const validator = new StringValidator()
        validator.pattern(/[a-z]/)
        const violation = validator.violation('')
        expect(violation).toBe('')
    })
})

describe('in', () => {
    it('passes when [foo, bar] given undefined', () => {
        const validator = new StringValidator()
        validator.in(['foo', 'bar'])
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when [foo, bar] given foo', () => {
        const validator = new StringValidator()
        validator.in(['foo', 'bar'])
        const violation = validator.violation('foo')
        expect(violation).toBe('')
    })

    it('fails when [foo, bar] given baz', () => {
        const validator = new StringValidator()
        validator.in(['foo', 'bar'])
        const violation = validator.violation('baz')
        expect(violation).toContain('or')
    })
})

describe('custom', () => {
    const customErrMsg = 'foo not allowed'
    const customValidator = (s: string | undefined) => {
        if (s === 'foo') return customErrMsg
        return ''
    }

    it('passes when custom given undefined', () => {
        const validator = new StringValidator()
        validator.custom(customValidator)
        const violation = validator.violation(undefined)
        expect(violation).toBe('')
    })

    it('passes when custom given valid', () => {
        const validator = new StringValidator()
        validator.custom(customValidator)
        const violation = validator.violation('bar')
        expect(violation).toBe('')
    })

    it('fails when custom given invalid', () => {
        const validator = new StringValidator()
        validator.custom(customValidator)
        const violation = validator.violation('foo')
        expect(violation).toBe(customErrMsg)
    })
})