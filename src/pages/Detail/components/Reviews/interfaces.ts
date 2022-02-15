export interface IReview {
	created_at: string;
	id: string;
	text: string;
}

export interface IReviews {
	tips: IReview[];
}