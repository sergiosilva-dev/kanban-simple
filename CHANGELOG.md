# 📑 CHANGELOG

Historial de cambios del proyecto **kanban-simple**.

Este documento sigue el formato de [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y la convención de versiones [SemVer](https://semver.org/lang/es/).

---

## [2025-07-16]

### ✨ Agregado

- Archivo `CHANGELOG.md` creado para documentar cambios futuros.
- Estructura base del proyecto (HTML, CSS, JS).
- Archivo `LICENSE` con licencia MIT personalizada.
- Archivo `README.md` con descripción, uso y datos del autor.
- Archivo `.gitignore` para excluir configuraciones locales, temporales y del sistema.
- Archivo `index.html` con estructura base del tablero Kanban y comentarios documentados (autor, fecha, uso, futuras actualizaciones).
- Archivo `style.css` con estilos base para la estructura visual del tablero Kanban, columnas y layout general.
- Comentarios documentados con autor, fecha y registro de actualizaciones.
- Archivo `main.js` con estructura base para lógica de interacción drag and drop.
- Listener `DOMContentLoaded` agregado para preparación de funcionalidades JS.
- Archivo `site.webmanifest` con íconos y configuración para PWA básica.
- Íconos favicon en múltiples tamaños para navegadores y dispositivos móviles.
- Lógica inicial en `main.js` para arrastrar y soltar tareas entre columnas.
- Listener `dragstart`, `dragend`, `dragover` y `drop` correctamente implementados.
- Estilos básicos añadidos para `.task` y estado `.dragging`.
- Formulario con input y botón para crear nuevas tareas.
- Lógica en `main.js` para insertar tareas dinámicamente en la columna "Por hacer".
- Eventos drag and drop aplicados automáticamente a nuevas tareas.
- Estilos visuales para el formulario en `style.css`.
- Lógica en `main.js` para persistir tareas usando `localStorage`.
- Función `guardarTareas()` que guarda el estado del tablero automáticamente.
- Función `cargarTareas()` que restaura tareas guardadas al cargar la app.
- Función `crearTarea()` centralizada para tareas nuevas o recuperadas.
- Campo de búsqueda de tareas en `index.html`.
- Estilos para input de búsqueda en `style.css`.
- Lógica en `main.js` para buscar tareas mientras se escribe.
- Edición de tareas con ALT + doble clic (prompt editable).

### 📝 Actualizado

- `README.md`: añadidas secciones de uso, autor y licencia.
- `index.html`: se agregaron enlaces a favicons y manifest para compatibilidad con PWA.
- Comentarios actualizados en la sección de documentación del archivo.

## [2025-07-17]

### ✨ Integrado

- Funcionalidad para filtrar tareas por columna seleccionada.
- Botón de exportación para guardar tareas en formato JSON.
- Funcionalidad para importar tareas desde archivo JSON.
- Nuevos estilos para sección de filtros y herramientas (`style.css`).
- Elementos visuales en `index.html` para exportar/importar y filtrar.
