import { useQuery } from "@apollo/client/react";
import { createFileRoute } from "@tanstack/react-router";
import { GET_CHARACTER } from "@/apollo/queries";
import { HeroCard } from "@/components/hero-card";
import type { GetFirstCharacterQuery } from "@/gql/graphql";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data } = useQuery<GetFirstCharacterQuery>(GET_CHARACTER, {
		variables: { id: 1 },
		fetchPolicy: "cache-and-network",
	});
	const character = data?.character;
	if (!character) return null;

	return (
		<div className="flex flex-col justify-center items-center p-14 h-full gap-6">
			<div className="w-fit flex flex-col items-center gap-6">
				<h1 className="font-bold text-3xl mb">The Rick and Morty GraphQL</h1>
				<HeroCard
					props={{
						id: "1",
						image: character.image,
						name: character.name,
						status: character.status,
						species: character.species,
						lastLocation: character.location?.name,
						firstLocation: character.episode[0]?.name,
					}}
				/>
			</div>
		</div>
	);
}
