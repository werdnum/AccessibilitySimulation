( function( $, mw ) {
$( function() {
var $navBar = $( 'ul.navbar-right' ),
	$selectorPopup = $( '<div>My popup</div>' );
	selector = new OO.ui.DropdownWidget( {
		"label": "Vision simulation",
		"menu" : { 'items' : [
			new OO.ui.MenuOptionWidget( {
				'data' : '',
				'label' : 'No simulation',
				'selected' : true
			} ),
			new OO.ui.MenuOptionWidget( {
				'data' : 'protanopia',
				'label' : 'Protanopia',
			} ),
			new OO.ui.MenuOptionWidget( {
				'data' : 'deuteranopia',
				'label' : 'Deuteranopia',
			} ),
			new OO.ui.MenuOptionWidget( {
				'data' : 'tritanopia',
				'label' : 'Tritanopia',
			} ),
			new OO.ui.MenuOptionWidget( {
				'data' : 'monochromacy',
				'label' : 'Monochromacy',
			} ),
		] }
	} ),
	menu = selector.getMenu();

	$newItem = $( '<li/>' ).append( selector.$element );

	$newItem.prependTo( $navBar );

	menu.selectItem( menu.getItemFromData( '' ) );

	menu.on( 'select', function( item ) {
		var type = item.getData();

		$.each(
			['protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'],
			function( i, type ) {
				$( '.container' ).removeClass( 'as-' + type );
			}
		);

		if ( type ) {
			$( '.container' ).addClass( 'as-' + type );
		}
	} );
} );
} )( jQuery, mediaWiki );
