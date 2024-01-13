/*!

=========================================================
* * NextJS Material Dashboard v1.0.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewListIcon from '@material-ui/icons/ViewList';

const dashboardRoutes = [
    {
        path: "/configurations?orgId=org:paid-active",
        name: "Configurations",
        icon: SettingsIcon,
        layout: "/admin",
    },
    {
        path: "/employees?orgId=org:paid-active",
        name: "Employés",
        icon: GroupIcon,
        layout: "/admin",
    },
    {
        path: "/roles",
        name: "Rôles",
        icon: AssignmentIndIcon,
        layout: "/admin",
    },
    {
        path: "/groups?orgId=org:paid-active",
        name: "Groupes ",
        icon: GroupIcon,
        layout: "/admin",
    },
    {
        path: "/expense-types?orgId=org:paid-active",
        name: "Catégories de dépense",
        icon: ViewListIcon,
        layout: "/admin",
    },
    {
        path: "/taxes?orgId=org:paid-active",
        name: "Taxes",
        icon: ViewListIcon,
        layout: "/admin",
    },

];

export default dashboardRoutes;
