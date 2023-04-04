import { Role } from "./roles";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles?: Role[];
	resetPasswordToken?: string;
	resetPasswordExpiration?: string;
	loginAttempts?: number;
	lockUntil?: string;
	createdAt: string;
	updatedAt: string;
}
