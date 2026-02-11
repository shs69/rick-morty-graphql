import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = () => {
	return (
		<div className="flex gap-2 items-center list-none justify-self-center">
			<NavigationMenu className="NAVIGATION-MENU">
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link to="/" className={navigationMenuTriggerStyle()}>
							Home
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link to="/characters" className={navigationMenuTriggerStyle()}>
							Characters
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenu>
		</div>
	);
};
