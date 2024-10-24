Feature: Gestión de tareas con prioridades
Scenario: Procesar tareas en el orden correcto de prioridad
    Given que agrego la tarea "Tarea 1" con prioridad 2
    And que agrego la tarea "Tarea 2" con prioridad 5
    And que agrego la tarea "Tarea 3" con prioridad 3
    When proceso las tareas
    Then la tarea "Tarea 2" debe procesarse primero
    And la tarea "Tarea 3" debe procesarse después
    And la tarea "Tarea 1" debe procesarse al final
