import * as websiteActions from '@/modules/website/website.actions'
import { login , logout } from "@/modules/auth/auth.actions";
import { dashboardActions } from "@/modules/dashboard/dashboard.actions";

export const server = {
    login,
    logout,
    ...websiteActions,
    dashboardActions
};