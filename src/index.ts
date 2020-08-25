import { Valid } from './Valid'
import useField, { Field as FieldType } from './useField'
import useInputField, { InputField as InputFieldType } from './useInputField'
import useInputNumberField, { InputNumberField as InputNumberFieldType } from './useInputNumberField'
import useMomentField, { MomentField as MomentFieldType } from './useMomentField'
import useCheckBoxField, { CheckBoxField as CheckBoxFieldType } from './useCheckBoxField'
import useForm from './useForm'

export {
    Valid,
    useForm,
    useField,
    useInputField,
    useInputNumberField,
    useMomentField,
    useCheckBoxField,
}

export type Field<ValueType, ElementType> = FieldType<ValueType, ElementType>
export type InputField = InputFieldType
export type InputNumberField = InputNumberFieldType
export type MomentField = MomentFieldType
export type CheckBoxField = CheckBoxFieldType

