/*!
 * Mmenu Light v3.0.2
 * mmenujs.com/mmenu-light
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */

//	The module
import MmenuLight from '../esm/core/index';

//  Export module
export default MmenuLight;

if (typeof window !== 'undefined' && window) {
//	Global namespace
  window.MmenuLight = MmenuLight;
}