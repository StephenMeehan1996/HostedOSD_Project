export interface Movie {

    results: string;
    _id: string;
    
    title: string;
    imdb_id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    note: string;
    rating: 
    {
        $numberDecimal : number
    };
    showDetail: boolean;
    showEditDetail: boolean;
    showFullOverView: boolean;
    listID: string;
    user: string;
}

export interface MovieTestingItem
{
    _id: string;
    title: string;
    showDetail: boolean;

}

export class MovieItem
{
    title: string;
    imdb_id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    note: string;
    rating: number;
    listID : string;
    user: string;

    constructor(title: string, imdb_id: number, overview: string, poster_path: string, release_date: string, vote_average: number, vote_count: number, note: string, rating: number, listID: string, user: string)
    {
        this.title = title;
        this.imdb_id = imdb_id;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.note = note;
        this.rating = rating;
        this.listID = listID;
        this.user = user;
        
    }


}
