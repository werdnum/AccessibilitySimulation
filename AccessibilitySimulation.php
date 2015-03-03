<?php
/**
 * MediaWiki Extension: AccessibilitySimulation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * This program is distributed WITHOUT ANY WARRANTY.
 */

/**
 *
 * @file
 * @ingroup Extensions
 * @author Andrew Garrett
 */

# Alert the user that this is not a valid entry point to MediaWiki if they try to access the special pages file directly.
if ( !defined( 'MEDIAWIKI' ) ) {
	echo <<<EOT
To install this extension, put the following line in LocalSettings.php:
require_once( "$IP/extensions/AccessibilitySimulation/AccessibilitySimulation.php" );
EOT;
	exit( 1 );
}

// Extension credits that will show up on Special:Version
$wgExtensionCredits['specialpage'][] = array(
	'path' => __FILE__,
	'name' => 'AccessibilitySimulation',
	'url' => 'URL to extension information',
	'author' => array(
		'Andrew Garrett',
	),
	'descriptionmsg' => 'accessibilitysimulation-desc',
);

$dir = dirname( __FILE__ ) . '/';

$wgMessagesDirs['AccessibilitySimulation'] = $dir . 'i18n';

$wgResourceModules['ext.accessibility-simulation'] = array(
	'remoteExtPath' => 'AccessibilitySimulation',
	'localBasePath' => __DIR__,
	'group' => 'ext.accessibility-simulation',
	'styles' => 'filters.css',
	'scripts' => 'accessibility-switch.js',
	'dependencies' => 'oojs-ui',
	'messages' => array(
		'accessibility-simulation-none',
		'accessibility-simulation-protanopia',
		'accessibility-simulation-deuteranopia',
		'accessibility-simulation-tritanopia',
		'accessibility-simulation-monochromacy',
	),
);

$wgHooks['BeforePageDisplay'][] = function( $out ) {
	$out->addModules( 'ext.accessibility-simulation' );
};
