import StringValidator from './StringValidator'
import NumberValidator from './NumberValidator'
import MomentValidator from './MomentValidator'

export type ValidatorFunc<T> = (value: T) => string

export const formatChoices = <T>(choices: T[]): string => {
    if (choices.length === 1) {
        return `${choices[0]}`
    }
    return choices.slice(0, choices.length - 1).join(', ') + ` or ${choices[choices.length - 1]}`
}

export class Valid  {
    static string() {
        return new StringValidator()
    }

    static number() {
        return new NumberValidator()
    }

    static moment() {
        return new MomentValidator()
    }
}
