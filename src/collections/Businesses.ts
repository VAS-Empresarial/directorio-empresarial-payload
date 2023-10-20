import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';

const BusinessCollection: CollectionConfig = {
	slug: 'businesses',
	labels: {
		singular: 'Empresa',
		plural: 'Empresas'
	},
	admin: {
		useAsTitle: 'name',
	},
	access: {
		read: () => true,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
			required: true,
		},
		{
			name: 'logo',
			label: 'Logo',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'image',
			label: 'Imagen',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'description',
			label: 'Descripción',
			type: 'text',
		},
		{
			name: 'services',
			label: 'Servicio(s)',
			type: 'relationship',
			relationTo: 'services',
			hasMany: true,
			required: true,
		},
		{
			name: 'socialMedia',
			label: 'Redes Sociales',
			type: 'group',
			fields: [
				{
					name: 'website',
					label: 'Sitio Web',
					type: 'text',
					validate: validateURL,
				},
				{
					name: 'telephone',
					label: 'Teléfono',
					type: 'number',
				},
				{
					name: 'email',
					label: 'Correo',
					type: 'email',
				},
				{
					name: 'whatsApp',
					label: 'WhatsApp',
					type: 'number',
				},
				{
					name: 'facebook',
					label: 'Facebook',
					type: 'text',
					validate: validateURL,
				},
				{
					name: 'instagram',
					label: 'Instagram',
					type: 'text',
					validate: validateURL,
				},
			],
		},
		{
			name: 'isActive',
			label: 'Activo',
			type: 'checkbox',
			defaultValue: true,
		},
	],
	hooks: {
		afterOperation: [({ args, operation, result }) => {
			if (operation === 'find' && args.where?.['services.slug']) {
				// If this is requested by the FE, return only the docs
				return result.docs;
			}

			return result; // return modified result as necessary
		}],
	},
};

function validateURL(link: string): true | string {
	if (!link) {
		return true;
	}

	const errorText = "URL inválida";
	try {
		const url = new URL(link);
		return url.protocol === "https:" || errorText;
	} catch (error) {
		return errorText;
	}
}

export default BusinessCollection;
