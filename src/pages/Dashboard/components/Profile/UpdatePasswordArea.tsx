import { useForm } from "react-hook-form";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";

type IFormInput = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const UpdatePasswordArea = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const handleUpdatePassword = (data: IFormInput) => {
        console.log(data);
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

            <button
                type="submit"
                className="btn-primary w-full mt-5 text-white font-semibold py-3 px-10 rounded-md ml-auto"
            >
                Update Password
            </button>

        </form>
    );
};

export default UpdatePasswordArea;