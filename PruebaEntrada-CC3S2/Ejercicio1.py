from numpy import Inf #Importamos la librería numpy para trabajar con Inf:Infinito
def Dijkstra(graph, start): #Función en la que tendrá la estructura principal del algoritmo
    l = len(graph) #Tamaño del grafo
    
    # Inicializa todas las distancias como infinitas
    dist = [Inf for _ in range(l)]
    
    # Establece la distancia del nodo de inicio como 0
    dist[start] = 0
    
    # Crea una lista que indica si un nodo ha sido visitado
    vis = [False for _ in range(l)]
    # Itera sobre todos los nodos
    for _ in range(l):
        
        # Inicializa u como -1 para encontrar el nodo más cercano no visitado
        u = -1
        
        # Itera sobre todos los nodos para encontrar el nodo más cercano no visitado
        for x in range(l):
            if not vis[x] and (u == -1 or dist[x] < dist[u]):
                u = x
                
        # Si todas las distancias son infinitas, sal del bucle
        if dist[u] == Inf:
            break
            
        # Marca el nodo actual como visitado
        vis[u] = True
        
        # Actualiza las distancias de los nodos adyacentes
        for v, d in graph[u]:
            if dist[u] + d < dist[v]:
                dist[v] = dist[u] + d
                
    # Devuelve la lista de distancias desde el nodo de inicio a todos los demás nodos
    return dist

# Grafo que se usará en esta aplicación
graph = {
    0: [(1, 1)],
    1: [(0, 1), (2, 2), (3, 3)],
    2: [(1, 2), (3, 1), (4, 5)],
    3: [(1, 3), (2, 1), (4, 1)],
    4: [(2, 5), (3, 1)]
}

print(Dijkstra(graph, 0)) #Se imprime el resultado# En este ejercicio se usará el Algoritmo Dijkstra



