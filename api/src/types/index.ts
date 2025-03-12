export type ExtendedFiles = {
  coverImage: { path: string }[];
  images: { path: string }[];
};

export type Query = {
  category?: string;
  min?: number;
  max?: number;
  search?: string;
  userID?: string;
};
export type Filter = {
  user?: string;
  category?: string;
  package_price?: { $gte?: number; $lte?: number };
  title?: {
    $regex: string;
    $options: "i";
  };
};
