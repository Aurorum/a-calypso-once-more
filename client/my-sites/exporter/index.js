/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'controller';
import { navigation, siteSelection, sites } from 'my-sites/controller';
import { exportController } from './controller';

export default () => {
  page( '/exporter', siteSelection, sites, makeLayout, clientRender );
  
	page(
		'/exporter/:site_id?',
		siteSelection,
		navigation,
		exportController,
		makeLayout,
		clientRender
	);
}
