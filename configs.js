require("dotenv").config();

CORS_ORIGIN = process.env.CORS_ORIGIN;
IP_LIST = process.env.IP_LIST;
ENDPOINT = process.env.ENDPOINT || "preview";
PORT = process.env.PORT || 3000;

module.exports = {
	CORS_ORIGIN,
	IP_LIST,
	ENDPOINT,
	PORT,
};
