import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as appGlobals from '../../app.global';
import { MediaService, Data, Change } from '../../service/media.service';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { LocationStrategy } from '@angular/common';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  public categoryData: any = [];
  public updatedData: any = [];
  public subSectionsData: any = [];
  public Data: any = [];
  public media: any = [];
  public updatedMedia: any = [];
  newdata: any = {};
  public mediaConent: any;
  data$: Observable<Data[]>;
  editRowKey?: number = null;
  editmedisRowKey?: number = null;
  isLoading = false;
  public s3 = 'https://compass-media.s3.amazonaws.com/';
  loadPanelPosition = { of: '#gridContainer' };
  public profile: any;
  editorValueType: string;
  descriptionValue: any;
  type: string = "error";
  message: string = "Please add description";
  isVisible: boolean = false;
  public runCount: number = 0;
  public itemsSubsectionsData = [];

  // API URLs
  public categoryUrl = `${appGlobals.createEndpoint('Category')}`;
  public contentSubsectionUrl = `${appGlobals.createEndpoint('Content')}`;

  constructor(public http: HttpClient, public service: MediaService,
    private location: LocationStrategy) {
    const data = window.localStorage.getItem('User');
    this.profile = JSON.parse(data);
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    this.newdata = new CustomStore({
      load: (loadOptions) => {
        const p = new Promise((resolve, reject) => {
          this.http.get(this.categoryUrl).subscribe((data) => {
            this.categoryData = data;
            for (let i = 0; i < this.categoryData.length; i++) {
              this.categoryData[i].subsectionname = [];
              this.categoryData[i].meta = JSON.parse(this.categoryData[i].meta);
              this.categoryData[i].subsectionids = JSON.parse(this.categoryData[i].subsectionids);
              for (let j = 0; j < this.categoryData[i].contentsubsection.length; j++) {
                this.categoryData[i].subsectionname.push(this.categoryData[i].contentsubsection[j].title);
              }
            }
            resolve(data);
            this.loadSubsections();
          }, (err) => {
            reject(err);
          });
        });

        return p;
      },

      insert: (values) => {
        const p = new Promise((resolve, reject) => {
          values.subsectionids = [];
          for (let i = 0; i < this.subSectionsData.length; i++) {
            for (let j = 0; j < values.subsectionname.length; j++) {
              if (values.subsectionname[j] === this.subSectionsData[i].parentsubsectiontitle) {
                let newSubsectionData = {
                  id: this.subSectionsData[i].id
                };
                values.subsectionids.push(newSubsectionData);
              }
            }
          }
          values.meta = JSON.stringify(values.meta);
          values.subsectionids = JSON.stringify(values.subsectionids);
          this.http.post(this.categoryUrl, values).subscribe((data) => {
            resolve(data);
            console.log('Data has been successfully inserted');
          }, (err) => {
            reject(err);
            console.log(err);
          });
        });

        return p;
      },

      remove: (key) => {
        const p = new Promise((resolve, reject) => {
          this.http.delete(this.categoryUrl + '/' + key.id).subscribe((data) => {
            resolve(data);
            console.log('Data has been successfully removed');
          }, (err) => {
            reject(err);
          });
        });

        return p;
      },

      update: (key, values) => {
        let data = values;
        for (let prop in key) {
          if (data[prop] === undefined) {
            data[prop] = key[prop];
          }
        }
        data.subsectionids = [];
        for (let i = 0; i < this.subSectionsData.length; i++) {
          for (let j = 0; j < data.subsectionname.length; j++) {
            if (data.subsectionname[j] === this.subSectionsData[i].parentsubsectiontitle) {
              let newSubsectionData = {
                id: this.subSectionsData[i].id
              };
              data.subsectionids.push(newSubsectionData);
            }
          }
        }
        data.meta = JSON.stringify(data.meta);
        data.subsectionids = JSON.stringify(data.subsectionids);
        const p = new Promise((resolve, reject) => {
          this.http.put(this.categoryUrl + '/' + key.id, data).subscribe((data) => {
            resolve(data);
            console.log('Data has been updated successfully');
          }, (err) => {
            reject(err);
          });
        });
        return p;
      }
    });

    // this.subSectionsDS.store = new CustomStore({
    //   loadMode: "raw",
    //   load: (loadOptions) => {
    //     const p = new Promise((resolve, reject) => {
    //       this.http.get(this.contentSubsectionUrl).subscribe((data: any) => {
    //         this.subSectionsData = [];
    //         let resultData = data;
    //         for (let i = 0; i < resultData.length; i++) {
    //           if (resultData[i].parentid !== 0) {
    //             let fileterdResult = resultData.filter(e => e.id === resultData[i].parentid);
    //             resultData[i].parentsubsectiontitle = resultData[i].title + ' - ' + fileterdResult[0].title;
    //             this.subSectionsData.push(resultData[i]);
    //           }
    //         }
    //         resolve(this.subSectionsData);
    //       }, (err) => {
    //         reject(err);
    //       });
    //     });

    //     return p;
    //   }
    // });
  }

  ngOnInit(): void {
  }

  loadSubsections() {
    const p = new Promise((resolve, reject) => {
      this.http.get(this.contentSubsectionUrl).subscribe((data: any) => {
        this.subSectionsData = [];
        let resultData = data;
        for (let i = 0; i < resultData.length; i++) {
          if (resultData[i].parentid !== 0) {
            let fileterdResult = resultData.filter(e => e.id === resultData[i].parentid);
            if(resultData[i].title && fileterdResult.length) {
              resultData[i].parentsubsectiontitle = resultData[i].title + ' - ' + fileterdResult[0].title;
              this.subSectionsData.push(resultData[i]);
            }
          }
        }
        resolve(this.subSectionsData);
      }, (err) => {
        reject(err);
      });
    });

    return p;
  }


  editorPreparing(e: any) {
    this.itemsSubsectionsData = [];
    if (e.row != undefined && e.row.key.subsectionname != undefined && e.row.key.subsectionname != null) {
      for (let i = 0; i < e.row.key.contentsubsection.length; i++) {
        for (let j = 0; j < this.subSectionsData.length; j++) {
          if (e.row.key.contentsubsection[i].id === this.subSectionsData[j].id)
            this.itemsSubsectionsData.push(this.subSectionsData[j].parentsubsectiontitle);
        }
      }
    }
  }

  // mediaUrl(photoFileNameOrUrl: string) {
  //   return appGlobals.utils.photoUrl(photoFileNameOrUrl);
  // }

  subsectionsValue(value, data) {
    let finalSubsections = [];
    value.forEach((item) => {
      finalSubsections.push(item);
    });
    data.setValue(finalSubsections);
  }

  valueChange(event, data) {
    data.setValue(event);
    this.descriptionValue = event;
  }

  onEditCanceled(event) {
    this.descriptionValue = undefined;
  }

  orderDisplayChanged(event, data): void {
    data.setValue(event.value);
  }
}
