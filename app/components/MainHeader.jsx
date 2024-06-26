import { useLoaderData } from '@remix-run/react';

export default function MainHeader() {
  // eslint-disable-next-line no-unused-vars
  const userId = useLoaderData();
  return (
    <header className="bg-slate-50 h-16">
      <div className="xl:container h-full">
        <nav className="flex items-center h-full">
          <h1 className="text-red-500 font-semibold text-2xl uppercase font-heading tracking-wide">
            Blogger
          </h1>
        </nav>
      </div>
    </header>
  );
}
