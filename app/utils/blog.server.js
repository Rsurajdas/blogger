import { prisma } from './data.server';
import slugify from 'slugify';

export const createBlog = async (data, userId) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      metaTitle,
      metaDescription,
      isPublished,
    } = data;
    const slug = slugify(title).toLowerCase();
    const tagArr = tags.split(',');

    return await prisma.blog.create({
      data: {
        title,
        content,
        metaTitle,
        metaDescription,
        slug,
        isPublished: isPublished === 'true',
        author: { connect: { id: userId } },
        category: { connect: { id: category } },
        tags: { connect: tagArr.map((tagId) => ({ id: tagId })) },
      },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const getAllBlogsByUser = async (userId) => {
  try {
    return await prisma.blog.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      include: {
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
        category: true,
        author: true,
      },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updatePublishStatus = async (data) => {
  try {
    return await prisma.blog.update({
      where: {
        id: data.id,
      },
      data: {
        isPublished: data.isPublished === 'true',
      },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};
