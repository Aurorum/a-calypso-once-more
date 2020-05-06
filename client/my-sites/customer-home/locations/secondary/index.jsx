/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import GoMobile from 'my-sites/customer-home/cards/features/go-mobile';
import GrowEarn from 'my-sites/customer-home/cards/features/grow-earn';
import LaunchSite from 'my-sites/customer-home/cards/features/launch-site';
import Stats from 'my-sites/customer-home/cards/features/stats';
import Support from 'my-sites/customer-home/cards/features/support';
import LearnGrow from './learn-grow';

const cardComponents = {
	'home-action-launch-site': LaunchSite,
	'home-feature-go-mobile-desktop': GoMobile,
	'home-feature-grow-and-earn': GrowEarn,
	'home-feature-stats': Stats,
	'home-feature-support': Support,
	'home-section-learn-grow': LearnGrow,
};

const Secondary = ( { cards } ) => {
	if ( ! cards ) {
		return null;
	}

	return (
		<>
			{ cards.map( ( card ) => {
				if ( ! cardComponents[ card ] ) {
					return null;
				}

				return React.createElement( cardComponents[ card ], {
					key: card,
				} );
			} ) }
		</>
	);
};

export default Secondary;
