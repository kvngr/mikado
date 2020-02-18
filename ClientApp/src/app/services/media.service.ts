import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Media } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class MediaService {
  APP_URL: string;
  API_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private http: HttpClient) {
    this.APP_URL = environment.appUrl;
    this.API_URL = "api/media/";
  }

  // GET ALL MEDIAS
  getMedias(): Observable<Media[]> {
    return this.http
      .get<Media[]>(this.APP_URL + this.API_URL)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET ONE MEDIA
  getMedia(mediaId: number): Observable<Media> {
    return this.http
      .get<Media>(this.APP_URL + this.API_URL + mediaId)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // CREATE NEW MEDIA
  createMedia(media: Media): Observable<Media> {
    return this.http
      .post<Media>(
        this.APP_URL + this.API_URL,
        JSON.stringify(media),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // UPDATE A MEDIA
  updateMedia(mediaId: number, media: Media): Observable<Media> {
    return this.http
      .put<Media>(
        this.APP_URL + this.API_URL + mediaId,
        JSON.stringify(media),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // DELETE ONE MEDIA
  deleteMedia(mediaId: number): Observable<Media> {
    return this.http
      .delete<Media>(this.APP_URL + this.API_URL + mediaId)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
