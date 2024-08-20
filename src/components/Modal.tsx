import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

export function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild className="w-full text-left">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative cursor-pointer flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">Assign to Agent</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                Assign to Agent
                <button onClick={() => setIsOpen(false)} type="submit">Save changes</button>
            </DialogContent>
        </Dialog>
    )
}
