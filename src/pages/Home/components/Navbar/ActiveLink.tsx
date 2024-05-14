import { Link, useLocation } from "react-router-dom";

type ActiveLinkProps = {
    title: string;
    path: string;
}

const ActiveLink = ({ title, path }: ActiveLinkProps) => {
    const { pathname } = useLocation();

    return (
        <li >
            <Link
                className={`${pathname === path && 'bg-gray-200 lg:bg-transparent rounded  md:font-bold py-2 block w-full'}`} to={path}>
                {title}
            </Link>
        </li>
    );
};

export default ActiveLink;