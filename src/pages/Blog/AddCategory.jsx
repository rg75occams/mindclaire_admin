import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../components/CustomInput';
import FileUploadInput from '../../components/FileUploadInput';
import { Fragment } from 'react';
import PageTitle from '../../components/PageTitle';

const AddCategory = () => {
    const initialValues = {
        category: '',
    };

    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
    });

    const handleSubmit = (values) => {
        console.log('Form Data:', values);
    };

    return (
        <Fragment>
            <PageTitle title="Mindclaire | Add Blog Category" />

            <div className='shadow-md w-full bg-white p-4 rounded-lg'>
                <h2 className='text-lg inter_semibold mb-4!'>Add Category</h2>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <CustomInput required label="Category" name="category" placeholder="Enter Category" />
                            </div>

                            {/* <div className="mt-4">
                                <label className="mb-3 block text-[#111827] inter_medium">
                                    Attach Image <span className="text-[#dc3545]">*</span>
                                </label>

                                <FileUploadInput acceptedFileTypes="image/*" selectedFile={values.file}
                                    onFileSelect={(file) => setFieldValue('file', file)}
                                    maxFileSizeInBytes={5 * 1024 * 1024} error={!!errors.file && touched.file}
                                />
                                <ErrorMessage name="file" component="div" className="text-base text-red-600 inter mt-1" />
                            </div> */}

                            <div className="mt-5">
                                <button type="submit" className="px-6 py-2 bg-[#3C0A6D] text-white! 
                                cursor-pointer hover:bg-[#250644] transition rounded-md! inter_medium"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    );
};

export default AddCategory