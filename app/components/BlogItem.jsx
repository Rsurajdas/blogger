import { Link, useFetcher } from '@remix-run/react';
import { Switch } from 'antd';

export default function BlogItem({
  title,
  content,
  category,
  tags,
  isPublished,
  id,
}) {
  const fetcher = useFetcher();
  const onChange = (checked) => {
    fetcher.submit(
      { isPublished: checked, id },
      { method: 'PATCH', action: '/blog' }
    );
  };
  return (
    <div className="w-3/12 bg-white rounded-md shadow-md p-4 relative">
      <div className="w-full">
        <div className="content">
          <h3 className="text-red-500 text-xl font-semibold mb-3 truncate text-ellipsis">
            {title}
          </h3>
          <p className="truncate text-ellipsis mb-2">{content}</p>
        </div>
        <div className="tags flex gap-2 mb-4">
          {tags.map((item) => (
            <Link
              key={item.id}
              className="bg-red-100 border border-red-500 rounded-md text-xs pb-1 px-2"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex justify-between">
          <span>{category.title}</span>
          <Switch defaultChecked={isPublished} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
