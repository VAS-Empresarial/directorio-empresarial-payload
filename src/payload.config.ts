import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Categories from './collections/Categories';
import Services from './collections/Services';
import Businesses from './collections/Businesses';
import Media from './collections/Media';

export default buildConfig({
	serverURL: process.env.SERVER_URL,
	admin: {
		user: Users.slug,
	},
	collections: [
		Users,
		Categories,
		Services,
		Businesses,
		Media,
	],
	cors: [ // URLS to allow CORS requests from
		process.env.CLIENT_URL || '',
	],
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		//schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
		disable: true,
	},
});
