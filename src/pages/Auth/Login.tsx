import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputWithLabel from "../../components/Inputs/InputWithLabel";
import Button from "../../components/Buttons/Button";
interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const handleLogin = (data: IFormInput) => {
        console.log(data);
    }
    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
        >

            <div className="flex flex-col gap-y-7 mb-5">
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
                    Login
                </Button>

            </div>
            {/*//* Navigate to Register page */}
            <p className="text-center"><span>Don't have an account? <Link
                to='/register'
                className="text-primary underline">Create an account</Link>
            </span></p>
        </form>
    );
};

export default Login;