import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import recordSignupStart from 'calypso/landing/stepper/declarative-flow/internals/analytics/record-signup-start';
import { adTrackSignupStart } from 'calypso/lib/analytics/ad-tracking';
import { gaRecordEvent } from 'calypso/lib/analytics/ga';
import { setSignupStartTime } from 'calypso/signup/storageUtils';
import { type Flow } from '../../types';

/**
 * Hook to track the start of a signup flow.
 */
interface Props {
	flow: Flow;
}

export const useSignUpStartTracking = ( { flow }: Props ) => {
	const [ queryParams ] = useSearchParams();
	const ref = queryParams.get( 'ref' ) || '';
	const flowVariant = flow.variantSlug;
	const flowName = flow.name;
	const isSignupFlow = flow.isSignupFlow;
	const signupStartEventProps = flow.useSignupStartEventProps?.();
	const extraProps = useMemo(
		() => ( {
			...signupStartEventProps,
			...( flowVariant && { flow_variant: flowVariant } ),
		} ),
		[ signupStartEventProps, flowVariant ]
	);

	/**
	 * Timers and other analytics
	 *
	 * Important: Ideally, this hook should only run once per signup (`isSignupFlow`) session.
	 * Avoid introducing more dependencies.
	 */
	useEffect( () => {
		if ( ! isSignupFlow ) {
			return;
		}

		setSignupStartTime();
		// Google Analytics
		gaRecordEvent( 'Signup', 'calypso_signup_start' );
		// Marketing
		adTrackSignupStart( flowName );
	}, [ isSignupFlow, flowName ] );

	useEffect( () => {
		if ( ! isSignupFlow ) {
			return;
		}

		recordSignupStart( { flow: flowName, ref, optionalProps: extraProps || {} } );
	}, [ isSignupFlow, flowName, ref, extraProps ] );
};
