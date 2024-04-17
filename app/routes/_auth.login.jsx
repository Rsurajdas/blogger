import { Form, Link } from '@remix-run/react';
import Input from '../components/Input';
import Password from '../components/Password';

export default function LoginPage() {
  return (
    <main className="bg-neutral-50">
      <section className="py-12">
        <div className="xl:container">
          <div className="flex">
            <div className="w-1/2">
              <Form method="post" className="px-24">
                <h1 className="text-red-500 font-bold text-5xl font-heading mb-8">
                  Login
                </h1>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="mb-2 block text-lg">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="form-input mt-1 block w-full hover:border-red-500 rounded-3xl border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 text-lg ps-4"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="mb-2 block text-lg">
                    Password
                  </label>
                  <Password
                    id="password"
                    className="form-input mt-1 block w-full hover:border-red-500 rounded-3xl border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50 text-lg pr-8 pl-4"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="form-group mb-4">
                    <label htmlFor="rememberMe" className="mb-2 block text-lg">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        className="accent-red-500"
                      />{' '}
                      Remember Me
                    </label>
                  </div>
                  <div className="form-group mb-4">
                    <Link
                      to="/forgotpassword"
                      className="text-red-500 font-semibold hover:text-red-600"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-lg text-white w-full py-[10px] pl-4 pr-3 rounded-3xl hover:bg-red-600"
                  >
                    Login
                  </button>
                </div>
                <div className="form-group mb-4">
                  <Link
                    to="/signup"
                    className="border-red-500 block text-lg text-red-500 w-full py-[10px] pl-4 pr-3 rounded-3xl text-center border hover:bg-red-400 hover:text-white"
                  >
                    Register
                  </Link>
                </div>
              </Form>
            </div>
            <div className="w-1/2">
              <div>
                <img
                  src="/login_img.png"
                  alt="login"
                  className="object-contain w-10/12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log(credentials);
  return null;
};
