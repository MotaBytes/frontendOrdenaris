import { Product } from "./product";

export interface Category {
    id:    number;
    name:  string;
    image: string;
}

export interface CategoryWithProducts extends Category {
    products: Product[];
    offset: number;
    limit: number;
    loading: boolean;
    allProductsLoaded: boolean;
}
