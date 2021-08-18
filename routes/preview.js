const {
	previewPreHandler,
	previewHandler,
} = require("../handlers/previewHandler");

const preview = (fastify, _, done) => {
	fastify.route({
		method: "GET",
		url: "/",
		schema: {
			querystring: {
				type: "object",
				properties: {
					url: { type: "string" },
				},
				required: ["url"],
			},
		},
		// this function is executed for every request before the handler is executed
		preHandler: previewPreHandler,
		handler: previewHandler,
	});
	done();
};

module.exports = {
	preview,
};
