import { r, $ } from '../helpers';
import * as support from '../support';
var prefix = 'mm-spn';
/**
 * Class for navigating in a mobile menu.
 */
var MmSlidingPanelsNavigation = /** @class */ (function () {
    /**
     * Class for navigating in a mobile menu.
     *
     * @param {HTMLElement} node            HTMLElement for the menu.
     * @param {string}      title           The title for the menu.
     * @param {string}      selectedClass   The class for selected listitems.
     * @param {boolean}     slidingSubmenus Whether or not to use sliding submenus.
     * @param {string}      theme           The color scheme for the menu.
     */
    function MmSlidingPanelsNavigation(node, title, selectedClass, slidingSubmenus, theme) {
        this.node = node;
        this.title = title;
        this.selectedClass = selectedClass;
        //  Add classname.
        this.node.classList.add(prefix);
        //  Sliding submenus not supported in IE11.
        if (support.IE11) {
            slidingSubmenus = false;
        }
        this.node.classList.add(prefix + "--" + theme);
        this.node.classList.add(prefix + "--" + (slidingSubmenus ? 'navbar' : 'vertical'));
        this._setSelectedl();
        this._initAnchors();
    }
    Object.defineProperty(MmSlidingPanelsNavigation.prototype, "prefix", {
        /** Prefix for the class. */
        get: function () {
            return prefix;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Open the given panel.
     *
     * @param {HTMLElement} panel Panel to open.
     */
    MmSlidingPanelsNavigation.prototype.openPanel = function (panel) {
        /** Title above the panel to open. */
        var title = panel.dataset.mmSpnTitle;
        /** Parent LI for the panel.  */
        var listitem = panel.parentElement;
        //  Opening the main level UL.
        if (listitem === this.node) {
            this.node.classList.add(prefix + "--main");
        }
        //  Opening a sub level UL.
        else {
            this.node.classList.remove(prefix + "--main");
            //  Find title from parent LI.
            if (!title) {
                r(listitem.children).forEach(function (child) {
                    if (child.matches('a, span')) {
                        title = child.textContent;
                    }
                });
            }
        }
        //  Use the default title.
        if (!title) {
            title = this.title;
        }
        //  Set the title.
        this.node.dataset.mmSpnTitle = title;
        //  Unset all panels from being opened and parent.
        $("." + prefix + "--open", this.node).forEach(function (open) {
            open.classList.remove(prefix + "--open");
            open.classList.remove(prefix + "--parent");
        });
        //  Set the current panel as being opened.
        panel.classList.add(prefix + "--open");
        panel.classList.remove(prefix + "--parent");
        //  Set all parent panels as being parent.
        var parent = panel.parentElement.closest('ul');
        while (parent) {
            parent.classList.add(prefix + "--open");
            parent.classList.add(prefix + "--parent");
            parent = parent.parentElement.closest('ul');
        }
    };
    /**
     * Initiate the selected listitem / open the current panel.
     */
    MmSlidingPanelsNavigation.prototype._setSelectedl = function () {
        /** All selected LIs. */
        var listitems = $('.' + this.selectedClass, this.node);
        /** The last selected LI. */
        var listitem = listitems[listitems.length - 1];
        /** The opened UL. */
        var panel = null;
        if (listitem) {
            panel = listitem.closest('ul');
        }
        if (!panel) {
            panel = this.node.querySelector('ul');
        }
        this.openPanel(panel);
    };
    /**
     * Initialize the click event handlers.
     */
    MmSlidingPanelsNavigation.prototype._initAnchors = function () {
        var _this = this;
        /**
         * Clicking an A in the menu: prevent bubbling up to the LI.
         *
         * @param   {MouseEvent}    evnt    The event.
         * @return  {boolean}       handled Whether or not the event was handled.
         */
        var clickAnchor = function (evnt) {
            /** The clicked element */
            var target = evnt.target;
            if (target.matches('a')) {
                //evnt.stopImmediatePropagation();
              //TODO make a option to allow default link behave like a link or not!
                return true;
            }
            return false;
        };
        /**
         * Click a LI or SPAN in the menu: open its submenu (if present).
         *
         * @param   {MouseEvent}    evnt    The event.
         * @return  {boolean}               Whether or not the event was handled.
         */
        var openSubmenu = function (evnt) {
            /** The clicked element */
            var target = evnt.target;
            /** Parent listitem for the submenu.  */
            var listitem;
            //  Find the parent listitem.
            if (target.closest('span')) {
                listitem = target.parentElement;
            }
            else if (target.closest('li')) {
                listitem = target;
            }
            else {
                listitem = false;
            }
            if (listitem) {
                r(listitem.children).forEach(function (panel) {
                    if (panel.matches('ul')) {
                        _this.openPanel(panel);
                    }
                });
                evnt.stopImmediatePropagation();
                return true;
            }
            return false;
        };
        /**
         * Click the menu (the navbar): close the last opened submenu.
         *
         * @param   {MouseEvent}    evnt    The event.
         * @return  {boolean}               Whether or not the event was handled.
         */
        var closeSubmenu = function (evnt) {
            /** The clicked element. */
            var target = evnt.target;
            /** The opened ULs. */
            var panels = $("." + prefix + "--open", target);
            /** The last opened UL. */
            var panel = panels[panels.length - 1];
            if (panel) {
                /** The second to last opened UL. */
                var parent_1 = panel.parentElement.closest('ul');
                if (parent_1) {
                    _this.openPanel(parent_1);
                    evnt.stopImmediatePropagation();
                    return true;
                }
            }
        };
        this.node.addEventListener('click', function (evnt) {
            var handled = false;
            handled = handled || clickAnchor(evnt);
            handled = handled || openSubmenu(evnt);
            handled = handled || closeSubmenu(evnt);
        });
    };
    return MmSlidingPanelsNavigation;
}());
export default MmSlidingPanelsNavigation;
