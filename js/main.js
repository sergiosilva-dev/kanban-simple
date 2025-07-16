/**
 * Autor: Sergio Silva
 * Fecha de creación: 2025-07-16
 * Descripción: Archivo JavaScript principal del proyecto "kanban-simple".
 * Este archivo contendrá la lógica de arrastrar y soltar entre columnas del tablero.
 *
 * Actualizaciones:
 * - [2025-07-16] Estructura base creada y listener de carga inicial agregado.
 * - [2025-07-16] Lógica inicial drag and drop implementada con listeners básicos.
 * - [2025-07-16] Agregar tareas dinámicamente al tablero.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("Tablero Kanban cargado correctamente.");

  let draggedTask = null;

  /**
   * Asigna eventos de drag and drop a una tarea
   * @param {HTMLElement} task
   */
  function asignarEventosDrag(task) {
    task.addEventListener("dragstart", () => {
      draggedTask = task;
      task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
      draggedTask = null;
      task.classList.remove("dragging");
    });
  }

  // Asignar eventos a tareas existentes
  document.querySelectorAll(".task").forEach(asignarEventosDrag);

  // Elementos del formulario
  const input = document.getElementById("new-task-input");
  const addBtn = document.getElementById("add-task-btn");
  const todoColumn = document.getElementById("todo-tasks");

  /**
   * Evento: Crear nueva tarea y agregarla a la columna "Por hacer"
   */
  addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText !== "") {
      const newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.setAttribute("draggable", "true");
      newTask.textContent = taskText;

      // Aplicar lógica de arrastrar
      asignarEventosDrag(newTask);

      // Insertar en el tablero
      todoColumn.appendChild(newTask);
      input.value = "";
    }
  });

  // Columnas del tablero
  const columns = document.querySelectorAll(".kanban-tasks");

  columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", () => {
      if (draggedTask) {
        column.appendChild(draggedTask);
      }
    });
  });
});
