import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	uploadForm : FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
  	this.uploadForm = this.fb.group({
  		name: [, Validators.required],
  		image: [, Validators.required],
  	})
  }

  toFormObject(data) {
  	debugger;
  	const formData = new FormData();

  	Object.keys(data).forEach((key) => {
  		formData.append(key, data[key]);
  	});
  	return formData;
  }

  save() {
  	if(this.uploadForm.valid) {
  		this.http.post('http://localhost:3300/upload', this.toFormObject(this.uploadForm.value))
  		.subscribe(
  			(data) => {
  				debugger;
  			},
  			(err) => {
  				debugger;
  			}
  		)
  	}
  }

  onFileChange(event) {
  	if(event.target.files && event.target.files.length > 0) {
  		const file = event.target.files[0];
  		this.setImage = file;
  	}
  }

  get getName() {
  	return this.uploadForm.get('name');
  }

  get getImage() {
  	return this.uploadForm.get('image');
  }

  set setName(value) {
  	this.getName.setValue(value);
  }

  set setImage(value) {
  	this.getImage.setValue(value);
  }
}
