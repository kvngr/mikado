import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MediaService } from "src/app/services/media.service";
import { Media } from "src/app/interfaces";

@Component({
  selector: "app-medias",
  templateUrl: "./medias.component.html"
})
export class MediasComponent implements OnInit {
  medias: Observable<Media[]>;

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadMedias();
  }

  loadMedias() {
    this.medias = this.mediaService.getMedias();
  }

  delete(mediaId) {
    const ans = confirm("Do you want to delete blog post with id: " + mediaId);
    if (ans) {
      this.mediaService.deleteMedia(mediaId).subscribe(data => {
        this.loadMedias();
      });
    }
  }
}
