import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isModalOpen}>
            <DialogTrigger asChild className="w-full">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative flex w-full  select-none items-center rounded-sm py-2 cursor-pointer pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                    <span className="absolute left-3  text-black-100"><Icon icon="solar:alt-arrow-down-line-duotone" /></span>
                    <span>Assign to Pickup Agent</span>
                </button>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[425px]">
                Assign to Agent
                <button onClick={() => setIsModalOpen(false)} type="submit">Save changes</button>
            </DialogContent>
        </Dialog>
    )
}
