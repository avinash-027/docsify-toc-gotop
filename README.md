# docsify-toc-gotop

A Docsify plugin that adds a dynamic Table of Contents (TOC) sidebar with smooth scrolling and a "Back to Top" button, improving navigation on Docsify-powered documentation sites.

### Alternatives & Referred(Citations) Links

1. Page's ToC (Table of Contents) for Docsify: [justintien/docsify-plugin-toc](https://github.com/justintien/docsify-plugin-toc)
2. Docsify Table of Contents and Go Top: [jasperxu/docsify-jx-toc](https://github.com/jasperxu/docsify-jx-toc)

### Features

* Automatically generates a Table of Contents based on headers (default: h2 to h6) within the main content.
* Highlights the active section in the TOC as you scroll through the page.
* Smooth scrolling to sections when clicking on TOC entries.
* A "Back to Top" button appears when you scroll down, smoothly returning you to the top of the page.
* A responsive, collapsible TOC sidebar for smaller screens.

## Installation

### Pre-requisites

Before installing `docsfiy-toc-gotop`, make sure you have the following set up:

* A working [Docsify](https://docsify.js.org/#/quickstart) site.
* For better theming support, consider using [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/themes).

Now, Add the CSS and JavaScript files to your Docsify site:

Copy from

- [toc-top.css](https://github.com/avinash-027/docsify-toc-gotop/blob/main/lib/min/toc-top.1.css)
- [toc-top.js](https://github.com/avinash-027/docsify-toc-gotop/blob/main/lib/min/toc-top.1.js)

```html
<!-- Include CSS & JS files --> 
<link rel="stylesheet" href="toc-top.css" /> 
<script src="toc-top.js"></script>
```

## Usage

Configure the TOC plugin via the global `$docsify` object before Docsify initializes:

```js
<script>
  window.$docsify = {
    toc: {
      // CSS selectors for headings to include in TOC
      target: "h2, h3, h4, h5, h6",
      // Maximum heading level to include in TOC
      tocMaxLevel: 6,
      // Headers to ignore
      ignoreHeaders: ["<!-- {docsify-ignore} -->", "<!-- {docsify-ignore-all} -->"],
      // Hide TOC if the number of matched headings is less than or equal to this
      // min headings to show TOC, default 1 (hide if only 1)
      noTocIfHeadingsFoundIs: 1
    }
  };
</script>
```

This plugin automatically adds the TOC sidebar and "Back to Top" button to your Docsify site.

* Ensure your Docsify site has multiple header sections (`h2` to `h6`) for the TOC to generate.

### Customization

Can customize the plugin’s appearance by overriding CSS variables or applying custom classes:

* `--alt-bg-toc`: Sets the TOC background color (fallback for `--sidebar-border-color`)
* `--alt-color-toc`: Sets the text and icon color in the TOC (fallback for `--base-color`)

```css
:root {
  --alt-bg-toc: #fafafa;
  --alt-color-toc: #364149;
}
```

* **Note:** These `--alt-*` variables act as fallback values when [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/themes) is not in use or fails to load.

