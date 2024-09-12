# Documentación de la Actividad 2
Una vez organizado los documentos y teniendo una estructura organizada, se creó la carpeta "Actividad2" en la cual contendrá "devops-practice"
![Descripción de la imagen](devops-practice/Imagenes/Foto1.png)

## Creamos nuestro archivo: app.js
![Descripción de la imagen](devops-practice/Imagenes/Foto2.png)

## Creamos nuestro app.test.js

![Descripción de la imagen](devops-practice/Imagenes/Foto3.png)

## Configuramos nuestro package.json

![Descripción de la imagen](devops-practice/Imagenes/Foto4.png)


## Integramos seguridad con la herramienta de análisis de seguridad estática: npm audit

### Código:
npm audit

## Actualizamos el archivo .github/workflows/ci-actividad2.yml

![Descripción de la imagen](devops-practice/Imagenes/Foto5.png)


## Creamos el Dockerfile

![Descripción de la imagen](devops-practice/Imagenes/Foto6.png)


## Construimos y corremos el contenedor

![Descripción de la imagen](devops-practice/Imagenes/Foto7.png)

### Resultado

![Descripción de la imagen](devops-practice/Imagenes/Foto8.png)


## Automatiza la gestión de contenedores usando Docker Compose

### Creamos el docker-compose.yml

![Descripción de la imagen](devops-practice/Imagenes/Foto9.png)

## Corremos la aplicación usando Docker Compose

![Descripción de la imagen](devops-practice/Imagenes/Foto10.png)

### Resultado
![Descripción de la imagen](devops-practice/Imagenes/Foto11.png)

## Configuración de Prometheus y Grafana para monitorear la aplicación:

### Creamos el archivo prometheus.yml
![Descripción de la imagen](devops-practice/Imagenes/Foto12.png)


## Configuramos Grafana utilizando un docker-compose.yml actualizado
![Descripción de la imagen](devops-practice/Imagenes/Foto13.png)

## Corremos la aplicación
![Descripción de la imagen](devops-practice/Imagenes/Foto14.png)



## Se tuvo un problema ya que Grafana no podía verse
![Descripción de la imagen](devops-practice/Imagenes/Foto15.png)


## Se hace un cambio en el docker-compose
![Descripción de la imagen](devops-practice/Imagenes/Foto16.png)

## Resultado de la aplicación

![Descripción de la imagen](devops-practice/Imagenes/Foto17.png)

## Resultado de prometheus

![Descripción de la imagen](devops-practice/Imagenes/Foto18.png)

## Resultado de grafana

![Descripción de la imagen](devops-practice/Imagenes/Foto19.png)

## Al final se unió en un solo archivo ci.yml, en el cual para la actividad2 se puso en comentarios
![Descripción de la imagen](devops-practice/Imagenes/Foto20.png)

## Aplicamos los siguientes comandos uno para que construya la imágen y otro para el test
- **`docker compose --build -d`**: Construye las imágenes de los servicios definidos en el archivo **`docker-compose.yml`** y las ejecuta en segundo plano.
- **`docker exec devops-practice-app-1 npm test`**: Ejecuta el comando **`npm test`** en el contenedor con nombre **`devops-practice-app-1`**.

![Descripción de la imagen](devops-practice/Imagenes/Foto21.png)

# Implementación de observabilidad y aclaración
## Configuración del Pipeline de CI/CD

Para integrar pruebas de seguridad automatizadas en nuestro pipeline, utilizamos GitHub Actions y `npm audit`, una herramienta que revisa las dependencias de un proyecto Node.js en busca de vulnerabilidades conocidas.

### Pasos para la configuración:
1. **Crear un archivo de workflow en GitHub Actions:**
   - Ubicación: `.github/workflows/ci.yml`
   - Contenido:
     ```yaml
     name: Node.js CI con pruebas de seguridad

     on:
       push:
         branches: [ main ]
       pull_request:
         branches: [ main ]

     jobs:
       build:
         runs-on: ubuntu-latest

         steps:
         - uses: actions/checkout@v2
         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'
         - name: Install dependencies
           run: npm install
         - name: Run tests
           run: npm test
         - name: Perform security audit
           run: npm audit
     ```
   - Este workflow instala las dependencias, ejecuta pruebas y realiza un análisis de seguridad de las dependencias.

2. **Introducir una vulnerabilidad intencionada:**
   - Modificar el archivo `package.json` para incluir una versión obsoleta de una librería conocida por tener vulnerabilidades, como `lodash@4.17.15`.
   - Ejecutar el pipeline para observar cómo `npm audit` detecta y reporta la vulnerabilidad.

## Implementación de Observabilidad
Hemos hablado de observabilidad en la anterior actividad y sabemos que es esencial en el campo de desarrollo ya que permite a los equipos entender el estado interno de sus sistemas a partir de los datos externos que estos generan. En este caso usamos las siguientes herramientas:

### Herramientas Utilizadas
-Prometheus: Utilizado para recoger métricas del sistema y de la aplicación en tiempo real. Las métricas son almacenadas como series temporales, accesibles mediante consultas para análisis o alertas.

