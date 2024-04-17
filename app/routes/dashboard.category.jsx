import { Form, Link, json, redirect, useLoaderData } from '@remix-run/react';
import Input from '../components/Input';
import { createCategory, getCategories } from '../utils/category.server';
import { Table } from 'antd';

export default function CategoryPage() {
  const data = useLoaderData();
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Link to={'/'}>Delete</Link>,
    },
  ];

  return (
    <>
      <section className="py-12">
        <div className="xl:container">
          <div className="w-1/2">
            <Form method="post" className="px-24">
              <h1 className="text-red-500 font-bold text-3xl font-heading mb-8">
                Category
              </h1>
              <div className="form-group mb-4">
                <label htmlFor="title" className="mb-2 block text-xl">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  className="form-input mt-1 block rounded-md w-full border-gray-300 hover:border-red-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              <div className="form-group mb-2">
                <button
                  type="submit"
                  className="bg-red-500 text-lg text-white w-1/2 py-[10px] pl-4 pr-3 rounded-md hover:bg-red-600"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="xl:container">
          <div className="px-24">
            <Table
              columns={columns}
              dataSource={data}
              className="border border-stone-300 rounded-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await createCategory(data);
  return redirect('/dashboard/category');
};

export const loader = async () => {
  return json(await getCategories());
};
