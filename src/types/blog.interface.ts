export interface IBlog {
    blogContent: string;
    blogID: number;
    userID: number;
}

export interface IComment {
    commentID: number;
    commentContent: string;
    blogID: number;
    userID: number;
}