import StringValidator from './StringValidator'
import NumberValidator from './NumberValidator'
import BooleanValidator from './BooleanValidator'
import MomentValidator from './MomentValidator'

export type ValidatorFunc<T> = (value: T) => string

export const formatChoices = <T>(choices: T[]): string => {
    if (choices.length === 1) {
        return `${choices[0]}`
    }
    return choices.slice(0, choices.length - 1).join(', ') + ` or ${choices[choices.length - 1]}`
}

export const Valid = {
    string() {
        return new StringValidator()
    },
    number() {
        return new NumberValidator()
    },
    boolean() {
        return new BooleanValidator()
    },
    moment() {
        return new MomentValidator()
    },
}