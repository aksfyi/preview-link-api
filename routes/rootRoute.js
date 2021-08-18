const { rootHandler } = require("../handlers/rootHandler");

const rootEndpoint = (fastify, _, done) => {
	fastify.route({
		method: "GET",
		url: "/",
		handler: rootHandler,
	});
	done();
};

module.exports = {
	rootEndpoint,
};
