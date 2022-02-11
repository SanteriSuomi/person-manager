const Pool = require("pg-pool");
require("dotenv").config();

const connectionString = process.env.DATABASE_URI;

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

export default {
	query: async (text: string, params: Array<any>) => {
		return pool.query(text, params);
	},
};
