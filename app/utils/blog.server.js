import { prisma } from './data.server';
import slugify from 'slugify';

export const createBlog = async (data, userId) => {
  const tagsArr = data.tags.split(',');
  const slug = slugify(data.title);
  try {
    await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        tags: tagsArr,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        author: { connect: { id: userId } },
        slug: slug,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
