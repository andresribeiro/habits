import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

const PORT = 3333;

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`server running on http://localhost:${PORT}`);
