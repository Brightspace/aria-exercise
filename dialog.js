// https://www.w3.org/TR/wai-aria-practices/#dialog_modal
// example: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html

function setupDialogFocusTrap(dialog) {

	/**
	 * TODO: create a focus trap so that when the user tabs past the dialog,
	 * focus returns to the close button, and vice versa when tabbing in reverse.
	 * https://www.w3.org/TR/wai-aria-practices/#dialog_modal
	 */

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
		/**
		 * TODO: Pressing the ESC key while the dialog is open should close it.
		 */
		document.body.appendChild(overlay);
	}

	return overlay;

}

function setupCloseButton(dialog, opener) {

	var closeButton = dialog.querySelector('.dialog-close-button');
	if (closeButton) return closeButton;

	/**
	 * TODO: the close button has no textual label associated with it.
	 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
	 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
	 */
	closeButton = document.createElement('button');
	closeButton.className = 'dialog-close-button icon-button';
	closeButton.innerHTML = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="#565a5c" d="M29.56 27.44c.59.59.59 1.53 0 2.12-.29.29-.68.44-1.06.44s-.77-.15-1.06-.44L15 17.12 2.56 29.56c-.29.29-.68.44-1.06.44s-.77-.15-1.06-.44c-.59-.59-.59-1.53 0-2.12L12.88 15 .44 2.56c-.59-.58-.59-1.54 0-2.12.59-.59 1.53-.59 2.12 0L15 12.88 27.44.44c.59-.59 1.53-.59 2.12 0 .59.58.59 1.54 0 2.12L17.12 15l12.44 12.44z"/></svg>';
	closeButton.addEventListener('click', function() {
		closeDialog(dialog, opener);
	});

	dialog.insertBefore(closeButton, dialog.firstChild);

	return closeButton;

}

function hidePage() {
	/**
	 * TODO: when the modal is visible, the rest of the page should be "hidden"
	 * to assistive technology. Careful not to hide the overlay/dialog!
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
	 */
}

function showPage() {
	/**
	 * TODO: when the modal closes, reverse what was done to hide the page.
	 * https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
	 */
}

function openDialog(dialog, opener) {

	// creates the 'X' close button and wires it up to close the dialog
	var closeButton = setupCloseButton(dialog, opener);

	// TODO: this needs to be implemented
	setupDialogFocusTrap(dialog);

	// creates the transparent overlay
	// TODO: keyboard support for the ESC key needs to be implemented
	var overlay = setupOverlay(dialog, opener);

	// makes the dialog visible by moving it inside the overlay and
	// enabling the overlay
	overlay.appendChild(dialog);
	document.body.classList.add('overlay-enabled');

	/**
	 * TODO: move focus inside the dialog (the close button would be good)
	 * https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
	 */

	// once the dialog is open, we hide the rest of the page
	// TODO: needs to be implemented
	hidePage();

}

function closeDialog(dialog, opener) {

	var overlay = document.querySelector('.overlay');
	if (!overlay) return;

	// show the rest of the page
	// TODO: needs to be implemented
	showPage();

	/**
	 * TODO: return focus to the original opener of the dialog. Otherwise,
	 * focus gets lost and starts back at the beginning of the page.
	 * https://developer.mozilla.org/en/docs/Web/API/HTMLElement/focus
	 */

	// hides the dialog by moving it outside the overlay and disabling it
	document.body.appendChild(dialog);
	document.body.classList.remove('overlay-enabled');

}
