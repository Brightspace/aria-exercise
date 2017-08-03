function initMenu(opener, items) {

	var menu = createMenu(opener, items);
	opener.parentNode.insertBefore(menu, opener.nextSibling);

	initOpener(opener, menu);

}

function initOpener(opener, menu) {

	/**
	 * TODO: Use ARIA to turn the opener into a "navigation menu button"
	 * https://www.w3.org/TR/wai-aria-practices/#menubutton
	 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
	 * https://www.w3.org/TR/wai-aria/roles#button
	 */
	opener.setAttribute('href', '#');

	var chevron = document.createElement('span');
	chevron.style.marginLeft = '3px';
	chevron.innerHTML = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#ffffff" d="M2.39 6.49a1.5 1.5 0 0 1 2.12-.1L9 10.47l4.49-4.08a1.5 1.5 0 0 1 2.02 2.22L10 13.62A1.474 1.474 0 0 1 9 14a1.523 1.523 0 0 1-1-.38L2.49 8.61a1.5 1.5 0 0 1-.1-2.12z"/></svg>';
	opener.appendChild(chevron);

	opener.addEventListener('click', function() {
		var isOpen = opener.classList.contains('menu-open');
		if (isOpen) {
			closeMenu(opener, menu, false);
		} else {
			openMenu(opener, menu);
		}
	});

	// close the menu if the user clicks anywhere
	document.addEventListener('click', function(evt) {

		var isOpen = opener.classList.contains('menu-open');
		if (!isOpen || evt.target === opener) return;

		closeMenu(opener, menu, false);

	});

}

function createMenu(opener, items) {

	/**
	 * TODO: Use ARIA to transform this list and its items into a menu.
	 * https://www.w3.org/TR/wai-aria-practices/#menubutton
	 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
	 * https://www.w3.org/TR/wai-aria/roles#menu
	 * https://www.w3.org/TR/wai-aria/roles#menuitem
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
	 */
	var menu = document.createElement('ul');
	menu.className = 'menu';
	menu.setAttribute('id', 'more-menu');

	for (var i=0; i<items.length; i++) {
		var item = createItem(items[i]);
		menu.appendChild(item);
	}

	menu.addEventListener('keydown', function(evt) {
		/**
		 * TODO: handle keyboard interactions from the user to adjust
		 * the selected menu item by focuses on it and expand/collapse the menu.
		 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
		 */
		switch (evt.keyCode) {
			// escape
			case 27:
			// enter
			case 13:
			// up
			case 38:
			// down
			case 40:
		}

		evt.preventDefault();

	});

	return menu;

}

function createItem(itemData) {

	/**
	 * TODO: Use ARIA to transform this list and its items into a menu.
	 * https://www.w3.org/TR/wai-aria-practices/#menubutton
	 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
	 * https://www.w3.org/TR/wai-aria/roles#menu
	 * https://www.w3.org/TR/wai-aria/roles#menuitem
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
	 */
	var link = document.createElement('a');
	link.setAttribute('href', '#');
	link.innerText = itemData.text;

	var item = document.createElement('li');
	item.appendChild(link);

	return item;
}

function openMenu(opener, menu) {
	opener.classList.add('menu-open');
	menu.style.display = 'block';
	/**
	 * TODO: focus should move inside the menu to the first item
	 */
}

function closeMenu(opener, menu, doFocus) {
	opener.classList.remove('menu-open');
	menu.style.display = 'none';
	if (doFocus) {
		/**
		 * TODO: focus should return to the opener
		 */
	}
}
