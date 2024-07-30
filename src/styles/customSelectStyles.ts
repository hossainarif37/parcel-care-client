import { StylesConfig } from "react-select";
import { SelectOptionType } from "../types/types";

// Custom styles for react-select
export const customSelectStyles: StylesConfig<SelectOptionType> = {
    control: (provided, state) => ({
        ...provided,
        padding: "3.5px", // Add padding
        outline: state.isFocused ? "1px solid #7D82FF" : "none", // Add outline color on focus
        borderColor: state.isFocused ? "#7D82FF" : '#ddd', // Change border color on focus
        "&:hover": {
            borderColor: state.isFocused ? "#7D82FF" : '#ddd',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#9FA9B4", // Change placeholder color
    })
};