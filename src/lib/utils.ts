import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IParcel, SelectOptionType } from "../types/types";
import { SingleValue } from 'react-select';
import { trackingData } from "@/constants/trackingData";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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


export const formateDate = (date: Date, isFullMonth = false) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    month: isFullMonth ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return formattedDate;
};

export const filteredTrackingData = (parcelData: IParcel) => {
  const trackingArr = [];
  for (const item of trackingData) {
    if (item.title === parcelData?.shipmentStatusHistory[item.id]?.status) {
      trackingArr.push({ ...item, updatedAt: parcelData?.shipmentStatusHistory[item.id].updatedAt });
    }
  }
  return trackingArr;
}