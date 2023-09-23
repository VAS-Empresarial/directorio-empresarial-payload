import { buildConfig } from 'payload/config';
import path from 'path';
import UserCollection from './collections/Users';
import CategoryCollection from './collections/Categories';
import ServiceCollection from './collections/Services';
import BusinessCollection from './collections/Businesses';
import MediaCollection from './collections/Media';
import { getHompageDataHandler } from './endpoints/getHomepageDataEndpoint';

export default buildConfig({
	serverURL: process.env.SERVER_URL,
	admin: {
		user: UserCollection.slug,
	},
	collections: [
		UserCollection,
		CategoryCollection,
		ServiceCollection,
		BusinessCollection,
		MediaCollection,
	],
	endpoints: [
		{
			method: 'get',
			path: '/homepage',
			handler: getHompageDataHandler
		}
	],
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},
	graphQL: {
		//schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
		disable: true,
	},
	debug: true,
});
