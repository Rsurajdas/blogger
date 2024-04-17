import { Outlet } from '@remix-run/react';
import MainHeader from '../components/MainHeader';
import { getUserFromSession } from '../utils/auth.server';

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

export const loader = ({ request }) => {
  return getUserFromSession(request);
};
