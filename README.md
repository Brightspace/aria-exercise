# aria-exercise

## What is this?

It's an accessibility exercise for playing around with [ARIA](https://www.w3.org/TR/wai-aria/).

![screenshot of the application](/screenshots/overview.png?raw=true)

This is a small sample application intended to look like a news site, the BBC -- Brightspace Broadcasting Corporation. The links don't go anywhere, the search doesn't work and the buttons don't really do anything.

Things generally "work" for a user with a mouse, but a keyboard-only user or someone using assistive technology such as a screen reader will have a very difficult time interacting with the application. Until we make some improvements!

## How do I run the application?

It's all static HTML, CSS and vanilla JavaScript -- no frameworks or building required. You should be able to just open `index.html` in your browser, or point a static web site library like [http-server](https://www.npmjs.com/package/http-server) at it.

The initial version of the application is also hosted here:
https://rawgit.com/Brightspace/aria-exercise/master/

## Where should my fixes go?

Start by cloning the repo and creating a branch. Commit your fixes there, but don't actually merge them into `master`.

Once your changes are pushed, others can visit your version of the application [using RawGit](https://rawgit.com/), by visiting:
`https://rawgit.com/Brightspace/aria-exercise/<branch-name>/`

## How do I use ARIA to fix the application?

There are many different parts of the application that could use some love -- they're listed out below. Some are quick fixes, others are more complex. Feel free to pick and choose where you spend your time!

If you'd rather just dive into the code, areas for improvement are called out in the HTML and JavaScript with `TODO`s.

### Landmarks (quick)

Landmarks identify different areas of the page, adding semantic meaning. While many landmarks have been made redundant by a lot of the new HTML5 elements like `<header>`, `<footer>` and so on, they can still add benefit to older assistive technology that doesn't yet support the new elements.

More: [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)

Some parts of the application that could benefit from landmarks roles:
* `<header>` element
* search `<div>` area
* `<nav` element
* `<main>` element
* `<footer>` element

### Icon Button Labels (quick)

There are several buttons that are just icons:
* Search (shows the search box)
* Settings (opens the settings dialog)
* Close (closes the dialog)
* Bookmark (adds/removes articles from the "read later" list)

![screenshot of icon buttons](/screenshots/icon-button-labels.png?raw=true)

While visually these icons are somewhat clear, they need textual labels. The [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) attribute could come in handy here.

Adding a tooltip using the `title` attribute could also be helpful for visual users!

### "More" Menu (less quick)

After the first six sections in the navigation area, four more sections are grouped behind a "More" menu. This menu is not keyboard accessible or screen-reader accessible.

![screenshot of more menu](/screenshots/more-menu.png?raw=true)

Use the [ARIA menu button links](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) pattern and add keyboard event listeners to improve the experience.

### Search (quick)

The search box is initially hidden and only displays itself when the search icon is clicked. Then when a search is performed, the search box hides itself again.

![screenshot of search](/screenshots/search.png?raw=true)

Unfortunately, focus management during this workflow is very poor, as it gets lost with each interaction.

Make some changes to the workflow so that focus goes to the input box when the search icon is pressed, and is returned to the search icon when a search is performed.

### Toasts (quick)

When certain actions are performed, a toast message is displayed to the user. This acts as a confirmation to the user that their interaction completed successfully.

The following actions display toast messages:
* Search is initiated
* Settings dialog "Apply" button is pressed
* Article is added or removed from the "read later" list

While visual users will see the toasts, they are not announced to screen readers. Use the [ARIA alert role](https://www.w3.org/TR/wai-aria-practices/#alert) to ensure screen reader users get the same experience.

### "Settings" Dialog (rather less quick)

Clicking the "settings" icon opens a modal dialog with a few checkboxes in it. The user can then "Apply" or "Cancel" their changes. The dialog is not keyboard or screen-reader accessible however.

![screenshot of settings dialog](/screenshots/dialog.png?raw=true)

Follow the instructions from the [ARIA best practices for modal dialogs](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) and the [ARIA dialog role](https://www.w3.org/TR/wai-aria-practices/#dialog_modal).
