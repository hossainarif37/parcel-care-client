import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    type: "submit" | "reset" | "button"; // Restrict the type to the allowed values
}

const Button = ({ children, type, ...restProps }: ButtonProps) => {
    return (
        <button
            {...restProps}
            type={type}
            className="btn-primary py-4 px-14"
        >
            {children}
        </button>
    );
};

export default Button;