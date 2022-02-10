require("dotenv").config();

export default {
	authorize: async (request: any, response: any, next: any) => {
		if (request.get("Authorization") !== process.env.API_MASTER_KEY) {
			return response.status(401).send("Invalid api master key");
		}
		next();
	},
};
