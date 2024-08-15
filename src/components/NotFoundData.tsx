
const NotFoundData = ({ children }: { children: string }) => {
    return (
        <div className="flex justify-center py-20">
            <h1 className="text-4xl font-semibold text-black-100">{children}</h1>
        </div>
    );
};

export default NotFoundData;