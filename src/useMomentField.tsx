import useField, { UseFieldArgs, Field } from './useField'
import moment, { Moment } from 'moment'

export type MomentField = Field<Moment, HTMLInputElement>

const event2value = (e: React.ChangeEvent<HTMLInputElement>) => moment(e.target.value)

export default function useMomentField(args: UseFieldArgs<Moment>) {
    return useField(args, event2value)
}