-Grafana: Empleado para visualizar las métricas recopiladas por Prometheus. Ofrece dashboards configurables que permiten ver el estado y rendimiento de la aplicación y la infraestructura de manera gráfica y en tiempo real.

## Reflexión sobre las Prácticas de DevOps
La integración de Docker y Docker Compose ha mejorado nuestros procesos de desarrollo y despliegue al mantener la consistencia mediante Infraestructura como Código (IaC), reduciendo la variabilidad y simplificando el control de versiones y las reversiones.

GitHub Actions en nuestra CI/CD y npm audit para escaneo de vulnerabilidades han incrementado significativamente la seguridad del desarrollo, asegurando que el nuevo código no introduzca fallos y mantenga la integridad en producción.

Prometheus y Grafana nos han brindado una visión detallada del rendimiento y la salud de las aplicaciones, permitiendo una detección y resolución proactiva de problemas, lo que reduce el tiempo de inactividad y mejora la experiencia del usuario.

En resumen, estas herramientas y prácticas refuerzan nuestro entorno DevOps al mejorar la automatización, seguridad y monitoreo, alineándose con los principios de DevSecOps para mitigar riesgos y reducir costos operativos.


# Ejercicios Adicionales - Parte Práctica

# **Ejercicio 1**

## Implementación

En este caso implementamos nuestro `devops-practice` ya que es un pipeline de CI/CD, el cual incluye pruebas de seguridad automatizadas mediante GitHub Actions. Además, tal como se vio en la Actividad2 usamos la herramienta de análisis de seguridad `npm audit` para evaluar las vulnerabilidades en nuestras dependencias.

### Este es nuestro ci.yml
``` ci.yml

#Actividad 1

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install
      working-directory: ./Actividad1/devops-practice

    - name: Run tests
      run: npm test
      working-directory: ./Actividad1/devops-practice

    - name: Build Docker image
      run: docker build -t devops-practice .
      working-directory: ./Actividad1/devops-practice

    - name: Run Docker container
      run: docker run -d -p 3000:3000 devops-practice
      working-directory: ./Actividad1/devops-practice

# Actividad 2

#name: CI/CD Pipeline

#on:
#  push:
#    branches: [ main ]
#  pull_request:
#    branches: [ main ]

#jobs:
#  build:
#    runs-on: ubuntu-latest

#    steps:
#    - name: Checkout code
#      uses: actions/checkout@v2

#    - name: Set up Node.js
#      uses: actions/setup-node@v2
#      with:
#       node-version: '18'

#    - name: Install dependencies
#      run: npm install
#      working-directory: ./Actividad2/devops-practice

#    - name: Run tests
#      run: npm test
#      working-directory: ./Actividad2/devops-practice

#    - name: Run security audit
#      run: npm audit
#      working-directory: ./Actividad2/devops-practice
```

1. Primero, introducimos una vulnerabilidad intencional: Se modifica el `package.json` para incluir una dependencia obsoleta que se sabe que tiene vulnerabilidades.

``` json

  "name": "devops-practice",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "express": "4.16.0" // Suponiendo que esta versión tiene vulnerabilidades conocidas
  },
  "devDependencies": {
    "jest": "^27.5.1",
    "supertest": "^6.3.4"
  },
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""

```
![Descripción de la imagen](devops-practice/Imagenes/Foto22.png)

2. Segundo, todo este cambio lo subimos a nuestro repositorio haciendo git y push para que nuestro GithubActions se active. Pero para eso necesitamos descomentar el código de la Actividad2, y comentar el código de la Actividad1 para que funcione lo que hemos hecho.

![Descripción de la imagen](devops-practice/Imagenes/Foto23.png)

3. Tercero, revisamos en nuestro repositorio en la parte de `Actions`, vemos todas las acciones que hemos realizado. 
![Descripción de la imagen](devops-practice/Imagenes/Foto24.png)

4. Cuarto, revisamos los detalles del proceso que hizo nuestro GithubActions:

![Descripción de la imagen](devops-practice/Imagenes/Foto25.png)


## Evaluación 

1. **Impacto de detectar la vulnerabilidad en una fase temprana del desarrollo:**
- **Reducción de Riesgos:** Detectar una vulnerabilidad en etapas tempranas minimiza el riesgo de comprometer la seguridad del sistema una vez en producción. Esto protege tanto a la empresa como a sus usuarios de posibles brechas de seguridad.
- **Costo y Esfuerzo:** Corregir una vulnerabilidad durante el desarrollo es mucho menos costoso y menos laborioso que hacerlo una vez que el producto está en el mercado. Las correcciones en producción pueden requerir despliegues de emergencia y parches rápidos que son disruptivos y costosos.
- **Consecuencias de qué hubiera pasado si la vulnerabilidad llegaba a producción:** Si una vulnerabilidad crítica llega a producción, podría resultar en la pérdida de datos sensibles, ataques de seguridad, y un daño considerable a la reputación de la empresa. Además, esto podría llevar a interrupciones del servicio mientras se trabaja en solucionar la vulnerabilidad, generando pérdidas financieras adicionales.

