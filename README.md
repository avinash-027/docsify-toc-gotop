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

<img src="/assets/sc1.png" alt="darkMode ScreenShot" title="Dark Mode ScreenShot"/>
<img src="/assets/sc2.png" alt="@media (max-width: 900px) - ScreenShot" title="@media (max-width: 900px) - screenshot"/>
<img src="/assets/sc3.png" alt="light screenshot" title="Light Mode ScreenShot"/>

## Installation

### Pre-requisites

Before installing `docsfiy-toc-gotop`, make sure you have the following set up:

* A working [Docsify](https://docsify.js.org/#/quickstart) site.
* For better theming support, consider using [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/themes).

Now, Add the CSS and JavaScript files to your Docsify site:

Copy from

- [toc-top.css](https://github.com/avinash-027/docsify-toc-gotop/blob/main/lib/toc-top.css)
- [toc-top.js](https://github.com/avinash-027/docsify-toc-gotop/blob/main/lib/toc-top.js)

```html
<!-- Font Awesome for icons (Mandatory)-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- Include CSS & JS files --> 
<link rel="stylesheet" href="toc-top.css" /> 
<script src="toc-top.js"></script>
```

- Migrating from GitHub to jsDelivr: [jsdelivr.com/github](https://www.jsdelivr.com/github)
- Convert GitHub links to Statically CDN links: [statically.io/convert](https://statically.io/convert/)

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
      // Only display the Table of Contents if there are more than this number of headings.
      // If a page has only one heading, the TOC will remain hidden.
      // This setting is especially useful for cover pages with minimal headings.
      // default is 1 (hide if only 1)
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

