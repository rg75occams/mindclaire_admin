import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react'
import CustomInput from '../../components/CustomInput';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
    // const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    // const [createUpdateEndPoint, { isLoading }] = useCreateUpdateEndPointMutation();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email-Id is Required"),
        password: Yup.string().min(6, "Password Must Be At Least 6 Characters").required("Password is Required"),
    });

    const handleLogin = (values) => {
        console.log('Form Data:', values);
    };

    const handleClickShowPassword = useCallback(
        () => setShowPassword((show) => !show), [showPassword]
    );

    // const handleLogin = async (values) => {
    //   const url = "admin/admin_login";
    //   const body = {
    //     username: values.email,
    //     password: values.password,
    //   };

    //   try {
    //     const res = await createUpdateEndPoint({ url, data: body }).unwrap();
    //     if (res.status) {
    //       localStorage.setItem(CONSTANTS.tokenLocalStorage, res?.token);
    //       dispatch(signin(res?.data));
    //       toast.success(res.message);
    //       // optional: redirect to dashboard after successful login
    //       // navigate("/dashboard", { replace: true });
    //     }
    //   } catch (error) {
    //     // ensure readable error
    //     const msg = typeof error === "string" ? error : (error?.data?.message || "Login failed");
    //     toast.error(msg);
    //   }
    // };

    // const handleLogin = async (values) => {
    //   const url = "admin/admin_login";
    //   const body = {
    //     username: values.email,
    //     password: values.password,
    //   };

    //   try {
    //     const res = await createUpdateEndPoint({ url, data: body }).unwrap();
    //     if (res.status) {
    //       localStorage.setItem(CONSTANTS.tokenLocalStorage, res?.token);
    //       dispatch(signin(res?.data));
    //       toast.success(res.message);
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //   }
    // };

    return (
        <div className="h-screen flex justify-center items-center bg-[#d0a4ff]">
            <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[35%] max-w-[640px] rounded-xl bg-white shadow-md p-8">
                <div className="justify-center flex items-center">
                    <img loading="lazy" src="/assets/logo.svg" alt="Logo" className="md:h-[50px] h-11" />
                </div>

                <h1 className="text-center !text-2xl inter_semibold text-black !mt-5">
                    Login to Account
                </h1>

                <p className="text-center !text-lg inter_medium !mt-1">
                    Please enter your email and password to continue
                </p>

                <Formik initialValues={{ email: "", password: "" }}
                    onSubmit={handleLogin} validationSchema={loginSchema}
                >
                    {(props) => (
                        <Form className="mt-5" onSubmit={props.handleSubmit}>
                            <div className="mt-4">
                                <CustomInput required label="Email-Id" name="email" placeholder="Enter Your Email-Id"
                                    autoComplete="email"
                                />
                            </div>

                            <div className="mt-4">
                                <CustomInput required name="password" label="Password" autoComplete="password"
                                    placeholder="Enter Your Password" type={showPassword ? "text" : "password"}
                                    rightElement={
                                        <button type="button" onClick={handleClickShowPassword} className="p-1.5"
                                            title={showPassword ? "Hide Password" : "Show Password"}
                                        >
                                            {showPassword ? (
                                                <MdVisibility className="w-5 h-5 text-[#4A5A6B]" />
                                            ) : (
                                                <MdVisibilityOff className="w-5 h-5 text-[#4A5A6B]" />
                                            )}
                                        </button>
                                    }
                                />
                            </div>

                            <div className="flex justify-end">
                                <Link to="/forgot-password" className="!text-base inter_medium !text-[#3C0A6D] mt-3">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className={`!mt-3 w-full inline-flex bg-[#3C0A6D] items-center
                                inter_medium justify-center !rounded-md px-4 py-2.5 !text-white`}
                            >
                                Sign in
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login