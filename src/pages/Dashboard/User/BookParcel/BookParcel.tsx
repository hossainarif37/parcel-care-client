import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../types/types";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";

type IFormInput = {
    name: string;
}

const BookParcel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const { user } = useSelector((state: IRootState) => state.userSlice);

    const handleBookParcel = (data: IFormInput) => {
        console.log(data);
    }
    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto py-10 px-5 md:px-20 border rounded-md  mb-5">

                {/* header section */}
                <div className="mb-10">
                    <h1 className="text-2xl font-semibold text-black-50">Book a Parcel</h1>
                    <p>Fill out the form to book a parcel delivery.</p>
                </div>

                {/* form section */}
                <form onSubmit={handleSubmit(handleBookParcel)} className="flex flex-col gap-y-6">
                    <h1 className="text-xl font-semibold text-black-50">Sender Information</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <InputWithLabel
                                type="text"
                                id="name"
                                label="Name"
                                placeholder="name"
                                defaultValue={user?.name}
                                register={{
                                    ...register('name', {
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximum length 20 characters'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Minimum length 3 characters'
                                        }
                                    })
                                }}
                            />

                            {errors?.name?.message && <p className="error">{errors?.name?.message}</p>}
                        </div>

                        {/* Email */}
                        <InputWithLabel
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="email"
                            value={user?.email}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary py-3 px-10 rounded-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;