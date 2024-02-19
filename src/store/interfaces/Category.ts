export interface Category {
  _id: string;
  name: string;
  categoryType: string;
  categoryId?: null;
  imageUrl?: string;
}

export interface CategoryType {
  name: string;
  imageUrl?: string;
  categoryType: string;
  categoryId?: null | Category;
  _id: string;
}

export interface CategoryState {
  loading: boolean;
  categories: Array<CategoryType>;
  categoryFilter: string;
}

export interface CreateCategoryType {
  _id: string | null;
  name: string;
  categoryType: string;
  categoryId?: string | null | {};
}

export interface GetCategoryPayload {
  search: string;
  page: number;
  perPage: number;
}
export interface GetCategoryByType {
  type?: string;
  categoryId?: string;
}
