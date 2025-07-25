import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosArrowDown } from "react-icons/io";
import {
    Camera,
    LayoutDashboard,
    User,
    Video,
    ShieldAlert,
} from "lucide-react";

function Navigations() {
    return (
        <div className="flex items-center justify-between py-4 px-6 border-b bg-black text-gray-200">
            {/* Logo */}
            <h1 className="text-lg font-bold sm:text-base md:text-lg">
                MANDLACX
            </h1>

            {/* Navigation */}
            <nav className="hidden sm:flex sm:space-x-4 md:space-x-8 sm:text-sm sm:font-medium">
                <Link
                    href="/dashboard"
                    className="flex items-center space-x-1 hover:text-gray-400"
                >
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Dashboard
                </Link>
                <Link
                    href="/cameras"
                    className="flex items-center space-x-1 hover:text-gray-400"
                >
                    <Camera className="h-4 w-4 mr-1" />
                    Cameras
                </Link>
                <Link
                    href="/scenes"
                    className="flex items-center space-x-1 hover:text-gray-400"
                >
                    <Video className="h-4 w-4 mr-1" />
                    Scenes
                </Link>
                <Link
                    href="/incidents"
                    className="flex items-center space-x-1 hover:text-gray-400"
                >
                    <ShieldAlert className="h-4 w-4 mr-1" />
                    Incidents
                </Link>
                <Link
                    href="/users"
                    className="flex items-center space-x-1 hover:text-gray-400"
                >
                    <User className="h-4 w-4 mr-1" />
                    Users
                </Link>
            </nav>

            {/* Avatar */}
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center">
                        <Avatar className="h-8 w-8 border">
                            <AvatarImage src="https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-2182970/" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="ml-2 text-sm">Mohmmad Ajas</span>
                            <span className="ml-2 text-xs text-gray-400">
                                ajas@mandiac.com
                            </span>
                        </div>
                        <IoIosArrowDown className="ml-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 bg-black text-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default Navigations;
