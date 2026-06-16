import { login } from "./login";
import { logout } from "./logout";
import * as websiteActions from '../modules/website/website.actions'
import { verifyTrackingScript } from "./verify-tracking-script";
import { dashboardActions } from "@/modules/dashboard/dashboard.actions";

export const server = {
    login,
    logout,
    ...websiteActions,
    verifyTrackingScript,
    dashboardActions
};