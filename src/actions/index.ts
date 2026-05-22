import { getAnalyticsAndSites } from "./get-analytics";
import { login } from "./login";
import { logout } from "./logout";
import * as siteActions from './site'
import { verifyTrackingScript } from "./verify-tracking-script";

export const server = {
    login,
    logout,
    ...siteActions,
    verifyTrackingScript,
    getAnalyticsAndSites
};