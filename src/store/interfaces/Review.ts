export interface ReviewType {
  _id: string;
  comments: string;
  name: string;
  rating: string;
  imageUrl: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ReviewState {
  isLoading: boolean;
  reviews: ReviewType[];
}
