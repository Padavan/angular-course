import { Component, OnInit } from '@angular/core';
import {
    FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  authorList: Array<{ id: string, name: string }> = [];

  ngOnInit():void {

    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.pattern("[0-9]*")]]
    });
  }

  author = new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9\\s]*") ]);

  get authors() : FormArray<FormGroup> {
    return this.courseForm.controls["authors"] as FormArray<FormGroup>;
  }

  addAuthor() {
    const newAuthor = this.fb.group({
      id: [crypto.randomUUID(), Validators.required],
      name: [this.author.getRawValue(), Validators.required]
    });

    this.authors.controls.forEach(f => console.log("f", f));

    this.authors.push(newAuthor);
    this.author.reset();
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  submitForm(form: FormGroup) {
    console.log('submettedForm', form.value);
  }
}
