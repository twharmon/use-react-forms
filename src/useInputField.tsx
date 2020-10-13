import useField, { UseFieldArgs, Field } from './useField'

export type InputField = Field<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const event2value = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => e.target.value

export default function useInputField(args: UseFieldArgs<string>) {
    return useField(args, event2value)
}
