import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
    usuario = {
        nombre: 'Josele',
        correo: 'jose.saldivar@outlook.com',
        apellido: 'Saldivar',
        pais: 'ARG',
        genero: 'M',
    };

    paises: any[] = [];

    constructor(private paisService: PaisService) {}

    ngOnInit(): void {
        this.paisService.getPaises().subscribe((paises) => {
            this.paises = paises;
            this.paises.unshift({
                nombre: 'Seleccione pais',
                codigo: '',
            });
            console.log(paises);
        });
    }

    guardar(forma: NgForm) {
        console.log(forma);

        if (forma.invalid) {
            Object.values(forma.controls).forEach((control) => {
                // console.log(control);
                control.markAsTouched();
            });
            return;
        }

        console.log(forma.value);
    }
}
