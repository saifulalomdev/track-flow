import { getAnalyticsAndSites } from "./get-analytics";
import { login } from "./login";
import { logout } from "./logout";
import * as websiteActions from '../modules/websites'
import { verifyTrackingScript } from "./verify-tracking-script";

export const server = {
    login,
    logout,
    ...websiteActions,
    verifyTrackingScript,
    getAnalyticsAndSites
};