from behave import *
from cola_tarea import ColaDeTareas

@given('que agrego la tarea "{nombre_tarea}" con prioridad {prioridad:d}')
def paso_agregar_tarea(contexto, nombre_tarea, prioridad):
    if not hasattr(contexto, 'cola'):
        contexto.cola = ColaDeTareas() 
    contexto.cola.agregar_tarea(nombre_tarea, prioridad)

@when('proceso las tareas')
def paso_procesar_tareas(contexto):
    contexto.tareas_procesadas = contexto.cola.procesar_tareas()

@then('la tarea "{tarea_esperada}" debe procesarse primero')
def paso_verificar_primera_tarea(contexto, tarea_esperada):
    assert contexto.tareas_procesadas[0] == tarea_esperada

@then('la tarea "{tarea_esperada}" debe procesarse después')
def paso_verificar_tarea_siguiente(contexto, tarea_esperada):
    assert contexto.tareas_procesadas[1] == tarea_esperada

@then('la tarea "{tarea_esperada}" debe procesarse al final')
def paso_verificar_tarea_final(contexto, tarea_esperada):
    assert contexto.tareas_procesadas[-1] == tarea_esperada
