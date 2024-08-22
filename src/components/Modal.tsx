import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputWithLabel from "./Inputs/InputWithLabel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectLabel } from "@radix-ui/react-select";

type TModalProps = {
    assigningAgentRole: string;
    fullAddress: string;
    subDistrict: string;
    district: string;
}

export function Modal({ ...props }: TModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(true);

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
            <DialogContent className="w-full md:max-w-[450px]">

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

                        {/* Assign to Agent */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor={'assign-to-agent'}
                            >
                                {'Assign to Agent'}
                            </label>
                            <Select>
                                <SelectTrigger className="w-full py-6">
                                    <SelectValue placeholder={`Select Agent for ${props.assigningAgentRole}`} />
                                </SelectTrigger>
                                <SelectContent className="">
                                    <SelectItem
                                        className="py-3 cursor-pointer"
                                        value={'Arif'}>
                                        Arif
                                    </SelectItem>
                                    <SelectItem
                                        className="py-3 cursor-pointer"
                                        value={'Hridoy'}>
                                        Hridoy
                                    </SelectItem>
                                    <SelectItem
                                        className="py-3 cursor-pointer"
                                        value={'Turan'}>
                                        Turan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </div>


                <button className="btn btn-primary mt-2" onClick={() => setIsModalOpen(false)} type="button">Save changes</button>
            </DialogContent>
        </Dialog>
    )
}
