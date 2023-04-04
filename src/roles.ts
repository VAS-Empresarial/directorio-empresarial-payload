export enum UserRole {
	Admin = 'admin',
	ContentManager = 'contentManager',
}

export type Role = UserRole;

export const roleOptions = [
	{
		label: 'Administrador',
		value: UserRole.Admin
	},
	{
		label: 'Gestor de contenido',
		value: UserRole.ContentManager
	},
];
