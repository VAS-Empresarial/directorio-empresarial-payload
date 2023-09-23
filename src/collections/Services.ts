import { CollectionConfig, FieldHook } from 'payload/types';
import { isAdmin } from '../access';
import { fas, IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import ServicesDescription from '../components/ServicesDescriptionComponent';
import payload from 'payload';

const formatSlug: FieldHook = ({ data }) => {
	// Remove leading and trailing whitespaces
	const trimmedName = data!['pluralName'].trim();

	// Normalize to remove accents
	const normalizedString = trimmedName.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

	const slug = normalizedString
		.replace(/[^\w\s]/g, '') // Remove special characters
		.replace(/\s+/g, '-')    // Replace spaces with hyphens
		.toLowerCase();          // Convert to lowercase

	return slug;
}

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

const ServiceCollection: CollectionConfig = {
	slug: 'services',
	labels: {
		singular: 'Servicio',
		plural: 'Servicios'
	},
	admin: {
		useAsTitle: 'pluralName',
		description: ServicesDescription,
	},
	access: {
		read: () => true,
		create: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'slug',
			label: 'Slug',
			type: 'text',
			unique: true,
			admin: {
				position: 'sidebar',
				readOnly: true,
			},
			hooks: {
				beforeValidate: [
					formatSlug
				],
			},
		},
		{
			name: 'category',
			label: 'Categoría',
			type: 'relationship',
			relationTo: 'categories',
			required: true,
		},
		{
			name: 'pluralName',
			label: 'Nombre en plural',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'Usado al listar los servicios de cada categoría. Por ejemplo, en la categoría "Alimentación", se listan los servicios en plural: "Cafeterías", "Panaderías", etc.',
			},
		},
		{
			name: 'singularName',
			label: 'Nombre en singular',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'Usado al listar los servicios que brinda una empresa. Por ejemplo, un negocio que es "Cafetería" y "Panadería", sus servicios se listan en singular.',
			},
		},
		{
			name: 'icon',
			label: 'Ícono',
			type: 'select',
			options: iconOptions,
			required: true,
		},
	],
	hooks: {
		afterOperation: [({ args, operation, result }) => {
			if (operation === 'find' && args.where?.['slug']) {
				// If this is requested by the FE, return only the filtered service
				return result.docs[0];
			}

			return result; // return modified result as necessary
		}],
	},
};

export default ServiceCollection;
