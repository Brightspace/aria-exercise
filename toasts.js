function createToast(message) {

	// remove any existing toasts
	var otherToasts = document.querySelectorAll('.toast');
	for (var i=0; i<otherToasts.length; i++) {
		otherToasts[i].parentNode.removeChild(otherToasts[i]);
	}

	var elem = document.createElement('div');
	elem.className = 'toast';
	elem.innerText = message;
	/**
	 * TODO: ensure that the toast is announced to assistive technology
	 * https://www.w3.org/TR/wai-aria-practices/#alert
	 * https://www.w3.org/TR/wai-aria-practices/examples/alert/index.html
	 */

	document.body.appendChild(elem);

	// hide the toast after 5 seconds
	setTimeout(function() {
		if (elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	}, 5000);

}
