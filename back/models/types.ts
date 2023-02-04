
export interface IPost {
	_id?: string,
	title: string,
	description?: string,
	createdBy?: IUser,
	image: string,
	tags?: string[],
	createdAt?: Date,
	likes?: string[],
	comments?: IComment[]
}

export interface IUser {
	_id?: string,
	name: string,
	email: string,
	image: string,
	password?: string,
	sub?: String
}

export interface IComment {
	title?: string,
	description: string,
	createdBy: IUser,
	createdAt: Date,
	postId: string
}