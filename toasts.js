function createToast(message) {

	// remove any existing toasts
	var otherToasts = document.querySelectorAll('.toast');
	for (var i=0; i<otherToasts.length; i++) {
		otherToasts[i].parentNode.removeChild(otherToasts[i]);
	}

	var elem = document.createElement('div');
	elem.className = 'toast';
	elem.setAttribute('role', 'alert');
	elem.innerText = message;

	document.body.appendChild(elem);

	// hide the toast after 5 seconds
	setTimeout(function() {
		if (elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}
	}, 5000);

}
