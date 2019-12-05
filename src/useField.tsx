import { useState, useEffect, useCallback } from 'react'

interface Handlers<ElementType> {
    onChange: (e: React.ChangeEvent<ElementType>) => void
    onBlur: (e?: React.FocusEvent<ElementType>) => void
    onFocus: (e?: React.FocusEvent<ElementType>) => void
}

type Trigger = 'change' | 'blur' | 'blurchange'

export interface UseFieldArgs<ValueType> {
    initialValue?: ValueType
    validator: Validator<ValueType>
    trigger?: Trigger
}

export interface Field<ValueType, ElementType> {
    value?: ValueType
    setValue: (value: ValueType) => void
    violation: string
    handlers: Handlers<ElementType>
    validate: () => void
    isValid: boolean
}

interface Validator<T> {
    violation: (value?: T) => string
}

type EventToValueFunc<E, V> = (e: React.ChangeEvent<E>) => V

export default function useField<ValueType, ElementType>(args: UseFieldArgs<ValueType>, event2Value: EventToValueFunc<ElementType, ValueType>): Field<ValueType, ElementType> {
    const [value, setValue] = useState(args.initialValue)
    const [violation, setViolation] = useState('')
    const [shouldValidate, setShouldValidate] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [hasBlured, setHasBlured] = useState(false)

    const onChange = useCallback((e: React.ChangeEvent<ElementType>) => {
        if (args.trigger === 'change') {
            setShouldValidate(true)
        } else if (hasBlured && args.trigger === 'blurchange') {
            setShouldValidate(true)
        }
        const val = event2Value(e)
        setValue(val)
        setIsValid(args.validator.violation(val) === '')
    }, [args.trigger, hasBlured, args.validator, event2Value])

    const onBlur = useCallback(() => {
        if (args.trigger && ['blur', 'blurchange'].includes(args.trigger)) {
            setShouldValidate(true)
        }
        setHasBlured(true)
    }, [args.trigger])

    const onFocus = useCallback(() => {
        if (['blur', undefined].includes(args.trigger)) {
            setViolation('')
            setShouldValidate(false)
        }
    }, [args.trigger])

    useEffect(() => {
        if (shouldValidate) {
            setViolation(args.validator.violation(value))
        }
    }, [value, args.validator, shouldValidate])

    const validate = useCallback(() => {
        setShouldValidate(true)
    }, [])

    return {
        value,
        setValue,
        violation,
        handlers: { onChange, onBlur, onFocus },
        validate,
        isValid,
    }
}
