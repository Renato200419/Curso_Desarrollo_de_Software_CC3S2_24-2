from cola_tarea import ColaDeTareas

def test_procesar_tareas_en_orden_prioridad():
    # Arrange
    cola = ColaDeTareas()
    cola.agregar_tarea("Tarea 1", 2)
    cola.agregar_tarea("Tarea 2", 5)
    cola.agregar_tarea("Tarea 3", 3)
    
    # Act
    tareas_procesadas = cola.procesar_tareas()
    
    # Assert
    assert tareas_procesadas == ["Tarea 2", "Tarea 3", "Tarea 1"]

def test_procesar_cola_vacia():
    # Arrange
    cola = ColaDeTareas()
    
    # Act
    tareas_procesadas = cola.procesar_tareas()
    
    # Assert
    assert tareas_procesadas == []
