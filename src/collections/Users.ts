import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access';
import { roleOptions, UserRole } from '../roles';

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
	singular: 'Usuario',
	plural: 'Usuarios'
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
	{
		name: 'roles',
		saveToJWT: true,
		label: {
			singular: 'Rol',
			plural: 'Roles'
		},
		type: 'select',
		hasMany: true,
		options: roleOptions,
		defaultValue: UserRole.ContentManager,
		access: {
			// create: isAdminFieldLevel,
			// update: isAdminFieldLevel,
		},
	},
  ],
};

export default Users;