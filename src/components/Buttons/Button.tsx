import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    styles: 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-delete';
    type: "submit" | "reset" | "button";
    width?: 'w-full',
    disabled?: boolean
}

const Button = ({ children, styles, width, type, ...restProps }: ButtonProps) => {
    return (
        <button
            {...restProps}
            type={type}
            className={`${styles} ${width ? width : ''} py-4 px-14 flex justify-center gap-x-2`}
        >
            {children}
        </button>
    );
};

export default Button;