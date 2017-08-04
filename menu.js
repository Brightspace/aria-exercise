function initMenu(opener, items) {

	var menu = createMenu(opener, items);
	opener.parentNode.insertBefore(menu, opener.nextSibling);

	initOpener(opener, menu);

}

function initOpener(opener, menu) {

	opener.setAttribute('role', 'button');
	opener.setAttribute('href', '#');
	opener.setAttribute('aria-haspopup', 'true');
	opener.setAttribute('aria-controls', 'more-menu');

	var chevron = document.createElement('span');
	chevron.style.marginLeft = '3px';
	chevron.innerHTML = '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#ffffff" d="M2.39 6.49a1.5 1.5 0 0 1 2.12-.1L9 10.47l4.49-4.08a1.5 1.5 0 0 1 2.02 2.22L10 13.62A1.474 1.474 0 0 1 9 14a1.523 1.523 0 0 1-1-.38L2.49 8.61a1.5 1.5 0 0 1-.1-2.12z"/></svg>';
	opener.appendChild(chevron);

	opener.addEventListener('click', function() {
		var isOpen = opener.hasAttribute('aria-expanded');
		if (isOpen) {
			closeMenu(opener, menu, false);
		} else {
			openMenu(opener, menu);
		}
	});

	// close the menu if the user clicks anywhere
	document.addEventListener('click', function(evt) {

		var isOpen = opener.hasAttribute('aria-expanded');
		if (!isOpen || evt.target === opener) return;

		closeMenu(opener, menu, false);

	});

}

function createMenu(opener, items) {

	var menu = document.createElement('ul');
	menu.className = 'menu';
	menu.setAttribute('id', 'more-menu');
	menu.setAttribute('role', 'menu');
	menu.setAttribute('aria-labelledby', 'more-opener');

	for (var i=0; i<items.length; i++) {
		var item = createItem(items[i]);
		menu.appendChild(item);
	}

	var index = 0;
	menu.addEventListener('keydown', function(evt) {

		switch (evt.keyCode) {
			// escape
			case 27:
			// enter
			case 13:
			// tab
			case 9:
				closeMenu(opener, menu, true);
				return;
			// up
			case 38:
				index--;
				if (index === -1) {
					index = items.length - 1;
				}
				break;
			// down
			case 40:
				index++;
				if (index === items.length) {
					index = 0;
				}
				break;
		}

		evt.preventDefault();
		menu.children[index].firstChild.focus();

	});

	return menu;

}

function createItem(itemData) {

	var link = document.createElement('a');
	link.setAttribute('role', 'menuitem');
	link.setAttribute('href', '#');
	link.setAttribute('tabindex', '-1');
	link.innerText = itemData.text;

	var item = document.createElement('li');
	item.setAttribute('role', 'none');
	item.appendChild(link);

	return item;
}

function openMenu(opener, menu) {
	opener.setAttribute('aria-expanded', 'true');
	menu.style.display = 'block';
	menu.children[0].firstChild.focus();
}

function closeMenu(opener, menu, doFocus) {
	opener.removeAttribute('aria-expanded');
	menu.style.display = 'none';
	if (doFocus) {
		opener.focus();
	}
}
