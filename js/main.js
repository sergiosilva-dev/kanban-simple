/**
 * Autor: Sergio Silva
 * Fecha de creación: 2025-07-16
 * Descripción: Lógica principal del tablero Kanban: manejo de tareas, eventos drag & drop y persistencia local.
 *
 * Actualizaciones:
 * - [2025-07-16] Crear tareas dinámicamente desde input.
 * - [2025-07-16] Arrastrar y soltar tareas entre columnas.
 * - [2025-07-16] Eliminar tarea con doble clic.
 * - [2025-07-16] Guardar y cargar tareas desde localStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Kanban cargado correctamente.");

  let draggedTask = null;

  /**
   * Asignar eventos de arrastre y eliminación a una tarea
   * @param {HTMLElement} task
   */
  function asignarEventos(task) {
    task.addEventListener("dragstart", () => {
      draggedTask = task;
      task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
      draggedTask = null;
      task.classList.remove("dragging");
      guardarTareas();
    });

    task.addEventListener("dblclick", () => {
      if (confirm("¿Eliminar esta tarea?")) {
        task.remove();
        guardarTareas();
      }
    });
  }

  /**
   * Crear una tarea visualmente en una columna
   * @param {string} texto - Contenido de la tarea
   * @param {string} columnaID - ID de la columna de destino
   */
  function crearTarea(texto, columnaID) {
    const tarea = document.createElement("div");
    tarea.classList.add("task");
    tarea.setAttribute("draggable", "true");
    tarea.textContent = texto;
    asignarEventos(tarea);
    document.getElementById(columnaID).appendChild(tarea);
  }

  /**
   * Guardar el estado actual de las tareas en localStorage
   */
  function guardarTareas() {
    const columnas = ["todo-tasks", "in-progress-tasks", "done-tasks"];
    const datos = {};

    columnas.forEach((id) => {
      const tareas = [...document.getElementById(id).querySelectorAll(".task")];
      datos[id] = tareas.map((t) => t.textContent);
    });

    localStorage.setItem("kanban-tareas", JSON.stringify(datos));
  }

  /**
   * Cargar tareas desde localStorage al iniciar
   */
  function cargarTareas() {
    const guardadas = localStorage.getItem("kanban-tareas");
    if (!guardadas) return;

    const datos = JSON.parse(guardadas);
    for (const columnaID in datos) {
      datos[columnaID].forEach((texto) => crearTarea(texto, columnaID));
    }
  }

  /**
   * Inicializar drag & drop sobre columnas
   */
  function configurarColumnas() {
    document.querySelectorAll(".kanban-tasks").forEach((columna) => {
      columna.addEventListener("dragover", (e) => {
        e.preventDefault();
        columna.classList.add("drag-over");
      });

      columna.addEventListener("dragleave", () => {
        columna.classList.remove("drag-over");
      });

      columna.addEventListener("drop", () => {
        if (draggedTask) {
          columna.appendChild(draggedTask);
          columna.classList.remove("drag-over");
          guardarTareas();
        }
      });
    });
  }

  /**
   * Evento para agregar tarea nueva desde el input
   */
  document.getElementById("add-task-btn").addEventListener("click", () => {
    const input = document.getElementById("new-task-input");
    const texto = input.value.trim();
    if (texto !== "") {
      crearTarea(texto, "todo-tasks");
      guardarTareas();
      input.value = "";
    }
  });

  // Inicializar
  configurarColumnas();
  cargarTareas();
});
