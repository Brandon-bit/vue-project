export type SubCategory = {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  code: string;
}

export type SubCategoryForm = {
    name: string;
    description: string;
    status: boolean;
    code: string;
}

