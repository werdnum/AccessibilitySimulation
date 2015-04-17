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
		selector = new OO.ui.DropdownWidget( {
			"label": mw.msg( 'accessibility-simulation' ),
			"menu" : { 'items' : [
				new OO.ui.MenuOptionWidget( {
					'data' : '',
					'label' : mw.msg( 'accessibility-simulation-none' ),
					'selected' : true
				} ),
				new OO.ui.MenuOptionWidget( {
					'data' : 'protanopia',
					'label' : mw.msg( 'accessibility-simulation-protanopia' )
				} ),
				new OO.ui.MenuOptionWidget( {
					'data' : 'deuteranopia',
					'label' : mw.msg( 'accessibility-simulation-deuteranopia' )
				} ),
				new OO.ui.MenuOptionWidget( {
					'data' : 'tritanopia',
					'label' : mw.msg( 'accessibility-simulation-tritanopia' )
				} ),
				new OO.ui.MenuOptionWidget( {
					'data' : 'monochromacy',
					'label' : mw.msg( 'accessibility-simulation-monochromacy' )
				} )
			] }
		} ),
		menu = selector.getMenu(),
		$newItem = $( '<li/>' ).append( selector.$element ),
		queryParameters = decodeQueryString( window.location.search ),
		selectedSimulation = '';

		if ( 'simulation' in queryParameters )
			selectedSimulation = queryParameters.simulation;

		$newItem.appendTo( $navBar );

		menu.on( 'select', function( item ) {
			var type = item.getData(),
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

		menu.selectItem( menu.getItemFromData( selectedSimulation ) );
} );
} )( jQuery, mediaWiki );
