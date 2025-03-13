
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../../ui/sidebar";
// import { useUser } from "../../../hooks/useUser";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronRight,
  FolderIcon,
  HomeIcon,
  Network,
  Settings,
  TentTree,
  UserCog,
  UsersIcon,
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Projects",
      icon: FolderIcon,
      items: [
        {
          title: "Project List",
          url: "/projects",
        },
        {
          title: "Create Project",
          url: "/projects/create",
        },
      ],
    },
    {
      title: "Employees",
      icon: UsersIcon,
      items: [
        {
          title: "Employee List",
          url: "/employees",
        },
        {
          title: "Create Employee",
          url: "/employees/create",
        },
      ],
    },
    {
      title: "Role",
      icon: FolderIcon,
      items: [
        {
          title: "Role List",
          url: "/role",
        },
        {
          title: "Create Role",
          url: "/role/add-role",
        },
      ],
    },
    {
      title: "My Leaves",
      icon: TentTree,
      url: "/leaves",
    },
    // {
    //   title: "Team Leaves",
    //   icon: TentTree,
    //   url: "/team-leaves",
    // },
    {
      title: "Team Leaves",
      icon: TentTree,
      url: "/team-leaves",
    },
    {
      title: "Holidays",
      icon: CalendarCheck,
      url: "/holidays",
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        {
          title: "Departments",
          icon: Network,
          url: "/departments",
        },
        {
          title: "Skills",
          icon: UserCog,
          url: "/skills",
        },
        {
          title: "Jobs",
          icon: UserCog,
          url: "/job",
        },
      ],
    },
  ],
};



export const SidebarItem = (props: {
  title: string;
  icon?: React.ElementType;
  items?: {
    title: string;
    url: string;
  }[];
  url?: string;
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(
    location.pathname.startsWith(props.url ?? "")
  );

  if (props.items) {
    return (
      <Collapsible
        key={props.title}
        asChild
        defaultOpen={isOpen}
        onOpenChange={setIsOpen}
        open={isOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={props.title}>
              {props.icon && <props.icon />}
              <span>{props.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent forceMount>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { height: "auto", opacity: 1 },
                    closed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <SidebarMenuSub>
                    {props.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          size="md"
                          asChild
                          isActive={location.pathname === subItem.url}
                        >
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={location.pathname === props.url}>
        <Link to={props.url ?? "#"}>
          {props.icon && <props.icon />}
          <span>{props.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const user = useUser();
  // if (!user) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link className="flex items-center" to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  {/* <span className="font-semibold">{user?.company?.name}</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarItem key={item.title} {...item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
