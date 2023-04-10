export interface List 
{
    _id: string
    title: string;
    description: string;
    creation_date: string;
    user: string;

}

export class ListItem
{
    title: string;
    description: string;
    creation_date: string;
    user: string; 

    constructor(title : string, description: string, creation_date: string, user: string)
    {
        this.title = title;
        this.description = description;
        this.creation_date = creation_date;
        this.user = user;
    }

}