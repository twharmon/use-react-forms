import useField, { UseFieldArgs, Field } from './useField'

export type CheckBoxField = Field<boolean | undefined, HTMLInputElement>

const event2value = (e: React.ChangeEvent<HTMLInputElement>) => e.target.checked

export default function useTextBoxField(args: UseFieldArgs<boolean | undefined>) {
    return useField(args, event2value)
}
