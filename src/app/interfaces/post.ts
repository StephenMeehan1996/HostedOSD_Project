export interface Post {
    _id: string;
    user: string;
    date: string;
    postTitle: string
    postContent: string;
    postImage: string;
    voteCount: number;
    displayComments: boolean;

    
}


export class PostItem
{
  
    
    PostTitle: string;
   
    

    constructor( PostTitle:string )
    {
        
        this.PostTitle = PostTitle;
        
       
    }

}
