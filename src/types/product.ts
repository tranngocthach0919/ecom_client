// ----------------------------------------------------------------------

export type IProductItemHeroProps = {
  title: string;
  caption: string;
  coverUrl: string;
  label: string;
};

export type IProductItemProps = {
  id: string;
  name: string;
  images: string[];
  price: number;
  sold: number;
  label: string;
  caption: string;
  colors: string;
  quantity: number;
  coverUrl: string;
  category: {
    name: string;
    id: string;
  };
  brand: {
    name: string;
    id: string;
  };
  gender?: string;
  salePrice: number;
  ratingNumber: number;
  description: string;
  totalReviews: number;
};

export type IProductFiltersProps = {
  filterTag: string[];
  filterStock: boolean;
  filterBrand: string[];
  filterShipping: string[];
  filterCategories: string;
  filterRating: string | null;
  filterPrice: {
    start: number;
    end: number;
  };
};

export type IProductOrderProps = {
  id: string;
  item: string;
  price: number;
  status: string;
  orderId: string;
  deliveryDate: Date;
};
