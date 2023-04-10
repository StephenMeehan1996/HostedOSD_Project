import { CdkDragDrop, CdkDragEnd, moveItemInArray  } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  public movies:any;
  message: any;
  flag = 'discover';
  index = 1;

  @Output() closeDiscover = new EventEmitter<string>();
  constructor(private _db: MovieApiServiceService) { 

  }

  ngOnInit(): void {
    this._db.getSimilarMovie(this.getRandomNumber(101,100000)).subscribe({
      next: (value: any )=> this.movies = value.results,
      complete: () => console.log('List service finished '),
      error: (mess:any) => this.message = mess
    })
  }
close()
{
  this.closeDiscover.emit();

}

onDragEnd(event: CdkDragEnd) {
  // Get the drag distance in pixels
  const dragDistance = event.distance.x;

  // Check if the drag distance is greater than 50 pixels (adjust as needed)
  if (Math.abs(dragDistance) > 50) {
    // Determine the direction of the drag (left or right)
    const direction = dragDistance > 0 ? 'right' : 'left';

   
    if (direction === 'right') {

      console.log(this.movies[this.index].id)
      console.log('Dragged right!');
     if(this.index == this.movies.length-1)
     {
      let id = this.movies[this.index].imdb_id;
      this.index = 0;
      alert(this.index);
      this.test(id)

     }
     else
     {
      this.index++;

     }
   
      event.source._dragRef.reset();

    } else {
     this.test(this.getRandomNumber(101,10000))
      console.log('Dragged left!');
      event.source._dragRef.reset();

    }
  }
}

GetNewMovie(id: string)
{
  this._db.getRandom(id).subscribe({
    next: (value: any )=> this.movies = value.results,
    complete: () => console.log('List service finished ' ),
    error: (mess) => this.message = mess

   
  })
  console.log(this.movies);



}


test(id: string)
{
  this._db.getSimilarMovie(id).subscribe({
    next: (value: any )=> this.movies = value.results,
    complete: () => console.log('List service finished ' ),
    error: (mess: any) => this.message = mess
  })

  alert("t")
  


}

getRandomNumber(num1 : number, num2: number): string {
 
  let randomNumber = Math.floor(Math.random() * num2) + num1;


  return randomNumber.toString();
}

}
