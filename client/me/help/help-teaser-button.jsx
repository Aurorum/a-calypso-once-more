/**
 * External dependencies
 */

import React from 'react';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import Banner from 'components/banner';

/**
 * Style dependencies
 */
import './help-teaser-button.scss';

export default localize( ( { title, description, href, onClick } ) => {
	return (
		<Banner
			icon= "help"
            onClick={ onClick }
            title={ title }
			href={ href }
			description={ description }
		/>
	);
} );
