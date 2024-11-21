
const NotFoundData = ({ children }: { children: string }) => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-2xl xl:text-4xl font-medium text-black-50">{children}!</h1>
        </div>
    );
};

export default NotFoundData;