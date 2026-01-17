import { generarId } from "./funciones.js";

export let editando = {
    value: false
}

//Objeto
export const citasObj = {
  id: generarId(),
  mascota: "",
  propietario: "",
  tipoMascota: "",
  edadMascota: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};