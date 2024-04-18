import { prisma } from './data.server';

export const createTag = async (data) => {
  if (!data.title) {
    const error = new Error('Please enter tag name');
    error.status = 405;
    throw error;
  }
  try {
    await prisma.tag.create({
      data: {
        title: data.title,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    return await prisma.tag.findMany();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
