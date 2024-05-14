import { Icon } from "@iconify/react/dist/iconify.js";

type LoadingPropsType = {
    paddingY: string; // Example: 'py-2'
    textSize?: string; // Example: 'text-lg'
    textColor?: string; // Example: 'text-blue-500'
}

const Loading = ({ paddingY, textColor, textSize }: LoadingPropsType) => {
    return (
        <div className={`flex justify-center ${paddingY}`}>
            <Icon
                className={`animate-spin ${textColor} ${textSize}`}
                icon="ant-design:loading-3-quarters-outlined"
            />
        </div>
    );
};

export default Loading;