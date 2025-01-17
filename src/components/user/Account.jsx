import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileAPIMutation } from "../../store/user/userApiSlice";
import { updateUserProfile } from "../../store/user/authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// Form validation schema
const userSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(15, "First Name must not exceed 15 characters"),
  lastname: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(15, "Last Name must not exceed 15 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

const Account = () => {
  const dispatch = useDispatch();
  const [updateUserProfileAPI, { isLoading }] =
    useUpdateUserProfileAPIMutation();

  const { userData } = useSelector((state) => state.auth);

  // State for form values with localStorage persistence
  const [initialValues, setInitialValues] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedData || {
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
      }
    );
  });

  // Save the updated values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(initialValues));
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await updateUserProfileAPI({
        firstname: values.firstname,
        lastname: values.lastname,
      });

      // Update Redux store
      dispatch(
        updateUserProfile({
          firstname: values.firstname,
          lastname: values.lastname,
        })
      );

      // Update local state
      setInitialValues(values);

      // Show success message
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };
  // const handleSubmit = async (values) => {
  //   console.log("Submitting values:", values);
  //   try {
  //     const response = await updateUserProfileAPI({
  //       firstname: values.firstname,
  //       lastname: values.lastname,
  //     }).unwrap();
  //     console.log("API Response:", response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Allow reinitialization when `initialValues` changes
      >
        {() => (
          <Form>
            <section>
              <div className="max-w-2xl">
                <h3 className="mt-4 mb-4">Personal Info</h3>
                <div className="mb-8">
                  <label className="text-white text-xs mb-3">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    disabled={true}
                    placeholder="Email Address"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="text-white text-xs mb-3">First Name</label>
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="firstname"
                    component="div"
                  />
                </div>
                <div className="mb-8">
                  <label className="text-white text-xs mb-3">Last Name</label>

                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />

                  <ErrorMessage
                    className="err_msg"
                    name="lastname"
                    component="div"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`py-2 px-4 btnPurpleColor ${
                      isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Account;
