import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';
import { fas, IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import CategoryDescription from '../components/CategoryDescription';

interface IconOption {
	label: IconName,
	value: string,
}

const IconOptionByIconNameMap = new Map<IconName, IconOption>();
const allIconEntries: [string, IconDefinition][] = Object.entries(fas);
allIconEntries.forEach(iconEntry => {
	const iconName = iconEntry[1].iconName
	const iconOption = IconOptionByIconNameMap.get(iconName);
	if (!iconOption) {
		IconOptionByIconNameMap.set(iconName, {
			label: iconName,
			value: iconEntry![0]
		});
	}
});
const iconOptions = Array.from(IconOptionByIconNameMap.values());

// Sort iconOptions by label
iconOptions.sort((a, b) => a.label.localeCompare(b.label));

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
			label: 'Ícono',
			type: 'select',
			options: iconOptions,
			required: true,
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

export default Categories;
