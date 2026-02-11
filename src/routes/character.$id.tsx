import { useQuery } from "@apollo/client/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GET_CHARACTER } from "@/apollo/queries";
import { Button } from "@/components/ui/button";
import type { GetFirstCharacterQuery } from "@/gql/graphql";

export const Route = createFileRoute("/character/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const [imgError, setImgError] = useState(false);
	const navigate = useNavigate();
	const { id } = Route.useParams();
	const { data } = useQuery<GetFirstCharacterQuery>(GET_CHARACTER, {
		variables: { id: id },
		fetchPolicy: "cache-and-network",
	});

	const character = data?.character;
	if (!character) return;

	const showFallback = !character.image || imgError;

	return (
		<div className="h-full py-10 flex flex-col justify-center items-center gap-10 px-15 sm:px-30 md:px-50 xl:px-70">
			<div>
				{!showFallback ? (
					<img
						src={character.image ?? undefined}
						alt="RickImage"
						onError={() => setImgError(true)}
						className="h-75 w-75 rounded-xl object-cover border"
					/>
				) : (
					<div className="h-40 w-40 bg-muted rounded-lg flex justify-center items-center text-muted-foreground">
						Image must be there
					</div>
				)}
			</div>
			<div className="character_info flex flex-col justify-center items-center text-sm font-normal py-2 min-w-75">
				<p className="font-medium text-3xl px-2">{character.name}</p>
				<div className="flex justify-start items-center gap-1 text-lg">
					<div className="h-2 w-2 bg-green-500 rounded-full" />
					{character.status} - {character.species}
				</div>
				<p className="font-normal text-lg text-muted-foreground px-2 pt-1">
					Last known location:
				</p>
				<p
					className="px-2 text-lg"
					title={character.location?.name ?? undefined}
				>
					{character.location?.name}
				</p>
				<p className="font-normal text-lg text-muted-foreground px-2 pt-1">
					First seen in:
				</p>
				<p
					className="px-2 text-lg"
					title={character.episode[0]?.name ?? undefined}
				>
					{character.episode[0]?.name}
				</p>
			</div>
			<Button
				variant="outline"
				className="cursor-pointer shadow-sm hover:shadow-md
	              duration-100 transition-shadow"
				onClick={() => navigate({ to: `/characters` })}
			>
				Back
			</Button>
		</div>
	);
}
