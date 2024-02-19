export interface ShareRewardsType {
  points: number;
  email: string;
}
export interface RewardState {
  loading: boolean;
  allRewards: Array<RewardsType>;
}
export interface RewardsType {
  _id?: string;
  name: string;
  points: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
