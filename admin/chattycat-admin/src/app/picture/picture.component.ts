import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  @Input() image: string;
  @Input() filePath: string;
  @Output() readonly fileUploaded = new EventEmitter<string>();

  loading = false;

  constructor(private storage: AngularFireStorage,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.filePath)
  }

  uploadFile($event: any) {
    const file = $event.target.files[0];
    const filePath = this.filePath
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.loading = true;
    this.cdr.markForCheck();

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(image => {
            image = image.replace(/&token=.*$/, '')
            this.fileUploaded.emit(image);
            this.loading = false;
          });
        })
      )
      .subscribe((data) => {
      });
  }

  deleteImage() {
    this.image = '';
    this.fileUploaded.emit(this.image);
  }
}
