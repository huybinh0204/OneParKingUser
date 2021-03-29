import { Component, OnInit, Input } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {
  @Input() id: string;
  @Input() path: string;
  constructor(private ntrl: NavController, private modelDismiss: ModalController, private api: ApiService) { }

  ngOnInit() {
  }
  cancelBtn() {
    this.modelDismiss.dismiss({
      deleted: false
    });
  }
  deleteRecord() {
    this.api.startLoader();
    this.ntrl.navigateForward(['car-list']);
    this.modelDismiss.dismiss({
      deleted: true
    });
    console.log('this.path', );
    const data = {
      id : this.id
    };
    this.api.authDeleteReqXe('delete/' + this.path, data).subscribe((res: any) => {
      console.log('res', res);
      if (res.success === true) {
        // this.api.presentToast(res.msg);
        this.modelDismiss.dismiss({
          deleted: true
        });
      }
    }, err => {
      console.log('err', err);
    });
  }
}
