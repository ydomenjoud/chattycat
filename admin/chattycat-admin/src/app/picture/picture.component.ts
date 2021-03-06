import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';
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
  @Input() id: string;
  @Input() max = 200;

  loading = false;

  constructor(private storage: AngularFireStorage,
              private readonly snackbar: KalSnackbarService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  uploadFile($event: any) {
    const file = $event.target.files[0];
    if (file.size > this.max * 1024) {
      this.snackbar.open(new KalSnackbarConfig({title: `Fichier trop gros, faire moins de ${this.max}Ko`}));
      return;
    }
    const filePath = this.filePath;
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
