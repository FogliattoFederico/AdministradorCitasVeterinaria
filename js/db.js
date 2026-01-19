import { citasObj } from "./variables.js";
import AdminCitas from "./clases/AdminCitas.js";
export let DB;

export function CrearDB() {
  const crearDB = window.indexedDB.open("citas", 1);
  crearDB.onerror = function () {
    console.log("error al crear la base de datos");
  };

  crearDB.onsuccess = function () {
    DB = crearDB.result;
    const adminCitas = new AdminCitas();
    adminCitas.MostrarCitas();
  };

  crearDB.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore("citas", {
      keyPath: "id",
      autoIncrement: true,
    });

    //definir columnas
    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("propietario", "propietario", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("tipoMascota", "tipoMascota", { unique: false });
    objectStore.createIndex("edadMascota", "edadMascota", { unique: false });
  };
}

export function AgregarCitaDB() {
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.add(citasObj);

  transaction.oncomplete = function () {
    //console.log("cita agregada correctamente");
  };

  transaction.onerror = function () {
    console.log("error al agregar una cita");
  };
}

export function ModificarCitaDB() {
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.put(citasObj);

  transaction.oncomplete = function () {
    //console.log("Cita modificada correctamente");
  };
  transaction.onerror = function () {
    console.log("Error al modificar cita");
  };
}

export function EliminarCitaDB(id) {
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.delete(id);

  transaction.oncomplete = function () {
    console.log(`el ${id} fue eliminado`);
    const adminCitas = new AdminCitas();

    adminCitas.MostrarCitas();
  };

  transaction.onerror = function () {
    console.log("Hubo un error al eliminar el regitro");
  };
}
