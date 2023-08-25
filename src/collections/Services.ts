import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';
import { fas, IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import ServicesDescription from '../components/ServicesDescription';
import payload from 'payload';

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
		useAsTitle: 'name',
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
			name: 'category',
			label: 'Categoría',
			type: 'relationship',
			relationTo: 'categories',
			required: true,
		},
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
	],
	endpoints: [
		{
			path: "/by-category",
			method: "get",
			handler: async (req, res, next) => {
				interface Category {
					id: string,
					name: string,
					displayOrder: number,
					services: Service[],
				};

				interface Service {
					id: string,
					name: string,
					icon: string,
					category?: Category,
				}

				const servicesData = await payload.find({
					collection: "services",
					//depth: 2,
					page: 1,
					limit: 0,
					//where: {}, // pass a `where` query here
					sort: "name",
				});

				if (!servicesData) {
					res.status(404).send({ error: "not found" });
					return;
				}

				const categoryMap = new Map<string, Category>();
				for (const service of servicesData.docs as Service[]) {
					const categoryId = service.category!.id;
					let category = categoryMap.get(categoryId);

					if (!category) {
						category = {
							id: service.category!.id,
							name: service.category!.name,
							displayOrder: service.category!.displayOrder,
							services: []
						};
						categoryMap.set(categoryId, category);
					}

					category.services.push({
						id: service.id,
						name: service.name,
						icon: service.icon,
					});
				}

				const categoriesWithServices: Category[] = Array.from(categoryMap.values())
					.sort((a, b) => a.name.localeCompare(b.name));

				res.status(200).send(categoriesWithServices);
			},
		},
	],
};

export default ServiceCollection;
