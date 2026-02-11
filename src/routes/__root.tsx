import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/nav-menu";

// IN PROGRESS:
// const styleForHeader = "border border-ring rounded-lg py-0.5 px-2";

const RootLayout = () => (
	<>
		<div className="flex flex-col h-screen px-5 py-3 overflow-hidden ">
			<div className="grid grid-cols-3 w-full">
				<div className="justify-self-start font-medium text-sm flex items-center pl-2">
					Rick and Morty Heroes
				</div>
				<NavMenu />
				<ModeToggle />
			</div>
			<Outlet />
		</div>
	</>
);

export const Route = createRootRoute({ component: RootLayout });
