import { formulario } from "../selectores.js";

class Notificacion {
  constructor({ mensaje, tipo }) {
    this.mensaje = mensaje;
    this.tipo = tipo;

    this.mostrarNotificacion();
  }

  mostrarNotificacion() {
    const alerta = document.createElement("div");
    alerta.classList.add("text-center", "alert");

    this.tipo === "error"
      ? alerta.classList.add("alert-danger")
      : alerta.classList.add("alert-success");

    const alertaExistente = document.querySelector(".alert");
 
    alertaExistente?.remove();

    alerta.textContent = this.mensaje;
    formulario.parentElement.insertBefore(alerta, formulario);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

export default Notificacion