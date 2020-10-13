import { ValidatorFunc, formatChoices } from './Valid'

export default class StringValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<string>[]

    required(message = 'Required'): this {
        const rule = (v: string) => v ? '' : message
        this.rules.unshift(rule)
        return this
    }

    min(min: number, message = `Must be at least ${min} character${min !== 1 ? 's' : ''}`): this {
        const rule = (v: string) => {
            if (v.length >= min) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    max(max: number, message = `Must be no more than ${max} character${max !== 1 ? 's' : ''}`): this {
        const rule = (v: string) => {
            if (!v) return ''
            if (v.length <= max) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    pattern(pattern: RegExp, message = 'Invalid format'): this {
        const rule = (v: string) => {
            if (!v) return ''
            if (pattern.test(v)) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    in(choices: string[], message = `Must be ${formatChoices(choices)}`): this {
        const rule = (v: string) => {
            if (!v) return ''
            if (choices.includes(v)) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    custom(validator: ValidatorFunc<string>): this {
        this.rules.unshift(validator)
        return this
    }

    violation(value: string): string {
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const violation = this.rules[i](value)
            if (violation) {
                return violation
            }
        }
        return ''
    }
}
