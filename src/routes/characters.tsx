import { useQuery } from "@apollo/client/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GET_CHARACTERS } from "@/apollo/queries";
import { HeroCard } from "@/components/hero-card";
import { useLastPage } from "@/components/page-provider";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { GetCharactersQuery } from "@/gql/graphql";
import { getPageNumbers } from "@/lib/utils";

export const Route = createFileRoute("/characters")({
	component: RouteComponent,
});

function RouteComponent() {
	const { lastPage, setLastPage } = useLastPage();
	const [page, setPage] = useState(lastPage);
	const { data } = useQuery<GetCharactersQuery>(GET_CHARACTERS, {
		variables: { page },
		fetchPolicy: "cache-and-network",
	});

	const goToPage = (p: number) => {
		setPage(p);
		setLastPage(p);
	};

	const characters = data?.characters?.results ?? [];
	if (!characters) return null;
	const validCharacters = characters.filter(
		(char): char is NonNullable<typeof char> => char !== null,
	);

	const totalPages = data?.characters?.info?.pages ?? 1;
	const pages = getPageNumbers(page, totalPages);
	return (
		<div className="pt-4 h-screen w-full flex flex-col overflow-hidden gap-5">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 flex-1 overflow-auto px-10 sm:px-20 md:px-15 xl:px-50 scroll-smooth no-scrollbar">
				{validCharacters.map((character) => (
					<HeroCard
						key={character.id}
						props={{
							id: character.id,
							image: character.image,
							name: character.name,
							status: character.status,
							species: character.species,
							lastLocation: character.location?.name,
							firstLocation: character.episode[0]?.name,
						}}
					/>
				))}
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (page > 1) goToPage(page - 1);
							}}
						/>
					</PaginationItem>

					{pages.map((p) =>
						p === "ellipsis" ? (
							<PaginationItem key={`ellipsis-${p}-${Math.random()}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={p}>
								<PaginationLink
									href="#"
									isActive={p === page}
									onClick={(e) => {
										e.preventDefault();
										goToPage(p);
									}}
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						),
					)}

					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (page < totalPages) goToPage(page + 1);
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
