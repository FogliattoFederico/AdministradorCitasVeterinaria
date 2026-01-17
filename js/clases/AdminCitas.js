import { cargarEdicion, limpiarHTML } from "../funciones.js";
import { listasCitas } from "../selectores.js";
import Notificacion from "./Notificacion.js";

export default class AdminCitas {
  constructor() {
    this.citas = [];
  }

  AgregarCita(cita) {
    this.citas = [...this.citas, cita];
    this.MostarCitas();
  }

  MostarCitas() {
    //Limipiar el HTML previo
    limpiarHTML();

    this.citas.forEach((cita) => {
      const li = document.createElement("li");

      const {
        mascota,
        propietario,
        tipoMascota,
        telefono,
        fecha,
        hora,
        sintomas,
        edadMascota,
      } = cita;

      li.classList.add(
        "list-group-item",
        "py-4",
        "px-3",
        "border-0", // Sin borde estándar
        "mb-4",
        "shadow", // Sombra media
        "rounded-3", // Bordes más redondeados
        "bg-white",
        "transition-all", // Para efectos hover
      );

      // Añadir estilos CSS adicionales para hover
      li.style.transition = "all 0.3s ease";

      // Opcional: Añadir efecto hover con JS
      li.addEventListener("mouseenter", () => {
        li.classList.add(
          "shadow-lg",
          "border-start",
          "border-4",
          "border-primary",
        );
      });
      li.addEventListener("mouseleave", () => {
        li.classList.remove("shadow-lg");
        li.classList.add("shadow");
      });

      li.innerHTML = `
    <div class="d-flex justify-content-between align-items-start ">
        <div class="flex-grow-1">
            <h5 class="text-primary mb-2"> 
                <i class="bi bi-paw me-2"></i>
                ${mascota}
            </h5>
            
            <div class="row text-muted"> 
                <div class="col-6">
                <p class="mb-2"> 
                        <i class="bi bi-person me-1"></i>
                        <strong>Tipo:</strong> ${tipoMascota}
                    </p>
                    <p class="mb-2"> 
                        <i class="bi bi-person me-1"></i>
                        <strong>Dueño:</strong> ${propietario}
                    </p>
                    <p class="mb-2">
                        <i class="bi bi-telephone me-1"></i>
                        <strong>Tel:</strong> ${telefono}
                    </p>
                </div>
                <div class="col-6">
                <p class="mb-2">
                        <i class="bi bi-calendar me-1"></i>
                        <strong>Edad:</strong> ${edadMascota}
                    </p>
                    <p class="mb-2">
                        <i class="bi bi-calendar me-1"></i>
                        <strong>Fecha:</strong> ${fecha}
                    </p>
                    <p class="mb-2">
                        <i class="bi bi-clock me-1"></i>
                        <strong>Hora:</strong> ${hora}
                    </p>
                </div>
            </div>
            <div class="mt-2">
              <small class="text-uppercase text-secondary d-block mb-1">Síntomas:</small>
              <p class="mb-0 bg-light rounded">${sintomas}</p>
            </div>
        </div>
    </div>
    `;
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "btn",
        "btn-primary",
        "d-flex",
        "align-items-center",
        "me-2",
        "px-4",
        "py-2",
      );
      btnEditar.style.gap = "8px"; // Espacio entre el ícono y el texto
      btnEditar.innerHTML =
        'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

      const citaClon = structuredClone(cita);
      btnEditar.onclick = () => {
        cargarEdicion(citaClon);
      };

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "btn",
        "btn-danger",
        "d-flex",
        "align-items-center",
        "gap-5",
        "me-2",
        "px-4",
        "py-2",
      );
      btnEliminar.style.gap = "8px"; // Espacio entre el ícono y el texto
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
      btnEliminar.onclick = () => {
        this.EliminarCita(cita.id);
        new Notificacion({
          mensaje: "Cita eliminada correctamente",
          tipo: "success",
        });
      };

      // Crear un contenedor para ambos botones
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "w-100",
        "mt-3", // Puedes ajustar el margen según necesites
      );

      // Añadir los botones al contenedor
      buttonContainer.appendChild(btnEditar);
      buttonContainer.appendChild(btnEliminar);
      listasCitas.appendChild(li);
      li.appendChild(buttonContainer);
      buttonContainer.appendChild(btnEditar);
      buttonContainer.appendChild(btnEliminar);
    });
  }

  ModificarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita,
    );
    this.MostarCitas();
  }

  EliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    this.MostarCitas();
  }
}