2. **Integración de DevSecOps para prevenir problemas de seguridad y reducir costos:**

- **Incorporación de Seguridad en el Ciclo de Vida:** DevSecOps integra prácticas de seguridad desde el inicio del desarrollo del software. Esto ayuda a identificar y mitigar vulnerabilidades de manera proactiva y a fomentar una cultura de seguridad continua entre los equipos de desarrollo.
- **Automatización de Procesos de Seguridad:** La automatización de pruebas de seguridad y revisiones de configuración ahorra tiempo y asegura que se mantengan estándares de seguridad consistentes. Esto no solo mejora la eficiencia operativa sino que también contribuye a reducir los costos asociados con las pruebas de seguridad manuales y los errores humanos.
- **Beneficios a Largo Plazo:** Adoptar un enfoque de DevSecOps puede resultar en un ahorro significativo de costos a largo plazo, reduciendo la necesidad de intervenciones costosas en etapas posteriores del desarrollo y durante la fase de producción, y manteniendo una postura de seguridad robusta en todo momento.


# **Ejercicio 2**

1. **Implementación**

- Para poder resolver la parte prática del Ejercicio2 usaremos nuestra carpeta `devops-practice` el cual contiene a los archivos Docker y Docker Compose:

```Dockerfile
# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]
```



```Docker-Compose

version: '3.8'  # Especifica la versión del archivo de configuración de Docker Compose
services:  # Define los servicios que se van a ejecutar
  app:  # Servicio para la aplicación principal
    build: .  # Construye la imagen Docker desde el Dockerfile en el directorio actual
    ports:
      - "3000:3000"  # Mapea el puerto 3000 del contenedor al puerto 3000 del host
    environment:
      - NODE_ENV=production  # Establece la variable de entorno NODE_ENV a 'production'

  prometheus:  # Servicio para Prometheus, un sistema de monitoreo
    image: prom/prometheus  # Usa la imagen oficial de Prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml  # Mapea el archivo de configuración de Prometheus al contenedor    ports:
      - "9090:9090"  # Mapea el puerto 9090 del contenedor al puerto 9090 del host

  grafana:  # Servicio para Grafana, una herramienta de visualización de datos
    image: grafana/grafana  # Usa la imagen oficial de Grafana
    ports:
      - "3001:3000"  # Mapea el puerto 3001 del host al puerto 3000 de Grafana dentro del contenedor

``` 

- Configuramos nuestro Docker-compose para usar variables de entorno de desarrollo y producción
  - Se modifica la variable de entorno `NODE ENV`:
    - Development: `NODE_ENV=development` y `DEBUG=true`. Esto activa las funciones de depuración y puede producir logs más verbosos, lo cual es útil durante el desarrollo para rastrear errores y comprender el comportamiento de la aplicación.
    - Production: `NODE_ENV=production. Esto optimiza la aplicación para el rendimiento en un entorno de producción, generalmente reduciendo la cantidad de logs detallados y ofreciendo respuestas de error más genéricas para seguridad.

- También tenemos que hacer un cambio en el archivo `app.js` 
![Descripción de la imagen](devops-practice/Imagenes/Foto26.png)

- Por último hacemos este cambio en docker-compose
![Descripción de la imagen](devops-practice/Imagenes/Foto27.png)

2. **Simulación**

- Se realiza el despliegue primero en un entorno de desarrollo y luego en producción
  - Primero se construye la imagen del Docker con el comando: `docker-compose build`
  ![Descripción de la imagen](devops-practice/Imagenes/Foto28.png)
    - **Para desarrollo:** Usamos el comando `docker-compose up app-dev` el cual inicia el servicio `app-dev` definido en el docker-compose.yml, que está configurado   para desarrollo. Esto incluirá la habilitación de volúmenes para el código fuente y el modo de depuración.

      ![Descripción de la imagen](devops-practice/Imagenes/Foto29.png)

      - ***Resultado Para Desarrollo***:
      ![Descripción de la imagen](devops-practice/Imagenes/Foto30.png)

    - **Para producción:** Usamos el comando `docker-compose up app-prod` el cual inicia el servicio `app-prod`, que está configurado para un entorno de producción, con las optimizaciones y configuraciones de seguridad correspondientes.

      ![Descripción de la imagen](devops-practice/Imagenes/Foto31.png)

      - ***Resultado Para Desarrollo***:
      ![Descripción de la imagen](devops-practice/Imagenes/Foto32.png)      
      
- Cambiamos de puerto que en este caso es el 5000 
![Descripción de la imagen](devops-practice/Imagenes/Foto33.png)

  - Desplegamos nuevamente, para esto reiniciamos el servidor para que el nuevo mapeo de puertos tenga efecto
    
    ![Descripción de la imagen](devops-practice/Imagenes/Foto34.png)

    - ***Resultado***
    ![Descripción de la imagen](devops-practice/Imagenes/Foto35.png)


3. **Evaluación**
- Compara la consistencia entre los entornos. ¿Cómo asegura IaC que ambos entornos se mantengan alineados?

- Discute cómo IaC ayuda a escalar aplicaciones en diferentes entornos.