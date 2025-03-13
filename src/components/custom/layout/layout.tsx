import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'
// import ProfileDropdown from './profile-dropdown'
import { ModeSwitcher } from './mode-switcher'
import { Separator } from '../../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../ui/sidebar'

const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const location = useLocation();
    return (
        <>
            
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex px-4 h-16 shrink-0 items-center gap-2 border-b justify-between sticky top-0 bg-background">
                            <div className="flex items-center gap-2 px-3">
                                <SidebarTrigger />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <div id="layout-breadcrumb" />
                            </div>
                            <div className="mr-2 flex items-center gap-2">
                                <ModeSwitcher />
                                {/* <ProfileDropdown />  */}
                            </div>
                        </header>
                        <>
                            <motion.div key={location.pathname} className="flex flex-1 flex-col gap-4 p-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {children}
                            </motion.div>
                        </>
                    </SidebarInset >
                </SidebarProvider >
        </>
    )
}

export default Layout

export const LayoutBreadcrumb = ({ children }: { children: React.ReactNode }) => {
    const [breadcrumbContainer, setBreadCrumbContainer] = useState(document.getElementById('layout-breadcrumb'));
    useEffect(() => {
        setBreadCrumbContainer(document.getElementById('layout-breadcrumb'));
    }, [])
    return breadcrumbContainer ? createPortal(children, breadcrumbContainer) : null;
}
