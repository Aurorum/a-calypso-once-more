import { useLocale } from '@automattic/i18n-utils';
import { useQuery } from '@tanstack/react-query';
import wpcomRequest, { canAccessWpcomApis } from 'wpcom-proxy-request';
import { SUPPORT_BLOG_ID } from '../constants';

export function useSupportArticleAlternatesQuery(
	blogId: number | string,
	postId: number,
	locale: string,
	queryOptions = {}
) {
	return useQuery( {
		queryKey: [ 'support-article-alternates', blogId, postId ],
		queryFn: () =>
			wpcomRequest< Record< string, { blog_id: number; page_id: number } > >( {
				path: `/support/alternates/${ blogId }/posts/${ postId }`,
				apiVersion: '1.1',
			} ),
		...queryOptions,
		enabled: locale !== 'en' && !! ( blogId && postId ),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		select: ( data ) => {
			return data[ locale ];
		},
	} );
}

export const getPostKey = ( blogId: number | string, postId: number ) => ( { blogId, postId } );

export const useSupportArticleAlternatePostKey = (
	blogId: number | string = SUPPORT_BLOG_ID,
	postId: number = 0
) => {
	const locale = useLocale();
	const supportArticleAlternates = useSupportArticleAlternatesQuery( blogId, postId, locale, {
		enabled: canAccessWpcomApis(),
	} );
	// Alternates don't work on Atomic.
	if ( supportArticleAlternates.isInitialLoading && canAccessWpcomApis() ) {
		return null;
	}

	if ( ! supportArticleAlternates.data ) {
		return getPostKey( blogId, postId );
	}

	return getPostKey( supportArticleAlternates.data.blog_id, supportArticleAlternates.data.page_id );
};
