(function() {

// runs once when the page is ready
function init() {
	initSearch();
	initSettings();
	initMoreMenu();
	var articles = document.querySelectorAll('article');
	for (var i=0; i<articles.length; i++) {
		initArticle(articles[i]);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

// initializes the "search" components
function initSearch() {

	var container = document.getElementById('search-container');
	var openButton = document.getElementById('search-open-button');
	var submitButton = document.getElementById('search-submit-button');
	var input = document.getElementById('search-input');

	function doSearch() {
		container.classList.remove('search-open');
		/**
		 * TODO: focus should move to the 'open search' button
		 * https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
		 */
		createToast('search complete');
	}

	openButton.addEventListener('click', function() {
		container.classList.add('search-open');
		/**
		 * TODO: focus should move to the search input
		 * https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
		 */
	});
	submitButton.addEventListener('click', doSearch);
	input.addEventListener('keydown', function(evt) {
		if (evt.keyCode === 13) {
			doSearch();
		}
	});

}

// initializes the settings button
function initSettings() {

	var settingsButton = document.getElementById('settings-button');
	var settingsDialog = document.getElementById('settings-dialog');

	settingsButton.addEventListener('click', function() {
		openDialog(settingsDialog, settingsButton);
	});

}

// initializes the "more" menu in the main navigation area
function initMoreMenu() {

	var items = [
		{text: 'Business', href: '/nowhere.html'},
		{text: 'Health', href: '/nowhere.html'},
		{text: 'Entertainment', href: '/nowhere.html'},
		{text: 'Tech & Science', href: '/nowhere.html'}
	];

	var opener = document.getElementById('more-opener');

	initMenu(opener, items);

}

// initializes each news article
function initArticle(article) {

	var iconHollow = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#565a5c" d="M17-.01H7.01c-1.65 0-3 1.35-3 3L4 22c0 .74.41 1.42 1.06 1.76.29.16.62.24.94.24.39 0 .77-.11 1.11-.34L12 20.4l4.89 3.26c.34.23.72.34 1.11.34.32 0 .65-.08.94-.24.65-.34 1.06-1.02 1.06-1.76V2.99c0-1.65-1.35-3-3-3zM18 22s-5.45-3.63-5.46-3.63c-.16-.1-.34-.16-.54-.16-.19 0-.37.05-.52.15C11.47 18.36 6 22 6 22l.01-19.01c0-.54.46-1 1-1H17c.54 0 1 .46 1 1V22z"/></svg>';
	var iconFilled = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#565a5c" d="M17 0H7.01a3.008 3.008 0 0 0-3 3L4 22a1.986 1.986 0 0 0 1.06 1.76 1.973 1.973 0 0 0 2.05-.1L12 20.4l4.89 3.26a1.973 1.973 0 0 0 2.05.1A1.986 1.986 0 0 0 20 22V3a3.008 3.008 0 0 0-3-3z"/></svg>';
	var textBookmarked = 'remove from read later list';
	var textNotBookmarked = 'read later';
	var toastBookmarked = 'article added to read later list';
	var toastNotBookmarked = 'article removed from read later list';
	var isBookmarked = false;

	// creates the "read later" (bookmark icon) button
	var readLater = document.createElement('button');
	readLater.className = 'icon-button icon-button-sm read-later';
	/**
	  * TODO: Button doesn't have a textual label. It should match the tooltip.
	  * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
	  */
	readLater.setAttribute('aria-label', textNotBookmarked);
	readLater.setAttribute('title', textNotBookmarked);
	readLater.innerHTML = iconHollow;
	readLater.addEventListener('click', function() {
		isBookmarked = !isBookmarked;
		readLater.innerHTML = isBookmarked ? iconFilled : iconHollow;
		readLater.setAttribute('title', isBookmarked ? textBookmarked : textNotBookmarked );
		createToast( isBookmarked ? toastBookmarked : toastNotBookmarked );
	});

	var heading = article.querySelector('h3');
	heading.parentNode.insertBefore(readLater, heading.nextSibling);

}

})();
