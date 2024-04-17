import { Form, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Input from '../components/Input';
import SelectInput from '../components/Select';
import MultiSelect from '../components/MultiSelect';
import customStyles from '../styles/custom.css?url';

export default function AddBlogPage() {
  // const data = useActionData();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
  });
  const submit = useSubmit();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function onChange(value, fieldName) {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    submit(formData, {
      method: 'POST',
    });
  }
  return (
    <section className="py-12">
      {/* {console.log(data)} */}
      <div className="xl:container">
        <div className="w-full pb-8">
          <h1 className="text-5xl border-b text-red-500 border-dashed pb-4">
            Create Blog
          </h1>
        </div>
        <div className="flex gap-x-4">
          <div className="w-1/2">
            <Form method="post" onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="title" className="mb-2 block text-xl">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full rounded-md border-gray-300 hover:border-red-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="content" className="mb-2 block text-xl">
                  Content
                </label>
                <Input
                  textArea={true}
                  id="content"
                  cols="30"
                  rows="5"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-textarea mt-1 block w-full rounded-md hover:border-red-500 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="author" className="mb-2 block text-xl">
                  Author
                </label>
                <Input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full rounded-md hover:border-red-500 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <div className="form-group mb-4">
                    <label htmlFor="category" className="mb-2 block text-xl">
                      Category
                    </label>
                    <SelectInput
                      options={[
                        { value: 'cate1', label: 'Cate 1' },
                        { value: 'cate2', label: 'Cate 2' },
                      ]}
                      className="w-full"
                      fieldName="category"
                      value={formData.category}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="form-group mb-4">
                    <label htmlFor="tags" className="mb-2 block text-xl">
                      Tags
                    </label>
                    <MultiSelect
                      options={[
                        { value: 'tag1', label: 'Tag 1' },
                        { value: 'tag2', label: 'Tag 2' },
                      ]}
                      className="w-full"
                      fieldName="tags"
                      value={formData.tags}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="from-group mb-4">
                <label htmlFor="metaTitle" className="mb-2 block text-xl">
                  Meta Title
                </label>
                <Input
                  type="text"
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full hover:border-red-500 rounded-md border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div className="from-group mb-4">
                <label htmlFor="metaDescription" className="mb-2 block text-xl">
                  Meta Description
                </label>
                <Input
                  textArea={true}
                  id="metaDescription"
                  cols="30"
                  rows="3"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  className="form-textarea mt-1 block w-full rounded-md hover:border-red-500 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 px-12 py-4 mt-8 rounded-md hover:bg-red-700 text-white font-bold"
              >
                Submit
              </button>
            </Form>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <img src="/blog_img.png" alt="blog" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const links = () => [{ rel: 'stylesheet', href: customStyles }];

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
};
