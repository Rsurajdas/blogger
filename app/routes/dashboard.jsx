import { Outlet } from '@remix-run/react';

export default function DashboardPage() {
  return (
    <main className="bg-neutral-50">
      <Outlet />
    </main>
  );
}
