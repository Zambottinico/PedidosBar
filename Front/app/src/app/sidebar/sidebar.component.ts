import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MesasService } from '../mesas.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() emiter = new EventEmitter();
  addPeople(people: number) {
    if (people === -1 && this.form.get('people')?.value === 1) {
      this.form.get('people')?.setValue(1);
    } else {
      this.form
        .get('people')
        ?.setValue(this.form.get('people')?.value + people);
    }
  }
  onSubmit() {
    let rta = this.mesasService.occupyTable(this.form, this.idLounge, this.id);
    rta.subscribe((data) => {
      if (data) {
        console.log('Respuesta:' + data);
        this.emiter.emit(this.id);
      }
    });
  }
  form: FormGroup<any>;
  @Input() id: number;
  @Input() idLounge: number;

  constructor(private fb: FormBuilder, private mesasService: MesasService) {
    this.form = this.fb.group({
      people: [1, [Validators.required, Validators.min(1)]],
      client: ['', [Validators.required]],
    });
  }
}
