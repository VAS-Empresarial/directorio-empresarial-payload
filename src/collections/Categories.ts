import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';
import { fas } from '@fortawesome/free-solid-svg-icons';
import CategoryDescription from '../components/CategoryDescription';

const iconOptions = Object.entries(fas)
	.map(([key, obj]) => {
		return {
			label: obj.iconName,
			value: key
		};
	});

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
	singular: 'Categoría',
	plural: 'Categorías'
  },
  admin: {
    useAsTitle: 'name',
	description: CategoryDescription,
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
		name: 'icon',
		label: {
			singular: 'Ícono',
			plural: 'Íconos'
		},
		type: 'select',
		options: iconOptions,
		required: true,
	},
  ],
};

export default Categories;
