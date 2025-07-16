/**
 * Autor: Sergio Silva
 * Fecha de creación: 2025-07-16
 * Descripción: Archivo JavaScript principal del proyecto "kanban-simple".
 * Este archivo contendrá la lógica de arrastrar y soltar entre columnas del tablero.
 *
 * Actualizaciones:
 * - [2025-07-16] Estructura base creada y listener de carga inicial agregado.
 * - [2025-07-16] Lógica inicial drag and drop implementada con listeners básicos.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("Tablero Kanban cargado correctamente.");

  const tasks = document.querySelectorAll(".task");
  const columns = document.querySelectorAll(".kanban-tasks");

  let draggedTask = null;

  // Evento al iniciar arrastre
  tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
      draggedTask = task;
      task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
      draggedTask = null;
      task.classList.remove("dragging");
    });
  });

  // Permitir soltar en columnas
  columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necesario para permitir drop
    });

    column.addEventListener("drop", () => {
      if (draggedTask) {
        column.appendChild(draggedTask);
      }
    });
  });
});
