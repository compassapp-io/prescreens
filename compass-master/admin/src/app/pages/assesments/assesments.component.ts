import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../service/media.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-assesments',
  templateUrl: './assesments.component.html',
  styleUrls: ['./assesments.component.css']
})
export class AssesmentsComponent implements OnInit {

  public assesData: any = [];
  isLoading = false;
  editRowKey?: number = null;
  newdata: any;
  public optionData: any = [];
  public optionContent: any;
  public profile: any;
  type: string = "error";
  message: string = "Please add options";
  isVisible: boolean = false;
  loadPanelPosition = { of: '#gridContainer' };
  constructor(public service: MediaService) {
    const data = window.localStorage.getItem('User');
    this.profile = JSON.parse(data);
    this.newdata = new CustomStore({
      load: () => {
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.service.getassesmentdata().subscribe((result: any) => {
              console.log(result)
              result.forEach((resultData) => {
                if (resultData.type == "question") {
                  const meta = JSON.parse(resultData.meta);
                  // meta.options.forEach((resultData) => {
                  //   data.push(resultData.value)
                  // })
                  // meta.options = data;
                  this.assesData.push({
                    id: resultData.id,
                    description: resultData.description,
                    type: resultData.type,
                    userid: resultData.userid,
                    meta: meta,
                  })
                  console.log(this.assesData)
                }

              });
              resolve(this.assesData);
              console.log(this.assesData)
              this.isLoading = false;
            });
            err => {
              console.log('error occured');

            }
          }, 3000);
        });

        return p;
      },
      update: (key, values) => {
        const p = new Promise((resolve, reject) => {
          if (this.optionData.length == 0) {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            this.isVisible = false;
            if (values.description) {
              values.description = values.description;
            }
            else {
              values.description = key.description;
            }
            if (values.meta) {
              values.meta = values.meta;
            }
            else {
              values.meta = key.meta;
            }
            const newMedia = {
              active: values.meta.active,
              options: this.optionData,
            }
            var finalData = {
              "description": values.description,
              "type": "question",
              "meta": JSON.stringify(newMedia),
              "userid": key.userid,
            }
            this.service.updateassContent(finalData, key.id).subscribe(result => {
              if (result) {
                console.log(result)
              }
            },
              err => {
                console.log('error occured');
              }
            );
            this.assesData = [];
            resolve(this.assesData)
          }

        });

        return p;
      },
      remove: (key) => {
        const p = new Promise((resolve, reject) => {
          this.service.deleteassContent(key.id).subscribe(result => {
            console.log(result)
          },
            err => {
              console.log('error occured');
            }
          );
          this.assesData = [];
          resolve(this.assesData);
        });

        return p;
      },
      insert: (values) => {
        const p = new Promise((resolve, reject) => {
          if (this.optionData.length == 0) {
            this.isVisible = true;
            this.isLoading = false;
            reject();
          } else {
            this.isVisible = false;
            const newMedia = {
              active: values.meta.active,
              options: this.optionData,
            }
            var FinalData = {
              "description": values.description,
              "type": "question",
              "userid": this.profile.userid,
              "meta": JSON.stringify(newMedia),
            }
            console.log(FinalData)
            this.service.postassesmentdata(FinalData).subscribe((result: any) => {
              if (result) {
                console.log(result)
              }
            });
            err => {
              console.log('error occured');

            }
            this.assesData = [];
            resolve(this.assesData);
          }
        });
        return p;
      },
    });
    this.optionContent = new CustomStore({
      load: () => {
        const p = new Promise((resolve, reject) => {
          resolve(this.optionData)
        });

        return p;
      },
      update: (key, values) => {
        const p = new Promise((resolve, reject) => {
          for (var i = 0; i < this.optionData.length; i++) {
            if (this.optionData[i].value == key.value) {
              if (values) {
                this.optionData[i].value = values.value
              }
            }
          }

          resolve(this.optionData)
          console.log(this.optionData)
          this.isLoading = false;

        });

        return p;
      },
      remove: (key) => {
        const p = new Promise((resolve, reject) => {
          for (var i = 0; i < this.optionData.length; i++) {
            if (this.optionData.value == key.value) {
              var index = i;
            }
          }
          this.optionData.splice(index, 1);

          resolve(this.optionData);

          reject();

        });

        return p;
      },

      insert: (values) => {
        const p = new Promise((resolve, reject) => {
          var FinalData = {
            "value": values.value
          }
          this.optionData.push(FinalData);

          resolve(this.optionData);

          reject();

        });

        return p;
      },

    });
  }

  ngOnInit(): void {

  }
  editorPreparing(e: any) {
    this.optionData = [];
    if (e.row != undefined && e.row.data.meta != undefined) {
      this.optionData = e.row.data.meta.options;
      console.log(this.optionData)
    } else {
      this.optionData = [];
    }
  }

  mediaDescription(ds) {
    ds.setValue(ds.key.meta);
  }
}
