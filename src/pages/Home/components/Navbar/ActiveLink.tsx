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
                className={`${pathname === path && 'rounded font-bold py-2 block w-full'}`} to={path}>
                {title}
            </Link>
        </li>
    );
};

export default ActiveLink;