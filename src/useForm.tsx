import { useEffect, useState, useCallback } from 'react'

interface Field {
    validate: () => void
    isValid: boolean
    violation: string
}

interface Form {
    isValid: boolean
    hasActiveViolations: boolean
    validate: () => void
}

export default function useForm(...fields: Field[]): Form {
    const [isValid, setIsValid] = useState(false)
    const [hasActiveViolations, setHasActiveViolations] = useState(false)

    useEffect(() => {
        for (let i = fields.length - 1; i >= 0; i--) {
            if (!fields[i].isValid) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [fields])

    useEffect(() => {
        for (let i = fields.length - 1; i >= 0; i--) {
            if (fields[i].violation) {
                setHasActiveViolations(true)
                return
            }
        }
        setHasActiveViolations(false)
    }, [fields])

    const validate = useCallback(() => {
        for (let i = fields.length - 1; i >= 0; i--) {
            fields[i].validate()
        }
    }, [fields])

    return { isValid, hasActiveViolations, validate }
}
