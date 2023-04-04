import { Access } from "payload/config";
import { FieldAccess } from "payload/types";
import { User } from "./interfaces";
import { UserRole } from "./roles";

export const isLoggedIn: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user);
}

export const isSelf: Access = ({ req: { user }}) => {
	// Reject if not logged in
	if (!user) {
		return false;
	}

	// Only provide access to themselves
	return {
		id: {
			equals: user.id,
		}
	};
}

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
	return Boolean(user?.roles?.includes(UserRole.Admin));
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
	return Boolean(user?.roles?.includes(UserRole.Admin));
}
