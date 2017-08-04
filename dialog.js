// https://www.w3.org/TR/wai-aria-practices/#dialog_modal
// example: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html

function setupDialogFocusTrap(dialog) {

	var closeButton = dialog.querySelector('.dialog-close-button');

	var firstStop = dialog.querySelector('.dialog-first-tabstop');
	if (!firstStop) {
		firstStop = document.createElement('div');
		firstStop.tabIndex = 0;
		firstStop.addEventListener('focus', function() {
			var buttons = dialog.querySelectorAll('button');
			buttons[buttons.length-1].focus();
		});
		dialog.insertBefore(firstStop, dialog.firstChild);
	}

	var lastStop = dialog.querySelector('.dialog-laset-tabstop');
	if (!lastStop) {
		lastStop = document.createElement('div');
		lastStop.tabIndex = 0;
		lastStop.addEventListener('focus', function() {
			closeButton.focus();
		});
		dialog.appendChild(lastStop);
	}

}

function setupOverlay(dialog, opener) {

	var overlay = document.querySelector('.overlay');

	if (!overlay) {
		overlay = document.createElement('div');
		overlay.className = 'overlay';
		overlay.addEventListener('click', function(evt) {
			if (evt.target === overlay || evt.target.classList.contains('button')) {
				closeDialog(dialog, opener);
			}
			if (evt.target.classList.contains('button-primary')) {
				createToast('settings saved successfully');
			}
		});
		document.body.appendChild(overlay);
		document.addEventListener('keydown', function(evt) {
			if (evt.keyCode === 27 && document.body.classList.contains('overlay-enabled')) {
				closeDialog(dialog, opener);
			}
		});
	}

	return overlay;

}

function setupCloseButton(dialog, opener) {

	var closeButton = dialog.querySelector('.dialog-close-button');
	if (closeButton) return closeButton;

	closeButton = document.createElement('button');
	closeButton.className = 'dialog-close-button icon-button';
	closeButton.setAttribute('aria-label', 'Close');
	closeButton.innerHTML = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="#565a5c" d="M29.56 27.44c.59.59.59 1.53 0 2.12-.29.29-.68.44-1.06.44s-.77-.15-1.06-.44L15 17.12 2.56 29.56c-.29.29-.68.44-1.06.44s-.77-.15-1.06-.44c-.59-.59-.59-1.53 0-2.12L12.88 15 .44 2.56c-.59-.58-.59-1.54 0-2.12.59-.59 1.53-.59 2.12 0L15 12.88 27.44.44c.59-.59 1.53-.59 2.12 0 .59.58.59 1.54 0 2.12L17.12 15l12.44 12.44z"/></svg>';
	closeButton.addEventListener('click', function() {
		closeDialog(dialog, opener);
	});

	dialog.insertBefore(closeButton, dialog.firstChild);

	return closeButton;

}

function hidePage() {
	var thingsToHide = document.body.children;
	for (var i=0; i<thingsToHide.length; i++) {
		if (!thingsToHide[i].classList.contains('overlay')) {
			thingsToHide[i].setAttribute('aria-hidden', 'true');
		}
	}
}

function showPage() {
	var thingsToShow = document.body.children;
	for (var i=0; i<thingsToShow.length; i++) {
		thingsToShow[i].removeAttribute('aria-hidden');
	}
}

function openDialog(dialog, opener) {

	// creates the 'X' close button and wires it up to close the dialog
	var closeButton = setupCloseButton(dialog, opener);

	setupDialogFocusTrap(dialog);

	// creates the transparent overlay
	var overlay = setupOverlay(dialog, opener);

	// makes the dialog visible by moving it inside the overlay and
	// enabling the overlay
	overlay.appendChild(dialog);
	document.body.classList.add('overlay-enabled');

	closeButton.focus();

	// once the dialog is open, we hide the rest of the page
	hidePage();

}

function closeDialog(dialog, opener) {

	var overlay = document.querySelector('.overlay');
	if (!overlay) return;

	// show the rest of the page
	showPage();

	opener.focus();

	// hides the dialog by moving it outside the overlay and disabling it
	document.body.appendChild(dialog);
	document.body.classList.remove('overlay-enabled');

}
