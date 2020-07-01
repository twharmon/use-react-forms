import { ValidatorFunc, formatChoices } from './Valid'


export default class NumberValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<number | undefined>[]

    required(message = 'Required'): this {
        const rule = (v: number | undefined) => v !== undefined ? '' : message
        this.rules.unshift(rule)
        return this
    }

    min(min: number, message = `Must be at least ${min}`): this {
        const rule = (v: number | undefined) => {
            if (v === undefined) return ''
            if (v >= min) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    max(max: number, message = `Must be no more than ${max}`): this {
        const rule = (v: number | undefined) => {
            if (v === undefined) return ''
            if (v <= max) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    in(choices: number[], message = `Must be ${formatChoices(choices)}`): this {
        const rule = (v: number | undefined) => {
            if (v === undefined) return ''
            if (choices.includes(v)) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    custom(validator: ValidatorFunc<number | undefined>): this {
        this.rules.unshift(validator)
        return this
    }

    violation(value: number | undefined): string {
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const violation = this.rules[i](value)
            if (violation) {
                return violation
            }
        }
        return ''
    }
}
