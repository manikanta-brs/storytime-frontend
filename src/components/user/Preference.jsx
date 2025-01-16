import { Formik, Form } from "formik";

const languages = [
  { _id: 1, code: "ta", name: "Tamil" },
  { _id: 2, code: "en", name: "English" },
  { _id: 3, code: "hi", name: "Hindi" },
  { _id: 4, code: "fr", name: "French" },
  { _id: 5, code: "te", name: "Telugu" },
];

const Preference = () => {
  // Define initial form values
  const initialValues = {
    language: "", // You can set the default selected language
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <h3 className="text-2xl text-white font-semibold tracking-tight">
          Languages
        </h3>
        <div className="grid grid-cols-6 gap-x-6 gap-y-3">
          {languages.map((language) => (
            <div key={language._id}>
              <div className="bg-transparent border p-4 rounded-lg hover:bg-active group active text-center">
                <p className="line-clamp-2 text-link text-xl mt-1">
                  {language.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </Formik>
  );
};

export default Preference;
