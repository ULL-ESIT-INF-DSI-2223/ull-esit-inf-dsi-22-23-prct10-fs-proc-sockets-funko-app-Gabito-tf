import * as net from "net";
import { exec } from "child_process";

const server = net.createServer((connection) => {
  console.log("Un cliente se ha conectado.");

  connection.on("data", (data) => {
    const { command, args } = JSON.parse(data.toString());

    console.log(`Ejecutando comando: ${command} ${args}`);

    exec(`${command} ${args}`, (error, stdout, stderr) => {
      if (error) {
        connection.write(JSON.stringify({ error: error.message }));
        return;
      }

      if (stderr) {
        connection.write(JSON.stringify({ error: stderr }));
        return;
      }

      connection.write(JSON.stringify({ result: stdout }));
    });
  });

  connection.on("close", () => {
    console.log("Un cliente se ha desconectado");
  });
});

server.listen(60500, () => {
  console.log("Esperanodo por clientes para la conexion.");
});
