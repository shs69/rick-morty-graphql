import { graphql } from "../gql/gql";

export const GET_CHARACTER = graphql(`
	query getFirstCharacter($id: ID!){
		character(id: $id) {
      image
			name
			status
			species
			location {
				name
			}
			episode {
				name
			}
		}
	}
`);

export const GET_CHARACTERS = graphql(`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        image
        name
        status
        species
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`);
