import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrImageStructure {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrImages {
  photos: {
    photo: FlickrImageStructure[];
  };
}

@Injectable({
  providedIn: 'root'
})

export class FlickrService {
  prevKeyword: string;
  currentPage = 1;
  constructor(private http: HttpClient) { }

  search_keyWord( keyword: string){
    (this.prevKeyword === keyword) ? this.currentPage = 1 : this.currentPage++ ;
    this.prevKeyword = keyword;

    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&',
    queryString = `api_key=${environment.flickr.key}&text=${keyword}}&format=json&nojsoncallback=1&per_page=9&page=${this.currentPage}`;

    return this.http.get(url + queryString).pipe(map((res: FlickrImages) => {
      const urlArray = [];
      res.photos.photo.forEach((img: FlickrImageStructure) => {
          const imgObj = {
            url: `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}`,
            title: img.title
          };

          urlArray.push(imgObj);
      });

      return urlArray;
    }))
  }
}
