import { Outlet } from '@remix-run/react';
import MainHeader from '../components/MainHeader';

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
