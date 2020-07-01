import { ValidatorFunc } from './Valid'
import { Moment } from 'moment'


export default class MomentValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<Moment | undefined>[]

    required(message = 'Required'): this {
        const rule = (v: Moment | undefined) => v && v.isValid() ? '' : message
        this.rules.unshift(rule)
        return this
    }

    min(min: Moment, message = `Must not be before ${min.format('MM/DD/YYYY')}`): this {
        const rule = (v: Moment | undefined) => {
            if (!v) return ''
            if (!v.isBefore(min)) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    max(max: Moment, message = `Must not be after ${max.format('MM/DD/YYYY')}`): this {
        const rule = (v: Moment | undefined) => {
            if (!v) return ''
            if (!v.isAfter(max)) return ''
            return message
        }
        this.rules.unshift(rule)
        return this
    }

    custom(validator: ValidatorFunc<Moment | undefined>): this {
        this.rules.unshift(validator)
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
