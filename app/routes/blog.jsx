import { Outlet, json } from '@remix-run/react';
import MainHeader from '../components/MainHeader';
import { requireUserSession } from '../utils/auth.server';
import { getAllBlogsByUser, updatePublishStatus } from '../utils/blog.server';

export default function BlogPage() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export const loader = async ({ request }) => {
  const userId = await requireUserSession(request);
  return json(await getAllBlogsByUser(userId));
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await updatePublishStatus(data);
  return null;
};
