import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../components/CustomInput';
import FileUploadInput from '../../components/FileUploadInput';
import { Fragment } from 'react';
import PageTitle from '../../components/PageTitle';

const AddBlog = () => {
    const initialValues = {
        title: '', category: '', author: '',
        date: '', scheduled_date: '',
        description: '', file: null,
        seo_title: '', seo_description: '', seo_content: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),
        author: Yup.string().required('Author is required'),
        date: Yup.string().required('Date is required'),
        scheduled_date: Yup.string().required('Scheduled Date is required'),
        description: Yup.string().required('Description is required'),
        file: Yup.mixed().required('Image is required'),
    });

    const handleSubmit = (values) => {
        console.log('Form Data:', values);
    };

    return (
        <Fragment>
            <PageTitle title="Mindclaire | Add Blog" />

            <div className='shadow-md w-full bg-white p-4 rounded-lg'>
                <h2 className='text-lg inter_semibold mb-4!'>Add Blog</h2>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <CustomInput required label="Title" name="title" placeholder="Enter Blog Title" />
                                <CustomInput required label="Category" name="category" type="select" placeholder="Select Category"
                                    options={[
                                        { value: "All", label: "All" },
                                        { value: "ADHD", label: "ADHD" },
                                        { value: "Autism", label: "Autism" },
                                        { value: "Nutrition", label: "Nutrition" }
                                    ]}
                                />
                                <CustomInput required label="Author" name="author" placeholder="Author Name" />
                                <CustomInput required name="date" label="Date" type="date" />
                                <CustomInput required name="scheduled_date" label="Scheduled Date" type="date" />
                            </div>

                            <div className="mt-4">
                                <CustomInput required label="Description" name="description" type="description"
                                    placeholder="Enter Blog Description"
                                />
                            </div>

                            <div className="mt-4">
                                <CustomInput label="SEO Title" name="seo_title" placeholder="SEO Title" />
                            </div>

                            <div className="mt-4">
                                <CustomInput label="SEO Description" name="seo_description" placeholder="SEO Description" />
                            </div>

                            <div className="mt-4">
                                <CustomInput label="SEO Content" name="seo_content" placeholder="SEO Content" />
                            </div>

                            <div className="mt-4">
                                <label className="mb-3 block text-[#111827] inter_medium">
                                    Attach Image <span className="text-[#dc3545]">*</span>
                                </label>

                                <FileUploadInput acceptedFileTypes="image/*" selectedFile={values.file}
                                    onFileSelect={(file) => setFieldValue('file', file)}
                                    maxFileSizeInBytes={5 * 1024 * 1024} error={!!errors.file && touched.file}
                                />
                                <ErrorMessage name="file" component="div" className="text-base text-red-600 inter mt-1" />
                            </div>

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

export default AddBlog