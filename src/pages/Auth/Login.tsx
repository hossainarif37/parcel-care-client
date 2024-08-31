import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { useLoginMutation } from "../../redux/api/endpoints/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user/userSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Input from "../../components/Inputs/Input";
import { useForm } from "react-hook-form";
interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogin = (data: IFormInput) => {
        const loginResponse = login({ email: data.email, password: data.password }).unwrap();

        toast.promise(loginResponse, {
            loading: 'Loading',
            success: ({ user, message, token }) => {
                dispatch(setUser({ user: user, isAuthenticated: true }));
                Cookies.set('authToken', token, { expires: 30 });
                navigate('/');
                return message;
            },
            error: ({ data }) => {
                return data?.message || 'Login failed';
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-y-7 mb-5">
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
                    disabled={isLoading}
                    type="submit"
                    styles="btn-primary"
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