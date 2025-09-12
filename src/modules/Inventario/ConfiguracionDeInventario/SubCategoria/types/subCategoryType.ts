export type SubCategoryType = {
  id?: number;
  image: string; // URL de la imagen (opcional)
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  code: string;
  parentCategory: string;
}

export type SubCategoryFormType = {
    name: string;
    description: string;
    status: boolean;
    code: string;
}

