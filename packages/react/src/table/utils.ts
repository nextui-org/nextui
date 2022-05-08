import { TableCollection } from '@react-types/table';

export const isInfinityScroll = (collection: TableCollection<unknown>) => {
  const bodyProps = collection.body?.props;
  return (
    bodyProps?.loadingState !== undefined &&
    typeof bodyProps?.onLoadMore === 'function'
  );
};
