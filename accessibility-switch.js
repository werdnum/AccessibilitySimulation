/* global OO */
( function( $, mw ) {
function selectSimulation( type ) {
	$.each(
		['protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'],
		function( i, type ) {
			$( '.container' ).removeClass( 'as-' + type );
		}
	);

	if ( type ) {
		$( '.container' ).addClass( 'as-' + type );
	}
}

/* Lifted from http://stackoverflow.com/a/2880929 */
function decodeQueryString( query ) {
	var match,
	    search = /([^&=]+)=?([^&]*)/g,
	    decode = function (s) { return decodeURIComponent(s.replace('+', " ")); },
	    urlParams;

	query = query.substring(1);
	urlParams = {};
	while ( ( match = search.exec( query ) ) !== null )
	   urlParams[decode(match[1])] = decode(match[2]);

	return urlParams;
}

window.onpopstate = function( event ) {
	if ( event && event.state && event.state.simulation ) {
		selectSimulation( event.state.simulation );
	}
};

$( function() {
	var $navBar = $( 'ul.navbar-head' ),
		$dropdown = $( '<ul>' )
			.attr( {
				'role': 'menu',
				'aria-labelledby': 'Accessibility Simulation',
				'class': 'dropdown-menu accessibility-simulation-dropdown'
			} )
			.append(
				$( '<li>' ).append(
					$( '<a>' )
						.text( mw.msg( 'accessibility-simulation-none' ) )
						.data( 'name', '' )
				),
				$( '<li>' ).append(
					$( '<a>' )
						.text( mw.msg( 'accessibility-simulation-protanopia' ) )
						.data( 'name', 'protanopia' )
				),
				$( '<li>' ).append(
					$( '<a>' )
						.text( mw.msg( 'accessibility-simulation-deuteranopia' ) )
						.data( 'name', 'deuteranopia' )
				),
				$( '<li>' ).append(
					$( '<a>' )
						.text( mw.msg( 'accessibility-simulation-tritanopia' ) )
						.data( 'name', 'tritanopia' )
				),
				$( '<li>' ).append(
					$( '<a>' )
						.text( mw.msg( 'accessibility-simulation-monochromacy' ) )
						.data( 'name', 'monochromacy' )
				)
			),
		$dropdownButton = $( '<a>' )
			.attr( {
				'class': 'btn btn-default dropdown-toggle accessibility-simulation-button',
				'role': 'button',
				'data-toggle': 'dropdown',
				'aria-expanded': 'true'
			} ),
		queryParameters = decodeQueryString( window.location.search ),
		selectedSimulation = '';

		if ( 'simulation' in queryParameters )
			selectedSimulation = queryParameters.simulation;

		$navBar.append( $( '<li>' )
				.addClass( 'dropdown' )
				.append( $dropdownButton, $dropdown )
		);

		$('.accessibility-simulation-dropdown a').on( 'click', function() {
			var type = $( this ).data( 'name' ),
				newQueryParameters = decodeQueryString( window.location.search ),
				newUrl;

			selectSimulation( type );
			newQueryParameters.simulation = type;

			newUrl = '?' + $.param( newQueryParameters );

			if ( window.location.hash )
				newUrl += window.location.hash;

			window.history.pushState( {
					'simulation' : type
				},
				'',
				newUrl
			);
		} );
} );
} )( jQuery, mediaWiki );
