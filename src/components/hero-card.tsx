import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type HeroCardProps = {
	id: string | null;
	image: string | null | undefined;
	name: string | null;
	status: string | null;
	species: string | null;
	lastLocation: string | null | undefined;
	firstLocation: string | null | undefined;
};

export const HeroCard = ({ props }: { props: HeroCardProps }) => {
	const navigate = useNavigate();
	const [imgError, setImgError] = useState(false);

	const showFallback = !props.image || imgError;

	return (
		<button
			type="button"
			className="flex flex-col justify-center items-center gap-4 p-3 border border-ring rounded-lg shadow-sm hover:shadow-xl
	              duration-100 transition-shadow cursor-pointer"
			onClick={() => navigate({ to: `/character/${props.id}` })}
		>
			<div>
				{!showFallback ? (
					<img
						src={props.image ?? undefined}
						alt="RickImage"
						onError={() => setImgError(true)}
						className="h-50 w-50 sm:h-44 sm:w-44 md:h-45 md:w-45 rounded-xl object-cover border"
					/>
				) : (
					<div className="h-40 w-40 bg-muted rounded-lg flex justify-center items-center text-muted-foreground">
						Image must be there
					</div>
				)}
			</div>
			<div className="character_info flex-1 flex flex-col justify-center items-start text-sm font-normal w-full py-2 rounded-lg bg-muted border">
				<p className="font-medium text-base px-2">{props.name}</p>
				<div className="flex justify-start items-center gap-1">
					<div className="ml-2 h-2 w-2 bg-green-500 rounded-full"></div>
					{props.status} - {props.species}
				</div>
				<p className="font-normal text-sm text-muted-foreground px-2 pt-1">
					Last known location:
				</p>
				<p
					className="px-2 text-sm truncate w-full text-left"
					title={props.lastLocation ?? undefined}
				>
					{props.lastLocation}
				</p>
				<p className="font-normal text-sm text-muted-foreground px-2 pt-1">
					First seen in:
				</p>
				<p
					className="px-2 text-sm truncate w-full text-left"
					title={props.lastLocation ?? undefined}
				>
					{props.firstLocation}
				</p>
			</div>
		</button>
	);
	// return (
	// 	<div className="flex flex-col justify-center items-center gap-4 p-3 md:p-5 border border-ring rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-100 w-full max-w-xs">
	// 		<div className="w-full">
	// 			{showFallback ? (
	// 				<div className="h-40 w-full bg-muted rounded-lg flex justify-center items-center text-muted-foreground">
	// 					Image must be there
	// 				</div>
	// 			) : (
	// 				<img
	// 					src={props.image ?? undefined}
	// 					alt="RickImage"
	// 					onError={() => setImgError(true)}
	// 					className="h-40 w-full sm:h-44 sm:w-44 md:h-45 md:w-45 rounded-xl object-cover border"
	// 				/>
	// 			)}
	// 		</div>

	// 		<div className="character_info flex flex-col justify-center items-start text-sm font-normal w-full py-2 rounded-lg bg-muted border">
	// 			<p
	// 				className="font-medium text-base px-2 truncate w-full"
	// 				title={props.name ?? undefined}
	// 			>
	// 				{props.name}
	// 			</p>
	// 			<div className="flex justify-end items-center gap-1 w-full">
	// 				<div className="ml-2 h-2 w-2 bg-green-500 rounded-full"></div>
	// 				<p
	// 					className="truncate w-full"
	// 					title={`${props.status} - ${props.species}`}
	// 				>
	// 					{props.status} - {props.species}
	// 				</p>
	// 			</div>

	// 			<p className="font-normal text-sm text-muted-foreground px-2 pt-1">
	// 				Last known location:
	// 			</p>
	// 			<p
	// 				className="px-2 text-sm truncate w-full"
	// 				title={props.lastLocation ?? undefined}
	// 			>
	// 				{props.lastLocation}
	// 			</p>

	// 			<p className="font-normal text-sm text-muted-foreground px-2 pt-1">
	// 				First seen in:
	// 			</p>
	// 			<p
	// 				className="px-2 text-sm truncate w-full"
	// 				title={props.firstLocation ?? undefined}
	// 			>
	// 				{props.firstLocation}
	// 			</p>
	// 		</div>
	// 	</div>
	// );
};
