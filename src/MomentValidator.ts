import { ValidatorFunc } from './Valid'
import { Moment } from 'moment'


export default class MomentValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<Moment | undefined>[]

    required(message = 'Required'): this {
        this.rules = [(v: Moment | undefined) => v && v.isValid() ? '' : message].concat(this.rules)
        return this
    }

    min(min: Moment, message = `Must not be before ${min.format('MM/DD/YYYY')}`): this {
        this.rules = [(v: Moment | undefined) => v && !v.isBefore(min) ? '' : message].concat(this.rules)
        return this
    }

    max(max: Moment, message = `Must not be after ${max.format('MM/DD/YYYY')}`): this {
        this.rules = [(v: Moment | undefined) => v && !v.isAfter(max) ? '' : message].concat(this.rules)
        return this
    }

    custom(validator: ValidatorFunc<Moment | undefined>): this {
        this.rules = [validator].concat(this.rules)
        return this
    }

    violation(value: Moment | undefined): string {
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const violation = this.rules[i](value)
            if (violation) {
                return violation
            }
        }
        return ''
    }
}
