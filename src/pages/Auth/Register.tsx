import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/endpoints/authApi";
import toast from "react-hot-toast";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/user/userSlice";

interface IFormInput {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [registerUser] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = (data: IFormInput) => {
        const registerResponse = registerUser(data).unwrap();

        toast.promise(registerResponse, {
            loading: 'Loading',
            success: ({ user, message, token }) => {
                dispatch(setUser({ user: user, isAuthenticated: true }));
                Cookies.set('authToken', token, { expires: 30 });
                navigate('/');
                return message;
            },
            error: ({ data }) => {
                return data?.message || 'Registration failed';
            },
        });

    }
    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
        >
            <div className="flex flex-col gap-y-7 mb-5">

                {/*//* Name */}
                <div>
                    <Input
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
                    <Input
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
                    <Input
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
                    styles="btn-primary"
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