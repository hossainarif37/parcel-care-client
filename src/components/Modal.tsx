import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputWithLabel from "./Inputs/InputWithLabel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type TModalProps = {
    parcelId: string;
    assigningAgentRole: string;
    district: string;
}

export function Modal({ ...props }: TModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { parcelId, assigningAgentRole, district } = props;

    return (
        <Dialog open={isModalOpen}>
            <DialogTrigger asChild className="w-full">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative flex w-full  select-none items-center rounded-sm py-2 cursor-pointer pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                    <span className="absolute left-3  text-black-100"><Icon icon="solar:alt-arrow-down-line-duotone" /></span>
                    <span>Assign to {assigningAgentRole} Agent</span>
                </button>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[450px]">

                <div>
                    <div className="space-y-5">
                        <h1 className="text-xl text-center mb-5 font-bold text-black-100">Assigning to {assigningAgentRole} Agent</h1>
                        {/* District*/}
                        <InputWithLabel
                            type=""
                            id={`${assigningAgentRole.toLowerCase}-district`}
                            label={`${assigningAgentRole} District`}
                            placeholder=""
                            value={district}
                            isDisabled={true}
                        />

                        {/* Assigning Agent Role */}
                        <InputWithLabel
                            type=""
                            id="assigning-role-for-agent"
                            label="Assigning Agent Role"
                            placeholder=""
                            value={assigningAgentRole}
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
                                    <SelectValue placeholder={`Select Agent for ${assigningAgentRole}`} />
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
