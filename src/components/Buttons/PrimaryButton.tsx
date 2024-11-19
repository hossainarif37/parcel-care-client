import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

const PrimaryButton = ({ children,className, ...props }: PrimaryButtonProps) => {
    return (
        <button
            {...props}
            className={cn(`text-white gradient border-0 rounded-lg focus:outline-none transition duration-150 ease-in-out active:scale-90 py-2 lg:py-3 xl:py-4 px-6 lg:px-10 xl:px-14 flex justify-center gap-x-2`, className)}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;