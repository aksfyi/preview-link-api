const rootHandler = (request, reply) => {
	reply.code(200).send({
		status: 200,
		message: "OK",
	});
};

module.exports = {
	rootHandler,
};
