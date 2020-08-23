import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../modals/image-modal/image-modal.component';


@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.scss']
})
export class FlickrSearchComponent implements OnInit {
  images = [];
  keyword: string;

  constructor( private flickrService: FlickrService, private modalService: NgbModal ) { }

  ngOnInit(): void {
  }

 startSearch(scrolled: boolean) {
    if(this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyWord(this.keyword)
      .toPromise()
      .then( res => {
        !scrolled && (this.images = res) || (this.images = this.images.concat(res));
      });
    }
  };

  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    this.startSearch(false);
  }

  onScroll() {
    this.startSearch(true);
  }

  openModal(imgSrc: string, title: string) {
    const modalRef = this.modalService.open(ImageModalComponent,
      {
        scrollable: false,
        backdrop: true,
        keyboard: true,
        size: 'xl'
      });

    let data = {
      src: imgSrc,
      title: title,
    }

    modalRef.componentInstance.fromParent = data;
      modalRef.result.then((result) => {
      }, (reason) => {
    })
  }
}
