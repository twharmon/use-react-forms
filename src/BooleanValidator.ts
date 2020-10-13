import { ValidatorFunc } from './Valid'


export default class BooleanValidator {
    constructor() {
        this.rules = []
    }

    rules: ValidatorFunc<boolean>[]

    is(val: boolean, message = `Must be ${val}`): this {
        this.rules = [(v: boolean) => v === val ? '' : message].concat(this.rules)
        return this
    }

    violation(value: boolean): string {
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const violation = this.rules[i](value)
            if (violation) {
                return violation
            }
        }
        return ''
    }
}
