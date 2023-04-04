import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';

const Media: CollectionConfig = {
	slug: 'media',
	labels: {
		singular: "Imagen",
		plural: "Librería Multimedia"
	},
	access: {
	  read: () => true,
	},
	upload: {
		staticURL: '/media',
    	staticDir: 'media',
    	imageSizes: [
			{
				name: 'thumbnail',
				width: 150,
				height: 150,
				position: 'centre',
			},
			{
				name: 'card',
				width: 768,
				// By specifying `undefined` or leaving a height undefined,
				// the image will be sized to a certain width,
				// but it will retain its original aspect ratio
				// and calculate a height automatically.
				height: undefined,
				position: 'centre',
			},
		],
		adminThumbnail: 'thumbnail',
		mimeTypes: ['image/*'],
	},
	fields: [],
};

export default Media;
