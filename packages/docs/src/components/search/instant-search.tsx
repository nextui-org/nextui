import * as React from 'react';
import {
  InstantSearch as BaseInstantSearch,
  Configure,
} from 'react-instantsearch-dom';
import getAlgoliaClient from '@lib/get-algolia';
import Autocomplete from './autocomplete';

const searchClient = getAlgoliaClient();

const InstantSearch: React.FC<unknown> = () => {
  return (
    <BaseInstantSearch indexName="prod_docs" searchClient={searchClient}>
      <Configure hitsPerPage={8} />
      <Autocomplete />
    </BaseInstantSearch>
  );
};

export default InstantSearch;
