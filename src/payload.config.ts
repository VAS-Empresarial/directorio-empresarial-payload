import { buildConfig } from 'payload/config';
import path from 'path';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
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
	plugins: [
		cloudStorage({
			enabled: process.env.CLOUD_STORAGE_ENABLED === 'true',
			collections: {
				'media': {
					adapter: s3Adapter({
						bucket: process.env.S3_BUCKET_NAME || '',
						config: {
							endpoint: process.env.S3_ENDPOINT,
							region: process.env.S3_REGION,
							credentials: {
								accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
								secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
							},
						},
					})
				},
			},
		}),
	],
});
