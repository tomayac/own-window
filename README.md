# `<own-window>` Custom Element

A custom element to make sure demos run in their own window and not embedded as
an iframe. This can be useful for articles that embed a demo as an iframe, but
for the demo to work, the demo needs to run in the main window.

## Demo

See `<own-window>` in action in the [demo](https://tomayac.github.io/own-window/demo/).

## Usage

Embed your demo in your markdown element as usual.

```md
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.

## Demo

<iframe src="embedded-demo.html"></iframe>

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.
```

In the demo, include the custom element as shown below.

```html
<!-- In `embedded-demo.html` -->
<!DOCTYPE html>
<html>
  <head>
    <!-- Demo stuff. -->
    <script src="https://unpkg.com/own-window">
  </head>
  <body>
    <!-- Demo stuff. -->

    <own-window></own-window>

    <!-- Demo stuff. -->
  </body>
</html>
```

Change the `buttontext` attribute to choose your own button text (default:
"Click to open in its own window."), or the `href` attribute to choose your own
URL that opens when the element gets clicked (default: `location.href` of the
document that hosts the element).

```html
<own-window
  buttontext="Open in new window"
  href="https://example.com/"
></own-window>
```

You can also add arbitrary HTML if you want.

```html
<own-window>
  <div>Whatever you want…</div>
</own-window>
```
