import { ValidatorFunc, formatChoices } from './Valid'


export default class NumberValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<number | undefined>[]

    required(message = 'Required'): this {
        this.rules = [(v: number | undefined) => v !== undefined ? '' : message].concat(this.rules)
        return this
    }

    min(min: number, message = `Must be at least ${min}`): this {
        this.rules = [(v: number | undefined) => v && v >= min ? '' : message].concat(this.rules)
        return this
    }

    max(max: number, message = `Must be no more than ${max}`): this {
        this.rules = [(v: number | undefined) => v && v <= max ? '' : message].concat(this.rules)
        return this
    }

    in(choices: number[], message = `Must be ${formatChoices(choices)}`): this {
        this.rules = [(v: number | undefined) => v && choices.includes(v) ? '' : message].concat(this.rules)
        return this
    }

    custom(validator: ValidatorFunc<number | undefined>): this {
        this.rules = [validator].concat(this.rules)
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
