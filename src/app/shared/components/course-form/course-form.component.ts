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

  allAuthorList: Array<{ id: string, name: string }> = [{ id: "1", name: "Author 1"}, { id: "2", name: "Author 2"}]; 
  // authorList: Array<{ id: string, name: string }> = [];


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

  selectAuthor = new FormControl("");

  addAuthor() {
    const newId = crypto.randomUUID();
    const name = this.author.getRawValue();

    if (!name) return;

    const newAuthor = this.fb.group({
      id: [newId, Validators.required],
      name: [name, Validators.required]
    });

    this.authors.controls.forEach(f => console.log("f", f));

    this.authors.push(newAuthor);
    this.allAuthorList.push({ id: newId, name });
    this.author.reset();
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  submitForm(form: FormGroup) {
    console.log('submettedForm', form.value);
  }

  handleAuthorSelect(id: string) {
    const existingAuthor = this.allAuthorList.find(a => a.id === id);

    if (existingAuthor) {
      const newAuthor = this.fb.group({
        id: [existingAuthor.id, Validators.required],
        name: [existingAuthor.name, Validators.required]
      });

      this.authors.push(newAuthor);
      this.selectAuthor.reset();
    }
  }
}
