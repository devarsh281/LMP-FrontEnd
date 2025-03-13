// import { Link, useNavigate } from 'react-router-dom'
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '../ui/dropdown-menu'
// import { useUser } from '@/hooks/useUser'
// import { trpc } from '@/trpc/client'
// import { LogOut, Settings } from 'lucide-react'

// const ProfileDropdown = () => {
//     const user = useUser()
//     const { data: image } = trpc.utility.getImage.useQuery({
//         path: user?.profilePhoto ?? ""
//     }, {
//         enabled: !!user?.profilePhoto
//     })
//     const utils = trpc.useUtils()
//     const navigate = useNavigate()
//     const logout = trpc.auth.logout.useMutation({
//         onSuccess: () => {
//             utils.auth.getUser.invalidate()
//             navigate('/login')
//         }
//     })
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger>
//                 <Avatar>
//                     <AvatarImage src={image ?? "https://github.com/shadcn.png"} />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align='end' className="w-60">
//                 <DropdownMenuLabel>
//                     <div className="flex items-center gap-2">
//                         <Avatar className="w-8 h-8">
//                             <AvatarImage src={image ?? "https://github.com/shadcn.png"} />
//                             <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div className="flex flex-col">
//                             <span className="text-base font-medium">
//                                 {user?.firstName} {user?.lastName}
//                             </span>
//                             <span className="text-xs text-muted-foreground">
//                                 {user?.email}
//                             </span>
//                         </div>
//                     </div>

//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="cursor-pointer" asChild>
//                     <Link to="/profile">
//                         <Settings className="w-4 h-4" />
//                         Settings
//                     </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="cursor-pointer" asChild>

//                     <div onClick={() => logout.mutate()}>
//                         <LogOut className="w-4 h-4" />
//                         Logout
//                     </div>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export default ProfileDropdown