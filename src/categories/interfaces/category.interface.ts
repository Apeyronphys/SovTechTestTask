export interface ICategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  createdDate: Date;
  active: boolean;
}
