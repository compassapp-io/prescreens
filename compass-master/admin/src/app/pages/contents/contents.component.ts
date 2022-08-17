import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as appGlobals from '../../app.global';
import { MediaService, Data, Change } from '../../service/media.service';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { LocationStrategy } from '@angular/common';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  public contentData: any = [];
  public updatedData: any = [];
  public Data: any = [];
  public media: any = [];
  public updatedMedia: any = [];
  newdata: any = {};
  public mediaConent: any;
  data$: Observable<Data[]>;
  changes: Change<Data>[] = [];
  editRowKey?: number = null;
  editmedisRowKey?: number = null;
  isLoading = false;
  public s3 = 'https://compass-media.s3.amazonaws.com/';
  loadPanelPosition = { of: '#gridContainer' };
  public profile: any;
  public mediaDescriptionValue: any;
  editorValueType: string;
  descriptionValue: any;
  type: string = "error";
  message: string = "Please add description";
  isVisible: boolean = false;
  DS: any = {};
  public parentCategory: any;
  public runCount: number = 0;
  public typeDS = [{
    "id": 1,
    "name": "article"
  }, {
    "id": 2,
    "name": "audio"
  }, {
    "id": 3,
    "name": "video"
  }];

  constructor(public http: HttpClient, public service: MediaService,
    private location: LocationStrategy) {
    const data = window.localStorage.getItem('User');
    this.profile = JSON.parse(data);
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    this.newdata = new CustomStore({
      load: () => {
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.service.getmeta().subscribe((result: any) => {
              console.log(result)
              result.forEach((resultData) => {
                const test = [];
                if (resultData.media && resultData.media.length != 0) {
                  const mediaMeta = JSON.parse(resultData.media[0].meta);
                  resultData.media.forEach((mediameta) => {

                    const mediaMeta = JSON.parse(mediameta.meta);
                    test.push({
                      id: mediameta.id,
                      name: mediameta.name,
                      url: mediameta.url,
                      description: mediameta.description,
                      type: mediameta.type,
                      meta: mediaMeta,
                    })

                  });
                }
                this.contentData.push({
                  id: resultData.id,
                  description: resultData.description,
                  title: resultData.title,
                  parentid: resultData.parentid,
                  userid: resultData.userid,
                  mediaids: resultData.mediaids,
                  media: test,
                  displayorder: resultData.displayorder
                })
              });
              const newParentCategory = {
                id: '0',
                title: 'Top Level'
              };
              let tempParentCategory = [...this.contentData];
              this.parentCategory = [];
              for (let i = 0; i < tempParentCategory.length; i++) {
                if (tempParentCategory[i].parentid === 0) {
                  this.parentCategory.push(tempParentCategory[i]);
                }
              }
              this.parentCategory.push(newParentCategory);
              localStorage.setItem('parentCategory', JSON.stringify(this.parentCategory));
              this.parentCategory.reverse();
              resolve(this.contentData);
              console.log(this.contentData)
              // this.mediaConent = this.data;
              this.isLoading = false;
            },
              err => {
                console.log('error occured');
                reject(err);
                this.isLoading = false;
              });
          }, 3000);
        });
        return p;
      },
      update: (key, values) => {
        const p = new Promise((resolve, reject) => {
          if (this.descriptionValue === undefined && this.descriptionValue != '') {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            let data = values;
            for (let prop in key) {
              if (data[prop] === undefined) {
                data[prop] = key[prop];
              }
            }
            key.description == this.descriptionValue;
            key.media = this.media;
            console.log(key)
            this.Data = {
              "description": this.descriptionValue,
              "title": data.title,
              "meta": "{}",
              "userid": data.userid,
              "mediaids": data.mediaids,
              "parentid": data.parentid,
              "displayorder": data.displayorder
            }

            if (key.media && key.media.length != 0) {
              const newMedia = []
              this.media.forEach((resultData) => {
                const meta = JSON.stringify(resultData.meta);
                newMedia.push({
                  id: resultData.id,
                  description: resultData.description,
                  name: resultData.name,
                  url: resultData.url,
                  type: resultData.type,
                  meta: meta,
                })
              });
              this.Data.media = newMedia;
            }
            this.descriptionValue = undefined;
            console.log(this.Data)
            this.service.updateContent(this.Data, key.id).subscribe(result => {
              if (result) {
                console.log(result)
              }
            },
              err => {
                console.log('error occured');
              }
            );
            this.contentData = [];
            resolve(this.contentData)
          }

        });

        return p;
      },
      remove: (key) => {
        const p = new Promise((resolve, reject) => {
          this.service.deleteContent(key.id).subscribe(result => {
            if (result) {
              console.log(result)
            }
          },
            err => {
              reject(err);
              console.log('error occured');
            }
          );
          this.contentData = [];
          resolve(this.contentData);
        });

        return p;
      },
      insert: (values) => {
        const p = new Promise((resolve, reject) => {
          if (this.descriptionValue === undefined && this.descriptionValue != '') {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            this.updatedData = [];
            this.updatedData = {
              "description": this.descriptionValue,
              "title": values.title,
              "meta": "{}",
              "userid": this.profile.userid,
              "parentid": values.parentid,
              "displayorder": values.displayorder
            }
            if (this.media.length > 0) {
              const newMedia = []
              this.media.forEach((resultData) => {
                const meta = JSON.stringify(resultData.meta);
                newMedia.push({
                  description: resultData.description,
                  name: resultData.name,
                  url: resultData.url,
                  type: resultData.type,
                  meta: meta,
                })
              });
              this.updatedData.media = newMedia;
            }
            this.descriptionValue = undefined;
            this.service.postnewContent(this.updatedData).subscribe(result => {
              if (result) {
                console.log(result)
              }
            },
              err => {
                reject(err);
                console.log('error occured');
              }
            );
            this.contentData = []
            resolve(this.contentData);
          }
        });

        return p;
      },


    });

    this.mediaConent = new CustomStore({
      load: () => {
        const p = new Promise((resolve, reject) => {
          resolve(this.media)
        });

        return p;
      },
      update: (key, values) => {
        const p = new Promise((resolve, reject) => {
          if (this.mediaDescriptionValue === undefined || this.mediaDescriptionValue === '') {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            for (var i = 0; i < this.media.length; i++) {
              if (this.media[i].id == key.id) {
                this.updatedMedia = this.media[i]
                this.media[i].id = key.id;
                if (values.description) {
                  this.media[i].description = this.mediaDescriptionValue;
                }
                if (values.name) {
                  this.media[i].name = values.name;
                }
                if (values.url) {
                  this.media[i].url = values.url;
                }
                if (values.type) {
                  this.media[i].type = values.type;
                }
                if (values.meta && values.meta.artist) {
                  this.media[i].meta.artist = values.meta.artist;
                }
                if (values.meta && values.meta.artwork) {
                  this.media[i].meta.artwork = values.meta.artwork;
                }
              }
            }
            this.mediaDescriptionValue = undefined;
            resolve(this.media)
            console.log(this.media)
            this.isLoading = false;

          }

        });

        return p;
      },
      remove: (key) => {
        const p = new Promise((resolve, reject) => {
          for (var i = 0; i < this.media.length; i++) {
            if (this.media[i].id == key.id) {
              var index = i;
            }
          }
          this.media.splice(index, 1);

          resolve(this.media);

          reject();

        });

        return p;
      },

      insert: (values) => {
        const p = new Promise((resolve, reject) => {
          if (this.mediaDescriptionValue === undefined || this.mediaDescriptionValue === '') {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            var FinalData = {
              "description": this.mediaDescriptionValue,
              "name": values.name,
              "url": values.url,
              "type": values.type,
              "meta": values.meta
            }
            this.media.push(FinalData);
            this.mediaDescriptionValue = undefined;
            resolve(this.media);
            reject();
          }
        });

        return p;
      },

    });
  }

  ngOnInit(): void {
    // this.loadParentCategory();
  }

  loadParentCategory() {
    this.DS = null;
    this.DS = new CustomStore({
      loadMode: "raw",
      load: (loadOptions) => {
        const newParentCategory =
          { id: '0', title: 'Top Level' };
        this.parentCategory = [...this.contentData];
        this.parentCategory.push(newParentCategory);
        localStorage.setItem('parentCategory', JSON.stringify(this.parentCategory));
        return this.parentCategory.reverse();
      }
    });
  }

  orderDisplayChanged(event, data): void {
    data.setValue(event.value);
  }

  editorPreparing(e: any) {   //editorprepared //.save //instance
    this.media = [];
    if (this.descriptionValue === undefined && e.row && e.row.data) {
      this.descriptionValue = e.row.data.description;
    }
    if (e.row != undefined && e.row.data.media != undefined) {
      this.media = e.row.data.media;
      console.log(this.media)
    } else {
      this.media = [];
      this.descriptionValue = undefined;
    }

    if (this.runCount === 0 && this.parentCategory && this.parentCategory.length !== 0) {
      this.DS.__rawData = JSON.parse(localStorage.getItem('parentCategory'));
      this.runCount += 1;
    }

    if (e.dataField == "parentcategoryid" && e.row && (e.row.inserted == undefined || !e.row.inserted)) {
      for (var i = 0; i < this.DS.__rawData.length; i++) {
        if (e.row.data.id === this.DS.__rawData[i].id) {
          this.DS.__rawData.splice(i, 1);
        }
      }
      // this.runCount = 0;
    }

    if (this.runCount === 0 && e.row && (e.row.inserted == true || e.row.inserted)) {
      this.DS.__rawData = JSON.parse(localStorage.getItem('parentCategory'));
      this.runCount += 1;
    }
  }

  mediaEditorPreparing(e: any) {
    if (this.mediaDescriptionValue === undefined && e.row && e.row.data) {
      this.mediaDescriptionValue = e.row.data.description;
    }
    if (e.row != undefined && e.row.data.meta != undefined) {
      console.log(e)
    } else {
      this.mediaDescriptionValue = undefined;
    }
  }

  changesText(): string {
    return JSON.stringify(this.changes.map((change) => ({
      type: change.type,
      key: change.type !== 'insert' ? change.key : undefined,
      data: change.data
    })), null, ' ');
  }

  onSaving(e) {
    const change = e.changes[0];
    console.log(change)
    if (change) {
      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }

  async processSaving(change: Change<Data>) {
    try {
      await this.service.saveChange(change);
      this.editRowKey = null;
      this.changes = [];
    } finally {
      this.isLoading = false;
    }
  }
  valueChange(value) {
    this.descriptionValue = value;
    console.log(this.descriptionValue);
  }
  mediaValueChange(value) {
    this.mediaDescriptionValue = value;
  }
  mediaUpdate(md) {
    md.setValue(md.key.media);
  }
  mediaDescription(ds) {
    ds.setValue(ds.key.description);
  }

  mDescription(data) {
    data.setValue(data.key.description);
  }
  onEditCanceled(event) {
    this.descriptionValue = undefined;
  }
  onMediaEditCanceled() {
    this.mediaDescriptionValue = undefined;
  }
}
