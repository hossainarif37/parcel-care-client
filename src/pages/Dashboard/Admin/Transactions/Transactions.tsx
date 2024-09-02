import Loading from "@/components/Loading";
import NotFoundData from "@/components/NotFoundData";
import { useGetAllTransactionsQuery } from "@/redux/api/endpoints/transactionApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITransaction } from "@/types/types";
import { formateDate } from "@/lib/utils";

const Transactions = () => {
    const { data, isLoading } = useGetAllTransactionsQuery(undefined);

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <NotFoundData>Transaction not found</NotFoundData>
    }

    return (
        <div>
            <div className="min-h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-100 mb-5">Transactions</h1>
                <Table className="">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>TrxID</TableHead>
                            <TableHead>Parcel ID</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.transactions?.map((transaction: ITransaction) => (
                            <TableRow key={transaction._id} className="text-black-50">
                                <TableCell className="font-medium">{transaction.transactionId}</TableCell>
                                <TableCell className="font-medium">{transaction.parcel}</TableCell>
                                <TableCell className="font-medium">{transaction.paymentMethod}</TableCell>
                                <TableCell className="font-medium">{transaction.amount}</TableCell>
                                <TableCell className="font-medium">{formateDate(transaction.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Transactions;