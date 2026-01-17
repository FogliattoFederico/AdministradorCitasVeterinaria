import AdminCitas from "./clases/AdminCitas.js";
import Notificacion from "./clases/Notificacion.js";
import { citasObj, editando } from "./variables.js";
import { listasCitas, formulario, btnSubmit, nombreInput, propietarioInput, tipoMascotaInput, edadMascotaInput, telefonoInput, fechaInput, horaInput, sintomasInput } from "./selectores.js";

//Declaraciones globales
const citas = new AdminCitas();

export function datosCita(e) {
  citasObj[e.target.name] = e.target.value;
}

export function submitCita(e) {
  e.preventDefault();

  if (Object.values(citasObj).some((valor) => valor.trim() === "")) {
    new Notificacion({
      mensaje: "Todos los campos son obligatorios",
      tipo: "error",
    });
    return;
  }

  if (editando.value) {
    citas.ModificarCita({ ...citasObj });
    new Notificacion({
      mensaje: "Cita editada correctamente",
      tipo: "success",
    });
  } else {
    citas.AgregarCita({ ...citasObj });
    new Notificacion({
      mensaje: "Cita agregada correctamente",
      tipo: "success",
    });
  }

  formulario.reset();
  reiniciarObjeto();
  editando.value = false;
  btnSubmit.textContent = "Crear Cita";
}

export function limpiarHTML() {
  while (listasCitas.firstChild) {
    listasCitas.removeChild(listasCitas.firstChild);
  }
}

export function reiniciarObjeto() {
  Object.assign(citasObj, {
    id: generarId(),
    mascota: "",
    propietario: "",
    tipoMascota: "",
    edadMascota: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
}

export function generarId() {
  return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
  Object.assign(citasObj, cita);

  nombreInput.value = cita.mascota;
  propietarioInput.value = cita.propietario;
  tipoMascotaInput.value = cita.tipoMascota;
  edadMascotaInput.value = cita.edadMascota;
  telefonoInput.value = cita.telefono;
  fechaInput.value = cita.fecha;
  horaInput.value = cita.hora;
  sintomasInput.value = cita.sintomas;

  editando.value = true;

  btnSubmit.textContent = "Guardar Cambios";
}