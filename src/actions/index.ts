import { login } from "./login";
import { logout } from "./logout";
import * as siteActions from './site'

export const server = {
    login,
    logout,
    ...siteActions
};