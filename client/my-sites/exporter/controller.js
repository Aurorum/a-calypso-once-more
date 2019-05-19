/**
 * External dependencies
 */

import React from 'react';
import page from 'page';

/**
 * Internal Dependencies
 */
import Main from './main';

export const exportController = ( context, next ) => {
	context.primary = <Exporter />;
	next();
};
