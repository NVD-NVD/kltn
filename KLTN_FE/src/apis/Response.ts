interface ResponseInstant {
	// success:Boolean,
	message: string;
	statusCode: number;
}
export interface ReturnResponse<T> extends ResponseInstant {
	data: T;
}

export interface ReturnListResponse<T> extends ResponseInstant {
	data: Array<T>;
}
