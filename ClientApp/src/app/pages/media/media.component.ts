import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MediaService } from "../../services/media.service";
import { Media } from "../../interfaces";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html"
})
export class MediaComponent implements OnInit {
  media: Observable<Media>;
  mediaId: number;

  constructor(
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute
  ) {
    const idParam = "id";
    if (this.activatedRoute.snapshot.params[idParam]) {
      this.mediaId = this.activatedRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    this.media = this.mediaService.getMedia(this.mediaId);
  }
}
