import { Home, User, Layers3, GlobeLock, Mail, Settings, ReceiptIndianRupee } from "lucide-react";


// SideBar Route Links 
export const sidebarRouteLinks = [
    {
      name: "Dashboard",
      href: "/",
      key: "dashboard",
      icon: Home,
      current: false,
    },
    {
      name: "Payment",
      href: "/payment",
      key: "payment",
      icon: GlobeLock,
      current: false,
    },
    {
      name: "Invoice",
      href: "/invoice",
      key: "invoice",
      icon: Layers3,
      current: false,
    },
    {
        name: "Clients",
        href: "/clients",
        key: "clients",
        icon: User,
        current: false,
      },
     
  ];


  // SideBar Contact  Route Links 
export const sidebarContactLinks = [
    {
      name: "Report",
      href: "/report",
      key: "report",
      icon: ReceiptIndianRupee,
      current: false,
    },
    {
      name: "Settings",
      href: "/settings",
      key: "settings",
      icon: Settings,
      current: false,
    },
    {
      name: "Notifications",
      href: "/notifications",
      key: "notifications",
      icon: Mail,
      current: false,
    },
   
  ];


// Footer Links
export const footerLinks = [
  { id:1,
    name: "Terms of Service",
    href: "#",
    key: "terms",
  },
  {
    id: 2,
    name: "Privacy Policy",
    href: "#",
    key: "privacy",
  },
  {
    id:3,
    name: "Contact",
    href: "#",
    key: "contact",
  },
  {
    id:4,
    name: "About",
    href: "#",
    key: "about",
  }
  ];

