

export interface Comments 
{
    _id: string;
    user: string;
    date: string;
    CommentTitle: string;
    CommentContent: string;
    voteCount: number;
    profilePic: string;
    postID: string

}

export interface MovieComment
{
    _id: string
    user: string;
    date: string;
    profilePic: string;
    commentBody: string;
    likes: number
    movieID: string;
    
}
