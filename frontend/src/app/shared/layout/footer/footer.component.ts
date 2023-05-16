import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  makeConsultation: boolean = false;

  popupForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
  })

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;

  constructor(private dialog:MatDialog,
              private requestService: RequestService,
              private fb: FormBuilder,
              private router:Router) {
  }

  getConsultation() {
    this.makeConsultation = true;
    if (this.popupForm.valid && this.popupForm.value.phone && this.popupForm.value.name) {
      this.requestService.getConsultation(this.popupForm.value.name, this.popupForm.value.phone)
        .subscribe({
          ///...
        })
    }
  }

  openPopup() {
    this.dialogRef = this.dialog.open(this.popup);
    this.dialogRef.backdropClick()
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
    this.popupForm.reset();
    setTimeout(()=> {
      this.makeConsultation = false;
    },1000)
  }
}
