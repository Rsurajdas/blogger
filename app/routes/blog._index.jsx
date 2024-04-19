import { Link, json, useLoaderData, useMatches } from '@remix-run/react';
import BlogItem from '../components/BlogItem';
import { getTags } from '../utils/tag.server';

export default function BlogIndex() {
  const data = useMatches();
  const blogs = data.find((item) => item.id === 'routes/blog')?.data;
  const tags = useLoaderData();
  return (
    <section className="py-12">
      <div className="xl:container">
        <div className="flex gap-4 items-baseline">
          <div className="flex gap-5 w-3/4">
            {blogs.map((item) => (
              <BlogItem key={item.id} {...item} />
            ))}
          </div>
          <div className="w-1/4">
            <div className="tags p-4 border border-red-200 rounded-md">
              <div className="tags-header border-b border-stone-300 pb-3">
                <h3 className="text-red-500 text-xl font-semibold">Tags</h3>
              </div>
              <div className="tags-content mt-2">
                <ul className="list-decimal list-inside">
                  {tags.map((tag) => (
                    <li key={tag.id} className="mb-1">
                      <Link to={`/blog/tag/${tag.id}`}>
                        {tag.title} ({tag.blogIds.length})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const loader = async () => {
  return json(await getTags());
};
