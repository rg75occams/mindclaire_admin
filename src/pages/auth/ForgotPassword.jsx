import { Form, Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import * as Yup from 'yup';

const ForgotPassword = () => {
    // const dispatch = useDispatch();
    // const [createUpdateEndPoint, { isLoading }] = useCreateUpdateEndPointMutation();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email-Id is Required"),
        password: Yup.string().min(6, "Password Must Be At Least 6 Characters").required("Password is Required"),
    });

    const handleLogin = (values) => {
        console.log('Form Data:', values);
    };

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
                    Forgot Password
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

                            <button type="submit" className={`!mt-4 w-full inline-flex bg-[#3C0A6D] items-center
                                inter_medium justify-center !rounded-md px-4 py-2.5 !text-white`}
                            >
                                Send OTP
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword