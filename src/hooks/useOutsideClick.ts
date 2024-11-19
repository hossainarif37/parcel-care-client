import { useEffect, useRef } from "react";

const useOutsideClick = ( isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    const ref = useRef<HTMLDivElement | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
           setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    return ref;
};

export default useOutsideClick;