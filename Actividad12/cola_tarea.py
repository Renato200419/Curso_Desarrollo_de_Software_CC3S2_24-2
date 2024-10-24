from heapq import heappop, heappush

class ColaDeTareas:
    def __init__(self):
        self.cola = []
        self.contador = 0

    def agregar_tarea(self, nombre_tarea, prioridad):
        heappush(self.cola, (-prioridad, self.contador, nombre_tarea))
        self.contador += 1

    def procesar_tareas(self):
        tareas_procesadas = []
        while self.cola:
            _, _, nombre_tarea = heappop(self.cola)
            tareas_procesadas.append(nombre_tarea)
        return tareas_procesadas
