import {
  Form,
  json,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { Table } from 'antd';
import Input from '../components/Input';
import { createTag, getTags } from '../utils/tag.server';

export default function TagPage() {
  const actionData = useActionData();
  const data = useLoaderData();
  const fetcher = useFetcher();
  const handleDelete = (id) => {
    fetcher.submit(null, {
      method: 'delete',
      action: `/dashboard/category/${id}`,
    });
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      width: '25%',
      render: () => (
        <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600">
          Delete
        </button>
      ),
    },
  ];
  return (
    <>
      <section className="py-12">
        <div className="xl:container">
          <div className="flex">
            <div className="w-1/2">
              <Form method="post">
                <h1 className="text-red-500 font-medium text-4xl font-heading border-b border-dashed border-red-400 pb-4">
                  Tag
                </h1>
                <ul
                  className={`bg-red-100 rounded-lg border-red-500 border-dashed border mb-6 list-decimal transition-all mt-4  ${
                    actionData
                      ? 'opacity-100 visible max-h-60 mb-6 p-6 px-10'
                      : 'opacity-0 collapse max-h-0 mb-0 p-0 px-0'
                  }`}
                >
                  {actionData?.error ? <li>{actionData?.error}</li> : null}
                </ul>
                <div className="form-group mb-4">
                  <label htmlFor="title" className="mb-2 block text-xl">
                    Tag Name
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
              <Table
                columns={columns}
                dataSource={data}
                className="border border-stone-300 rounded-md mt-8"
                onRow={(record) => {
                  return {
                    onClick: () => handleDelete(record.id),
                  };
                }}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await createTag(data);
    return redirect('/dashboard/tag');
  } catch (error) {
    if (error.status === 405) {
      return { error: error.message };
    }
  }
};

export const loader = async () => {
  return json(await getTags());
};
