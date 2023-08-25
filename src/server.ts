import express, { Request, Response, NextFunction } from 'express';
import payload from 'payload';
import { hompageRoute } from './homepage-route';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
	res.redirect('/admin');
});

// Homepage data route
app.get('/api/homepage', hompageRoute);

const start = async () => {

	// Initialize Payload
	await payload.init({
		secret: process.env.PAYLOAD_SECRET || '',
		mongoURL: process.env.MONGODB_URI || false,
		express: app,
		onInit: async () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		},
	})

	// Add your own express routes here

	app.listen(3000);
}

start();
