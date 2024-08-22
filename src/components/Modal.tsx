import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputWithLabel from "./Inputs/InputWithLabel";

type TModalProps = {
    assigningAgentRole: string;
    fullAddress: string;
    subDistrict: string;
    district: string;
}

export function Modal({ ...props }: TModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isModalOpen}>
            <DialogTrigger asChild className="w-full">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative flex w-full  select-none items-center rounded-sm py-2 cursor-pointer pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                    <span className="absolute left-3  text-black-100"><Icon icon="solar:alt-arrow-down-line-duotone" /></span>
                    <span>Assign to {props.assigningAgentRole} Agent</span>
                </button>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[425px]">

                <div>
                    <h1 className="text-xl text-center mb-5 font-bold text-black-100">Assigning to {props.assigningAgentRole} Agent</h1>
                    <div className="space-y-5">
                        {/* Assigning Agent Role */}
                        <InputWithLabel
                            type=""
                            id="assigning-role-for-agent"
                            label="Assigning Agent Role"
                            placeholder=""
                            value={props.assigningAgentRole}
                            isDisabled={true}
                        />

                        {/* Full Address */}
                        <InputWithLabel
                            type=""
                            id="sender-full-address"
                            label="Sender Full Address"
                            placeholder=""
                            value={props.fullAddress}
                            isDisabled={true}
                        />

                        {/* Sub-District*/}
                        <InputWithLabel
                            type=""
                            id="sender-sub-district"
                            label="Sender Sub-District"
                            placeholder=""
                            value={props.subDistrict}
                            isDisabled={true}
                        />

                        {/* Sub-District*/}
                        <InputWithLabel
                            type=""
                            id="sender-district"
                            label="Sender District"
                            placeholder=""
                            value={props.district}
                            isDisabled={true}
                        />
                    </div>

                </div>


                <button className="btn btn-primary mt-2" onClick={() => setIsModalOpen(false)} type="button">Save changes</button>
            </DialogContent>
        </Dialog>
    )
}
