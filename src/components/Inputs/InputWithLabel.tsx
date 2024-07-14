import { UseFormRegisterReturn } from "react-hook-form";

interface InputWithLabelPropsTypes {
    label: string;
    type: string;
    register?: UseFormRegisterReturn
    id: string;
    placeholder: string;
    value?: string
}
const InputWithLabel = ({ label, type, register, id, placeholder, value }: InputWithLabelPropsTypes) => {

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
            />
        </div>
    );
};

export default InputWithLabel;