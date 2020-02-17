import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MediaService } from "src/app/services/media.service";
import { Media } from "src/app/interfaces";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html"
})
export class MediaComponent implements OnInit {
  medias: Observable<Media[]>;

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadMedias();
  }

  loadMedias() {
    this.medias = this.mediaService.getMedias();
  }
}
