import { UseFormRegisterReturn } from "react-hook-form";

type ValueType = string | number;
type DefaultValueType = string | number;

interface InputWithLabelPropsTypes {
    label: string;
    type: string;
    register?: UseFormRegisterReturn
    id: string;
    placeholder: string;
    value?: ValueType;
    defaultValue?: DefaultValueType;
}
const InputWithLabel = ({ label, type, register, id, placeholder, value, defaultValue }: InputWithLabelPropsTypes) => {

    return (
        <div className="space-y-2">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                {...register}
                type={type}
                className={"flex w-full rounded-md border border-[#ddd] focus:ring-2 focus:ring-secondary px-3 py-3 text-sm   outline-none"}
                disabled={type === 'email'}
                id={id}
                placeholder={`Enter your ${placeholder}`}
                value={value}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default InputWithLabel;