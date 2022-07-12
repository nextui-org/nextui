import algoliasearch from "algoliasearch/lite";
import {SearchOptions, MultipleQueriesQuery} from "@algolia/client-search";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || "";

interface Request {
  params: SearchOptions;
}

export type SearchRequest = Request & MultipleQueriesQuery;

export default function getAlgoliaClient() {
  const algoliaClient = algoliasearch(appId, apiKey);

  return {
    async search(requests: SearchRequest[]) {
      if (requests.every(({params: {query}}) => Boolean(query) === false)) {
        return {
          results: requests.map(() => {
            return {
              processingTimeMS: 0,
              nbHits: 0,
              hits: [],
              facets: {},
            };
          }),
        };
      }

      return algoliaClient.search(requests);
    },
    async searchForFacetValues(requests: any) {
      return algoliaClient.searchForFacetValues(requests);
    },
  };
}
