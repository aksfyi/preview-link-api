const log = require("pino")({ level: "warn" });
const app = require("fastify")({ logger: log });

const { ENDPOINT, PORT } = require("./configs");

//Import routes
const { preview } = require("./routes/preview");
const { rootEndpoint } = require("./routes/rootRoute");

app.register(rootEndpoint);
app.register(preview, { prefix: ENDPOINT });

/**
 * Function start starts the server
 */
const start = async () => {
	try {
		await app.listen(PORT);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
