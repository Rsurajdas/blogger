export const meta = () => {
  return [
    { title: 'Blogger' },
    { name: 'description', content: 'Welcome to Blogger!' },
  ];
};

export default function Index() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
