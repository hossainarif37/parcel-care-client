import Loading from "@/components/Loading";
import NotFoundData from "@/components/NotFoundData";
import { useGetAllTransactionsQuery } from "@/redux/api/endpoints/transactionApi";

const Transactions = () => {
    const { data, isLoading, error } = useGetAllTransactionsQuery(undefined);

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <NotFoundData>Transaction not found</NotFoundData>
    }

    console.log(data);
    console.log(error);
    return (
        <div>
            Transactions
        </div>
    );
};

export default Transactions;