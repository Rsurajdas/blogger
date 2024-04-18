import { prisma } from './data.server';

export const createCategory = async (data) => {
  if (!data.title) {
    const error = new Error('Please enter category name');
    error.status = 405;
    throw error;
  }
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

export const deleteCategory = async (id) => {
  try {
    console.log(id);
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
