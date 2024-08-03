import { SelectOptionType } from "../types/types";
import { SingleValue } from 'react-select';

export const getValidDistrictSelection = (
    selectedDistrict: SingleValue<SelectOptionType>,
    defaultDistrict: SelectOptionType
): SelectOptionType => {
    if (!selectedDistrict) {
        return defaultDistrict;
    }
    return {
        value: selectedDistrict.value ?? '',
        label: selectedDistrict.label ?? '',
    };
};

export const getValidSubDistrictSelection = (
    selectedSubDistrict: SingleValue<SelectOptionType>,
    defaultSubDistrict: SelectOptionType
): SelectOptionType => {
    if (!selectedSubDistrict) {
        return defaultSubDistrict;
    }

    return {
        value: selectedSubDistrict.value ?? '',
        label: selectedSubDistrict.label ?? '',
    };
};