import { prisma } from './data.server';

export const createCategory = async (data) => {
  try {
    await prisma.category.create({
      data: {
        title: data.title,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
