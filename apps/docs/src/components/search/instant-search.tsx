import * as React from 'react';
import {
  InstantSearch as BaseInstantSearch,
  Configure
} from 'react-instantsearch-dom';
import getAlgoliaClient from '@lib/get-algolia';
import Autocomplete from './autocomplete';
import { useIsMobile } from '@hooks/use-media-query';

const searchClient = getAlgoliaClient();
const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

const InstantSearch: React.FC<unknown> = () => {
  const isMobile = useIsMobile();
  return (
    <BaseInstantSearch
      indexName={INDEX_NAME || 'prod_docs'}
      searchClient={searchClient}
    >
      <Configure hitsPerPage={isMobile ? 6 : 8} />
      <Autocomplete />
    </BaseInstantSearch>
  );
};

export default InstantSearch;
