import { deleteCategory } from '../utils/category.server';

// eslint-disable-next-line no-unused-vars
export const action = async ({ request, params }) => {
  const { id } = params;
  return await deleteCategory(id);
};
