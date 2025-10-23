import { useMemo } from 'react';
import { useListeningQuery } from 'sanity-plugin-utils';

import { getAllPageMetadata } from '../helpers/page-tree';
import { getAllRawPageMetadataQuery } from '../queries';
import { apiVersion } from '../sanity/api-version';
import { PageTreeConfig, RawPageMetadata } from '../types';

export const usePageTreeItem = (documentId: string, config: PageTreeConfig, perspective?: any) => {
  const { data, loading } = useListeningQuery<RawPageMetadata[]>(getAllRawPageMetadataQuery(config), {
    options: { apiVersion, perspective },
  });

  const pageTree = useMemo(() => getAllPageMetadata(config, (data ?? []) as RawPageMetadata[]), [config, data]);

  return {
    isLoading: loading,
    page: pageTree?.find(page => page._id === documentId),
  };
};