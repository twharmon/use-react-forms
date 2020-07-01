import BooleanValidator from './BooleanValidator'

describe('is', () => {
    it('passes when is false given false', () => {
        const validator = new BooleanValidator()
        validator.is(false)
        const violation = validator.violation(false)
        expect(violation).toBe('')
    })

    it('passes when is true given true', () => {
        const validator = new BooleanValidator()
        validator.is(true)
        const violation = validator.violation(true)
        expect(violation).toBe('')
    })

    it('fails when is true given false', () => {
        const validator = new BooleanValidator()
        validator.is(true)
        const violation = validator.violation(false)
        expect(violation).toContain('Must be')
    })

    it('failes when is false given true', () => {
        const validator = new BooleanValidator()
        validator.is(false)
        const violation = validator.violation(true)
        expect(violation).toContain('Must be')
    })
})