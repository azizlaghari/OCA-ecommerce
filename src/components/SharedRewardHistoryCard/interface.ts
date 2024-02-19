interface shared {
    email: string,
    firstName: string,
    lastName: string,
    _id: string
}
export interface ShareRewardHistory {
    data: {
        pointsShared: number,
        sharedBy: shared
        sharedTo: shared,
        timestamp: Date
    };
}