import { ChildrenType } from "../../types/types";

const Button = ({ children }: ChildrenType) => {
    return (
        <button className="btn-primary py-4 px-14">
            {children}
        </button>
    );
};

export default Button;