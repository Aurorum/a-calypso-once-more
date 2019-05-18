/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getSelectedSite } from 'state/ui/selectors';
import CompactCard from 'components/card/compact';

class DescriptiveHeader extends PureComponent {
	render() {
		const { translate } = this.props;

		const description = translate(
			'Import content from another site. Learn more about ' +
				'the import process in our {{a}}support documentation{{/a}}. ' +
				'Once you start importing, you can visit ' +
				'this page to check on the progress.',
			{
				components: {
					a: <a href="https://support.wordpress.com/import/" />,
				},
			}
		);

		return (
			<CompactCard>
				<header>
					<p className="importer__descriptive-header">
						{ description }
					</p>
				</header>
			</CompactCard>
		);
	}
}

export default connect( state => ( {
	site: getSelectedSite( state ),
} ) )( localize( DescriptiveHeader ) );
