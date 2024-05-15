import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputWithLabelPropsTypes {
    label: string;
    type: string;
    register: UseFormRegisterReturn
    id: string;
}

const InputWithLabel = ({ label, type, register, id }: InputWithLabelPropsTypes) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);

    return (
        <div className="relative">

            {/*//* Input */}
            <input
                id={id}
                {...register}
                type={eyeToggle ? 'text' : type}
                className={`input ${inputFocus ? 'border-primary' : 'border-gray-400'} `}
                onFocus={() => setInputFocus(true)}
                onBlur={(e) => {
                    if (e.target.value) {
                        return;
                    }
                    setInputFocus(false);
                }}
            />

            {/*//* Label */}
            <label
                htmlFor={id}
                onClick={() => setInputFocus(true)}
                className={`bg-white px-2 cursor-text text-center absolute left-2 duration-200 transform
                ${inputFocus ? ' -translate-y-1/2 scale-90 text-primary' : 'translate-y-1/2 text-gray-600'} rounded-lg`
                }
            >
                {label}
            </label>

            {/*//* Password Show Eye Button */}
            {
                type === 'password' &&
                <span
                    onClick={() => setEyeToggle(eyeToggle ? false : true)}
                    className="absolute top-2 right-3 p-2 cursor-pointer select-none hover:bg-gray-100 rounded-full"
                >
                    {eyeToggle ? <Icon icon="fa6-solid:eye" /> : <Icon icon="fa-solid:eye-slash" />}
                </span>
            }
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default InputWithLabel;