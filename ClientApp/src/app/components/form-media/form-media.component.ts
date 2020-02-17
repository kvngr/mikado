import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MediaService } from "../../services/media.service";
import { Media } from "../../interfaces";
import { ActionFormType, MediaType } from "src/app/types/media";

@Component({
  selector: "app-form-media",
  templateUrl: "./form-media.component.html",
  styleUrls: ["./form-media.component.css"]
})
export class FormMediaComponent implements OnInit {
  form: FormGroup;
  actionType: ActionFormType;
  formTitle: string;
  formMediaType: MediaType;
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
    this.formMediaType = "Book";
    this.formTitle = "title";
    this.formAuthor = "title";
    this.formContent = "body";

    if (this.activatedRoute.snapshot.params[idParam]) {
      this.mediaId = this.activatedRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      mediaId: 0,
      type: ["", [Validators.required]],
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
            this.form.controls[this.formTitle].setValue(data.title),
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
        title: this.form.get(this.formTitle).value,
        type: this.form.get(this.formMediaType).value,
        author: this.form.get(this.formAuthor).value,
        content: this.form.get(this.formContent).value
      };
      this.mediaService.createMedia(media).subscribe(data => {
        this.router.navigate(["/media", data.mediaId]);
      });
    }
  }

  cancel() {
    this.router.navigate(["/"]);
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
