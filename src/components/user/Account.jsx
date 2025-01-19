// // User account component
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useSelector, useDispatch } from "react-redux";
// import { useUpdateUserProfileAPIMutation } from "../../store/user/userApiSlice";
// import { updateUserProfile } from "../../store/user/authSlice";
// import { toast } from "react-toastify";
// import * as Yup from "yup";

// const userSchema = Yup.object().shape({
//   first_name: Yup.string()
//     .required("First Name is required")
//     .min(3, "First Name must be at least 3 characters")
//     .max(15, "First Name must not exceed 15 characters"),
//   last_name: Yup.string()
//     .required("Last Name is required")
//     .min(3, "Last Name must be at least 3 characters")
//     .max(15, "Last Name must not exceed 15 characters"),
//   email: Yup.string().required("Email is required").email("Email is invalid"),
// });

// const Account = () => {
//   const dispatch = useDispatch();
//   const [updateUserProfileAPI, { isLoading }] =
//     useUpdateUserProfileAPIMutation();
//   const { userData } = useSelector((state) => state.auth);
//   const userProfileData = userData.profileData || {};
//   console.log(userProfileData);
//   const initialValues = {
//     first_name: userProfileData.first_name,
//     last_name: userProfileData.last_name,
//     email: userProfileData.email,
//   };
//   console.log(initialValues);

//   const handleSubmit = async (values) => {
//     try {
//       const response = await updateUserProfileAPI({
//         first_name: values.first_name,
//         last_name: values.last_name,
//       }).unwrap();
//       dispatch(
//         updateUserProfile({
//           first_name: values.first_name,
//           last_name: values.last_name,
//         })
//       );
//       toast.success(response.message);
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={userSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <section>
//               <div className="max-w-2xl">
//                 <h3 className="mt-4 mb-4">Personal Info</h3>
//                 <div className="mb-8">
//                   <label className="text-white text-xs mb-3">
//                     Email Address
//                   </label>
//                   <Field
//                     type="email"
//                     name="email"
//                     disabled={true}
//                     placeholder="Email Address"
//                     className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
//                   />
//                   <ErrorMessage
//                     className="err_msg"
//                     name="email"
//                     component="div"
//                   />
//                 </div>
//                 <div className="mb-8">
//                   <label className="text-white text-xs mb-3">First Name</label>
//                   <Field
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name"
//                     className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
//                   />
//                   <ErrorMessage
//                     className="err_msg"
//                     name="first_name"
//                     component="div"
//                   />
//                 </div>
//                 <div className="mb-8">
//                   <label className="text-white text-xs mb-3">Last Name</label>

//                   <Field
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name"
//                     className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
//                   />

//                   <ErrorMessage
//                     className="err_msg"
//                     name="last_name"
//                     component="div"
//                   />
//                 </div>

//                 <div className="d-grid gap-2">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`py-2 px-4 btnPurpleColor ${
//                       isLoading
//                         ? "bg-blue-400 cursor-not-allowed"
//                         : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
//                     }`}
//                   >
//                     Update
//                   </button>
//                 </div>
//               </div>
//             </section>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Account;
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileAPIMutation } from "../../store/user/userApiSlice";
import { updateUserProfile } from "../../store/user/authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Validation schema for user profile
const userSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(15, "First Name must not exceed 15 characters"),
  last_name: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(15, "Last Name must not exceed 15 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

const Account = () => {
  const dispatch = useDispatch();
  const [updateUserProfileAPI, { isLoading }] =
    useUpdateUserProfileAPIMutation();

  const { userData } = useSelector((state) => state.auth); // Get userData from Redux state

  // Get profileData from localStorage if available
  const storedProfileData =
    JSON.parse(localStorage.getItem("profileData")) || {};
  const profileData = userData?.profileData || storedProfileData;

  // const response = updateUserProfileAPI({
  //   first_name: values.first_name,
  //   last_name: values.last_name,
  // }).unwrap();

  // console.log(response);

  // Initialize form values
  const initialValues = {
    first_name: profileData?.first_name || "",
    last_name: profileData?.last_name || "",
    email: profileData?.email || "",
  };
  // console.log(initialValues);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Call the API to update user profile
      const response = await updateUserProfileAPI({
        first_name: values.first_name,
        last_name: values.last_name,
      }).unwrap();
      // console.log(response);

      // Update Redux store with new profile data
      dispatch(updateUserProfile(values));

      // Persist updated profile data to localStorage
      localStorage.setItem("profileData", JSON.stringify(values));

      // Show success message
      toast.success(response.message);
    } catch (error) {
      // Show error message
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <section>
              <div className="max-w-2xl">
                <h3 className="mt-4 mb-4">Personal Info</h3>

                {/* Email Address (Disabled) */}
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

                {/* First Name */}
                <div className="mb-8">
                  <label className="text-white text-xs mb-3">First Name</label>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="first_name"
                    component="div"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-8">
                  <label className="text-white text-xs mb-3">Last Name</label>
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="last_name"
                    component="div"
                  />
                </div>

                {/* Submit Button */}
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
