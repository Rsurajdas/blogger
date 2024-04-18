import { prisma } from './data.server';
import slugify from 'slugify';

export const createBlog = async (data, userId) => {
  const tagsArr = data.tags.split(',');
  const slug = slugify(data.title);
  try {
    await prisma.blog.create({
      data: {
        ...data,
        author: { connect: { id: userId } },
        category: { connect: { id: data.category } },
        tags: { connect: { id: tagsArr } },
        slug: slug,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
