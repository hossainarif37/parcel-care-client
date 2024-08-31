import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/endpoints/authApi";
import toast from "react-hot-toast";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/user/userSlice";
import { useState } from "react";

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agentRequestStatus?: boolean
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = (data: IFormInput) => {
        const { password, confirmPassword } = data;
        if (password !== confirmPassword) {
            setConfirmPasswordError('Password is not matched with Confirm Password!')
            return;
        }
        setConfirmPasswordError('');

        let registerResponse = null;
        console.log(data);

        if (data.agentRequestStatus) {
            console.log(28);
            registerResponse = registerUser({ ...data, agentRequestStatus: 'pending', role: 'agent' }).unwrap();
        } else {
            registerResponse = registerUser({ ...data, agentRequestStatus: undefined }).unwrap();
        }

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

                {/*//* Confirm Password */}
                <div>
                    <Input
                        label='Confirm Password'
                        type='password'
                        id='confirm-password'
                        register={{
                            ...register('confirmPassword', { required: 'Confirm Password is required' })
                        }}
                    />
                    {/*//! error */}
                    <p className="error">{errors?.confirmPassword?.message}</p>
                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                </div>

                <div className="flex items-center gap-x-2">
                    <input
                        {...register('agentRequestStatus')}
                        className="w-5 h-5 cursor-pointer"
                        type="checkbox"
                        id="agentRequestStatus"
                    />
                    <label htmlFor="agentRequestStatus" className="cursor-pointer select-none">Become an Agent</label>
                </div>

                {/* //*Submit Button */}
                <Button
                    disabled={isLoading}
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