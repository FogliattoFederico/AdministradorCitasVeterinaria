import {
  nombreInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  tipoMascotaInput,
  edadMascotaInput,
  formulario,
} from "./selectores.js";
import { datosCita, submitCita } from "./funciones.js";
import { CrearDB } from "./db.js";

//EVENTOS
nombreInput.addEventListener("input", datosCita);
propietarioInput.addEventListener("input", datosCita);
telefonoInput.addEventListener("input", datosCita);
fechaInput.addEventListener("input", datosCita);
horaInput.addEventListener("input", datosCita);
sintomasInput.addEventListener("input", datosCita);
tipoMascotaInput.addEventListener("input", datosCita);
edadMascotaInput.addEventListener("input", datosCita);
formulario.addEventListener("submit", submitCita);

document.addEventListener('DOMContentLoaded', ()=>{
  CrearDB();
})

