import { ValidatorFunc, formatChoices } from './Valid'

export default class StringValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<string | undefined>[]

    required(message = 'Required'): this {
        this.rules = [(v: string | undefined) => v ? '' : message].concat(this.rules)
        return this
    }

    min(min: number, message = `Must be at least ${min} characters`): this {
        this.rules = [(v: string | undefined) => v && v.length >= min ? '' : message].concat(this.rules)
        return this
    }

    max(max: number, message = `Must be no more than ${max} characters`): this {
        this.rules = [(v: string | undefined) => {
            if (!v) return ''
            if (v.length <= max) return ''
            return message
        }].concat(this.rules)
        return this
    }

    pattern(pattern: RegExp, message = 'Invalid format'): this {
        this.rules = [(v: string | undefined) => v && pattern.test(v) ? '' : message].concat(this.rules)
        return this
    }

    in(choices: string[], message = `Must be ${formatChoices(choices)}`): this {
        this.rules = [(v: string | undefined) => v && choices.includes(v) ? '' : message].concat(this.rules)
        return this
    }

    custom(validator: ValidatorFunc<string | undefined>): this {
        this.rules = [validator].concat(this.rules)
        return this
    }

    violation(value: string | undefined): string {
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const violation = this.rules[i](value)
            if (violation) {
                return violation
            }
        }
        return ''
    }
}
