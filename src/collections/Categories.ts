import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';

const CategoryCollection: CollectionConfig = {
	slug: 'categories',
	labels: {
		singular: 'Categoría',
		plural: 'Categorías'
	},
	admin: {
		useAsTitle: 'name',
	},
	access: {
	read: () => true,
	create: isAdmin,
	update: isAdmin,
	delete: isAdmin,
	},
	fields: [
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'displayOrder',
			label: 'Orden de visualización',
			type: 'number',
			required: true,
			min: 1,
		},
	],
};

export default CategoryCollection;
