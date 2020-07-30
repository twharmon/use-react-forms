import { renderHook, act } from '@testing-library/react-hooks'
import useInputField from './useInputField'
import { Valid } from './Valid'
import React from 'react'

const makeChangeEvent = (value: string): React.ChangeEvent<HTMLInputElement> => {
    return {
        target: { value },
    } as React.ChangeEvent<HTMLInputElement>
}

describe('initial values', () => {
    it('is undefined when not specified', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string(),
        }))

        const field = result.current

        expect(field.value).toBe(undefined)
    })

    it('is as specified when specified', () => {
        const initialValue = 'foo'
        const { result } = renderHook(() => useInputField({
            initialValue,
            validator: Valid.string(),
        }))

        const field = result.current

        expect(field.value).toBe(initialValue)
    })
})

describe('updates', () => {
    it('updates value on change', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string(),
        }))

        const newValue = 'foo'
        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent(newValue))
        })

        const field = result.current
        expect(field.value).toBe(newValue)
    })
})

describe('trigger: blur', () => {
    it('is not empty when invalid, not changed, and triggered', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required(),
            trigger: 'blur',
        }))

        act(() => {
            const field = result.current
            field.handlers.onBlur()
        })

        const field = result.current
        expect(field.violation).not.toBe('')
    })

    it('is empty when invalid, changed and not triggered', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blur',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
        })

        const field = result.current
        expect(field.violation).toBe('')
    })

    it('is empty when invalid, triggered, focused', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blur',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
            field.handlers.onBlur()
            field.handlers.onFocus()
        })

        const field = result.current
        expect(field.violation).toBe('')
    })
})

describe('trigger: change', () => {
    it('is not empty when invalid and triggered', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'change',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
        })

        const field = result.current
        expect(field.violation).not.toBe('')
    })

    it('is empty when invalid and not triggered', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'change',
        }))

        const field = result.current
        expect(field.violation).toBe('')
    })

    it('is empty when invalid, triggered, focused', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blur',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
            field.handlers.onBlur()
            field.handlers.onFocus()
        })

        const field = result.current
        expect(field.violation).toBe('')
    })
})

describe('trigger: blurchange', () => {
    it('is not empty when invalid and triggered', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blurchange',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
            field.handlers.onBlur()
        })

        const field = result.current
        expect(field.violation).not.toBe('')
    })

    it('is not empty when invalid, triggered, focused', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blurchange',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
            field.handlers.onBlur()
            field.handlers.onFocus()
        })

        const field = result.current
        expect(field.violation).not.toBe('')
    })

    it('is empty when invalid, triggered, changed to valid', () => {
        const { result } = renderHook(() => useInputField({
            validator: Valid.string().required().min(6),
            trigger: 'blurchange',
        }))

        act(() => {
            const field = result.current
            field.handlers.onChange(makeChangeEvent('foo'))
            field.handlers.onBlur()
            field.handlers.onChange(makeChangeEvent('foobar'))
        })

        const field = result.current
        expect(field.violation).toBe('')
    })
})
