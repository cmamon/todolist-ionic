import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailsPage } from '../item-details/item-details';
import { DataProvider } from '../../providers/data/data';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    public items = [];

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public dataService: DataProvider
    ) {
        this.dataService.getData().then((todos) => {
            if (todos) {
                this.items = todos;
            }
        });
    }

    addItem() {
        let addModal = this.modalCtrl.create(AddItemPage);

        addModal.onDidDismiss((item) => {
            if (item) {
                this.saveItem(item);
            }
        });

        addModal.present();
    }

    saveItem(item) {
        this.items.push(item);
        this.dataService.save(this.items);
    }

    viewItem(item) {
        this.navCtrl.push(ItemDetailsPage, {
            item: item
        });
    }
}
