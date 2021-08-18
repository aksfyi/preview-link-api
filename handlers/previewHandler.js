const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { IP_LIST, CORS_ORIGIN } = require("../configs");

const previewPreHandler = (request, reply, done) => {
	if (CORS_ORIGIN) {
		reply.header("Access-Control-Allow-Origin", CORS_ORIGIN);
	}
	if (IP_LIST) {
		let ip_list = IP_LIST.split(",");
		if (!ip_list.includes(request.ip)) {
			reply.code(400);
			done(new Error("You are not allowed to access the API"));
		}
	}
	done();
};

/**
 * Function to handle requests to /preview or /{ENDPOINT}
 * (ENDPOINT is an environment variable)
 */
const previewHandler = (request, reply) => {
	axios
		.get(request.query.url)
		.then((res) => {
			let previewDetails = parsePreviewDetails(res.data);
			if (previewDetails) {
				reply.code(200).send({
					url: request.query.url,
					...previewDetails,
				});
			} else {
				reply.code(500).send({
					statusCode: 500,
					error: "Internal Server Error",
					message: "Failed to parse the URL",
				});
			}
		})
		.catch((err) => {
			reply.code(400).send({
				statusCode: 400,
				error: "Bad Request",
				message: "Couldnt send request to URL, please check the URL",
			});
		});
};

/**
 * Function to get title , image and description from html
 * @param {*} htmlText html contents of the url
 * @returns {Object} Object with title ,image and description , returns 0 if there's any error
 */
const parsePreviewDetails = (htmlText) => {
	try {
		const $ = cheerio.load(htmlText);

		/**
		 * getMetaTagDetails searches for contents in different types metatag (Open Graph, Twitter etc)
		 * @param {String} tagName Name of the metatag
		 * @returns content of the met tag
		 */
		const getMetaTagDetails = (tagName) => {
			return (
				$(`meta[name=${tagName}]`).attr("content") ||
				$(`meta[name="og:${tagName}"]`).attr("content") ||
				$(`meta[name="twitter:${tagName}"]`).attr("content") ||
				$(`meta[property=${tagName}]`).attr("content") ||
				$(`meta[property="og:${tagName}"]`).attr("content") ||
				$(`meta[property="twitter:${tagName}"]`).attr("content")
			);
		};

		return {
			title: getMetaTagDetails("title") || $(`h1`).text() || "",
			img: getMetaTagDetails("image") || "",
			desc: getMetaTagDetails("description") || "",
		};
	} catch {
		return 0;
	}
};

module.exports = {
	previewPreHandler,
	previewHandler,
};
