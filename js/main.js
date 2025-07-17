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
 * - [2025-07-16] Se implementa lógica para edición de tareas (ALT + doble clic).
 * - [2025-07-16] Se agrega lógica para buscar tareas en tiempo real.
 */

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
  console.log("Kanban cargado correctamente.");

  let draggedTask = null;

  /**
   * Asignar todos los eventos a una tarea (drag, eliminar, editar)
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

    // Doble clic normal = eliminar, ALT + doble clic = editar
    task.addEventListener("dblclick", (e) => {
      if (e.altKey) {
        const nuevoTexto = prompt("Editar tarea:", task.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
          const nuevaTarea = task.cloneNode(true);
          nuevaTarea.textContent = nuevoTexto.trim();
          asignarEventos(nuevaTarea);
          task.replaceWith(nuevaTarea); // Reemplaza para evitar eventos duplicados
          guardarTareas();
        }
      } else {
        if (confirm("¿Eliminar esta tarea?")) {
          task.remove();
          guardarTareas();
        }
      }
    });
  }

  /**
   * Crear una nueva tarea visualmente y asignarle eventos
   * @param {string} texto - Contenido de la tarea
   * @param {string} columnaID - ID de la columna destino
   */
  function crearTarea(texto, columnaID) {
    const tarea = document.createElement("div");
    tarea.classList.add("task");
    tarea.setAttribute("draggable", "true");
    tarea.textContent = texto;

    // Evita duplicación de eventos
    const nuevaTarea = tarea.cloneNode(true); // Clona sin eventos
    asignarEventos(nuevaTarea);

    document.getElementById(columnaID).appendChild(nuevaTarea);
  }

  /**
   * Guardar el estado de las tareas en localStorage
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
   * Cargar tareas almacenadas en localStorage
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
   * Configura las columnas del tablero para aceptar tareas arrastradas
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
   * Evento para agregar nueva tarea desde el input
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

  /**
   * Buscar tareas en todas las columnas por texto
   */
  const searchInput = document.getElementById("task-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll(".task").forEach((task) => {
        const match = task.textContent.toLowerCase().includes(query);
        task.style.display = match ? "block" : "none";
      });
    });
  }

  // Inicialización
  configurarColumnas();
  cargarTareas();
});
