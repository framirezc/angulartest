import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MoviesService } from '../movies.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  displayedColumns: string[] = ['_id','title', 'year', 'cast', 'genres'];  
  dataSource: any;  

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private movieService: MoviesService,
              private _liveAnnouncer: LiveAnnouncer) { }

  public getMovies() {
    this.movieService.getData().subscribe((data => {      
      this.dataSource = new MatTableDataSource(data); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      console.log(this.dataSource);
    }));    
  }

  ngOnInit(): void {
    this.getMovies();
       
  }
  
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
