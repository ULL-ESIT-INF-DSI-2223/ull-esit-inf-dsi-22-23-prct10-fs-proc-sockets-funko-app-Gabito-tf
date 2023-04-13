import net from "net";

const client = net.createConnection({ port: 60500 }, () => {
  console.log("Conectado al servidor.");

  const command = process.argv[2];
  const args = process.argv.slice(3).join(" ");

  client.write(JSON.stringify({ command, args }));
});

client.on("data", (data) => {
  const response = JSON.parse(data.toString());

  if (response.error) {
    console.error(response.error);
  }

  console.log(response.result);
  client.end();
});

client.on("end", () => {
  console.log("Desconectado del servidor.");
});
