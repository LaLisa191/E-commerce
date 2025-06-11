import startServer from "./src/app.js";

async function main() {
  try {
    await startServer(); // Esto ya hace connectDB y app.listen internamente
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
}

main();
