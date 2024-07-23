import { useForm } from "react-hook-form";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";
import { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../../../redux/api/endpoints/authApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

type IFormInput = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const UpdatePasswordArea = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [updatePassword, { error, isLoading }] = useUpdatePasswordMutation();
    const handleUpdatePassword = (data: IFormInput) => {
        const { currentPassword, newPassword, confirmPassword } = data;
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Password is not matched with New Password!')
            return;
        }
        setConfirmPasswordError('');
        const updatePassResponse = updatePassword({ currentPassword, newPassword }).unwrap();
        toast.promise(updatePassResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                reset();
                return message;
            },
            error: ({ data }) => {
                return data?.message || 'Something went wrong!';
            },
        });
    }



    return (
        <form onSubmit={handleSubmit(handleUpdatePassword)} className="max-w-4xl mx-auto border py-10 px-5 md:px-20" >
            <h1 className="text-2xl font-bold mb-5 text-black-50">Update Password</h1>

            {/* Input Fields */}
            <div className="flex flex-col gap-y-6">
                {/* Current Password */}
                <InputWithLabel
                    type="text"
                    id="current-password"
                    label="Current Password"
                    placeholder="current password"
                    register={{
                        ...register('currentPassword', {
                            required: 'Current Password is required', minLength: {
                                value: 6,
                                message: 'Provide minimum 6 characters longer'
                            }
                        })
                    }}
                />

                {/* New Password */}
                <InputWithLabel
                    type="text"
                    id="new-password"
                    label="New Password"
                    placeholder="new password"
                    register={{
                        ...register('newPassword', {
                            required: 'New Password is required', minLength: {
                                value: 6,
                                message: 'Provide minimum 6 characters longer'
                            }
                        })
                    }}
                />

                {/* Confirm Password */}
                <InputWithLabel
                    type="text"
                    id="confirm-password"
                    label="Confirm Password"
                    placeholder="confirm password"
                    register={{
                        ...register('confirmPassword', {
                            required: 'Confirm Password is required', minLength: {
                                value: 6,
                                message: 'Provide minimum 6 characters longer'
                            }
                        })
                    }}
                />

            </div>
            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? 'btn-disabled' : 'btn-primary'} w-full mt-5 text-white font-semibold py-3 px-10 rounded-md ml-auto`}
            >

                Update Password
                {/* <Icon
                    className={`animate-spin ${textColor} ${textSize}`}
                    icon="ant-design:loading-3-quarters-outlined"
                /> */}
            </button>

        </form>
    );
};

export default UpdatePasswordArea;