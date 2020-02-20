import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MediaService } from "../../services/media.service";
import { Media } from "../../interfaces";
import { ActionFormType } from "src/app/types/media";

@Component({
  selector: "app-form-media",
  templateUrl: "./form-media.component.html",
  styleUrls: ["./form-media.component.css"]
})
export class FormMediaComponent implements OnInit {
  form: FormGroup;
  actionType: ActionFormType;
  formTitle: string;
  formMediaType: string;
  formAuthor: string;
  formContent: string;
  mediaId: number;
  errorMessage: any;
  existingMedia: Media;

  constructor(
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = "id";
    this.actionType = "Add";
    this.formMediaType = "type";
    this.formTitle = "title";
    this.formAuthor = "author";
    this.formContent = "content";

    if (this.activatedRoute.snapshot.params[idParam]) {
      this.mediaId = this.activatedRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      mediaId: 0,
      type: ["Book", [Validators.required]],
      title: ["", [Validators.required]],
      author: ["", [Validators.required]],
      content: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.mediaId > 0) {
      this.actionType = "Edit";
      this.mediaService
        .getMedia(this.mediaId)
        .subscribe(
          data => (
            (this.existingMedia = data),
            this.form.controls[this.formMediaType].setValue(data.type),
            this.form.controls[this.formTitle].setValue(data.title),
            this.form.controls[this.formAuthor].setValue(data.author),
            this.form.controls[this.formContent].setValue(data.content)
          )
        );
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === "Add") {
      const media: Media = {
        date: new Date(),
        type: this.form.get(this.formMediaType).value,
        title: this.form.get(this.formTitle).value,
        author: this.form.get(this.formAuthor).value,
        content: this.form.get(this.formContent).value
      };
      this.mediaService.createMedia(media).subscribe(data => {
        this.router.navigate(["/medias", data.mediaId]);
      });
    }

    if (this.actionType === "Edit") {
      const media: Media = {
        mediaId: this.existingMedia.mediaId,
        date: this.existingMedia.date,
        title: this.form.get(this.formTitle).value,
        type: this.form.get(this.formMediaType).value,
        author: this.form.get(this.formAuthor).value,
        content: this.form.get(this.formContent).value
      };
      this.mediaService.updateMedia(media.mediaId, media).subscribe(data => {
        this.router.navigate(["/medias"]);
      });
    }
  }

  cancel() {
    this.router.navigate(["/medias"]);
  }

  get type() {
    return this.form.get(this.formMediaType);
  }
  get title() {
    return this.form.get(this.formTitle);
  }
  get author() {
    return this.form.get(this.formAuthor);
  }
  get content() {
    return this.form.get(this.formContent);
  }
}
