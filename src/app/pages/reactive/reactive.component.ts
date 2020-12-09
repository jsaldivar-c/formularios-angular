import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
    forma: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private validadores: ValidadoresService
    ) {
        this.crearFormulario();
        this.cargarDataAlFormulario();
        this.crearListeners();
    }

    ngOnInit(): void {}

    get nombreNoValido(): boolean {
        return (
            this.forma.get('nombre').invalid && this.forma.get('nombre').touched
        );
    }

    get apellidoNoValido(): boolean {
        return (
            this.forma.get('apellido').invalid &&
            this.forma.get('apellido').touched
        );
    }
    get correoNoValido(): boolean {
        return (
            this.forma.get('correo').invalid && this.forma.get('correo').touched
        );
    }

    get usuarioNoValido(): boolean {
        return (
            this.forma.get('usuario').invalid &&
            this.forma.get('usuario').touched
        );
    }
    get distritoNoValido(): boolean {
        return (
            this.forma.get('direccion.distrito').invalid &&
            this.forma.get('direccion.distrito').touched
        );
    }

    get ciudadNoValida(): boolean {
        return (
            this.forma.get('direccion.ciudad').invalid &&
            this.forma.get('direccion.ciudad').touched
        );
    }

    get pasatiempos() {
        return this.forma.get('pasatiempos') as FormArray;
    }

    get pass1NoValido() {
        return (
            this.forma.get('pass1').invalid && this.forma.get('pass1').touched
        );
    }

    get pass2NoValido() {
        const pass1 = this.forma.get('pass1').value;
        const pass2 = this.forma.get('pass2').value;

        return pass1 === pass2 ? false : true;
    }

    crearFormulario() {
        this.forma = this.formBuilder.group(
            {
                nombre: ['', [Validators.required, Validators.minLength(5)]],
                apellido: [
                    '',
                    [Validators.required, this.validadores.noHerrera],
                ],
                correo: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'
                        ),
                    ],
                ],
                usuario: ['', , this.validadores.existeUsuario],
                pass1: ['', Validators.required],
                pass2: ['', Validators.required],
                direccion: this.formBuilder.group({
                    distrito: ['', Validators.required],
                    ciudad: ['', Validators.required],
                }),
                pasatiempos: this.formBuilder.array([]),
            },
            { validators: this.validadores.passwordsIguales('pass1', 'pass2') }
        );
    }

    crearListeners() {
        // this.forma.valueChanges.subscribe((valor) => {
        //     console.log(valor);
        // });
        // this.forma.statusChanges.subscribe((status) => {
        //     console.log({ status });
        // });

        this.forma.get('nombre').valueChanges.subscribe(console.log);
    }

    cargarDataAlFormulario() {
        // Se puede utilizar this.forma.reset({nombre:'', etc}) de esta manera
        // no es necesario utilizar todos los campos como con el setValue

        this.forma.reset({
            nombre: 'Joséle',
            apellido: 'Saldivar',
            correo: 'jose.saldivar@gmail.com',
            pass1: '123',
            pass2: '123',
            direccion: {
                distrito: 'Kansas',
                ciudad: 'Kentucky',
            },
        });

        ['Ingresa un pasatiempo', 'Ingresa un pasatiempo'].forEach((valor) =>
            this.pasatiempos.push(this.formBuilder.control(valor))
        );
    }
    agregarPasatiempo() {
        this.pasatiempos.push(
            // this.formBuilder.control('', Validators.required)
            this.formBuilder.control('')
        );
    }

    borrarPasatiempo(i: number) {
        this.pasatiempos.removeAt(i);
    }

    guardar() {
        console.log(this.forma);

        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach((control) => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach((control) =>
                        control.markAsTouched()
                    );
                } else {
                    control.markAsTouched();
                }
            });
            // if (this.forma.invalid) {
            //     Object.values(this.forma.controls).forEach((control) => {
            //         control.markAsTouched();
            //     });
            //     return;
            // }
        }

        // Posteo de información
        this.forma.reset();
    }
}
