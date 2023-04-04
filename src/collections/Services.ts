import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';

const Services: CollectionConfig = {
  slug: 'services',
  labels: {
	singular: 'Servicio',
	plural: 'Servicios'
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
		name: 'category',
		label: 'Categoría',
		type: 'relationship',
		relationTo: 'categories',
		required: true,
	},
  ],
};

export default Services;
