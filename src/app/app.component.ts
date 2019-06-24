///<reference path="../../node_modules/@angular/forms/forms.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  serverStatus = ['Stable', 'Critical', 'Finished'];
  projectStatus = FormGroup;
  forbiddenProjectNames = ['Test'];

  ngOnInit(){
    this.projectStatus = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, Validators.required, this.forbiddenNames),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'status': new FormControl(null),
    });
  }

  onSubmit(){
    console.log(this.projectStatus);
  }

  forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
          resolve({'projectNameIsInvalid' : true});
        }else{
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
