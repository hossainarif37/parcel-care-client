import { useForm } from "react-hook-form";
import Button from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import InputWithLabel from "../../components/Inputs/InputWithLabel";

interface IFormInput {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const handleRegister = (data: IFormInput) => {
        console.log(data);
    }
    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
        >
            {/*//* Title */}
            {/* <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-700 text-center">Register</h1> */}

            <div className="flex flex-col gap-y-7 mb-5">

                {/*//* Name */}
                <div>
                    <InputWithLabel
                        label='Name'
                        type='name'
                        id='name'
                        register={{
                            ...register('name', {
                                required: 'Name is required',
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
                    {/*//! error */}
                    <p className="error">{errors?.name?.message}</p>
                </div>

                {/*//* Email */}
                <div>
                    <InputWithLabel
                        label='Email'
                        type='email'
                        id='email'
                        register={{
                            ...register('email', {
                                required: 'Email is required', pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Provide a valid email'
                                }
                            })
                        }}
                    />
                    {/*//! error */}
                    <p className="error">{errors?.email?.message}</p>
                </div>

                {/*//* Password */}
                <div>
                    <InputWithLabel
                        label='Password'
                        type='password'
                        id='password'
                        register={{
                            ...register('password', {
                                required: 'Password is required', minLength: {
                                    value: 6,
                                    message: 'Provide minimum 6 characters longer'
                                }
                            })
                        }}
                    />
                    {/*//! error */}
                    <p className="error">{errors?.password?.message}</p>
                </div>

                {/* //*Submit Button */}
                <Button
                    type="submit"
                >
                    Register
                </Button>

            </div>

            {/*//* Navigate to Register page */}
            <p className="text-center">
                <span>Already have an account? <Link
                    to="/login"
                    className="text-primary underline">Login
                </Link></span>
            </p>

        </form>
    );
};

export default Register;