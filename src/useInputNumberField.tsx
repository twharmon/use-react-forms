import useField, { UseFieldArgs, Field } from './useField'

export type InputNumberField = Field<number | undefined, HTMLInputElement | HTMLSelectElement>

const event2value = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => parseFloat(e.target.value)

export default function useInputNumberField(args: UseFieldArgs<number | undefined>) {
    return useField(args, event2value)
}
