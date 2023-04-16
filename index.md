# Práctica 10 

Gabi Vacaru, alu0101098340
<br>
Desarrollo de Sistemas Informáticos


## Índice de contenidos<a name="id0"></a>
  - [Ejercicio 1](#id1)

  - [Ejercicio 2](#id2)
    - [Añadir](#id2.1)
    - [Modificar](#id2.2)
    - [Eliminar](#id2.3)
    - [Listar](#id2.4)
    - [Mostrar](#id2.5)

  - [Ejercicio 3](#id3)

  ### Ejercicio 1<a name="id1"></a>
  Nos encontramos con un programa que utiliza el módulo 'fs' de Node.js para monitorear cambios en un archivo específico. Al ejecutar el programa, teneoms que poner un nombre de archivo como argumento, este verifica si el archivo existe, en caso afirmativo, comienza a monitorearlo. Cada vez que el archivo se modifica, el programa muestra un mensaje en la consola informando que el archivo ha sido modificado de alguna manera.

  Para ejecutar el programa, debemos poner el siguiente comando en la consola:
  ```bash
    node dist/ejercicio1.js <nombre_archivo>
    ```
    Para resumir el comportamiento de mismo lo voy a reducir a una tabla:

| Paso | Pila de llamadas                     | Registro de eventos API| Cola de manejadores | Mensajes consola                                    |
|------|--------------------------------------|------------------------|---------------------|-----------------------------------------------------|
| 1    | Vacía                                |                        |                     |                                                     |
| 2    | Función de devolución de llamada     |                        |                     |                                                     |
| 3    | Vacía                                |                        |                     | "Starting to watch file helloworld.txt"             |
| 4    |                                      | Evento 'change'        |                     | "File helloworld.txt is no longer watched"          |
| 5    |                                      |                        | Manejador 'change'  |                                                     |
| 6    | Manejador de eventos 'change'        |                        |                     | "File helloworld.txt has been modified somehow" (1) |
| 7    | Vacía                                |                        |                     |                                                     |
| 8    |                                      |                        | Manejador 'change'  |                                                     |
| 9    | Manejador de eventos 'change'        |                        |                     | "File helloworld.txt has been modified somehow" (2) |
| 10   | Vacía                                |                        |                     |                                                     |

