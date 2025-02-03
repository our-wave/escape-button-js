# Escape Button JS

[![npm](https://img.shields.io/npm/v/escape-button-js)](https://www.npmjs.org/package/escape-button-js)
[![NPM](https://img.shields.io/npm/l/escape-button-js)](https://www.npmjs.org/package/escape-button-js)

🔒 Open source widget to help users quickly and discretely leave your website. Developed by the [Our Wave](https://www.ourwave.org) engineering team.

## Installation

There are two options for installing and using the Escape Button. If your project is set up to handle a Node.js environment, you can install via a the package manager of your choice (`npm` or `yarn`). Otherwise, you can simply add our CDN link to the pages you want to render the Escape Button.

### Step 1: Add HTML Component

The Escape Button is built to handle both situations where the user or browser does not have Javascript enabled and when it does. To accomplish this, the actual markup of the button needs to be added to each page on which you want to render the button.

```html
<div class="ow-screen-padding">
	<noscript
		><a href="https://www.amazon.com/?search=newest-deals-today/490239040234023942342i04203904"
			><div class="ow-leave-page-fab animate ow-leave-fab">
				<div class="ow-fab-icon"></div>
				<h3>Safety Exit</h3>
			</div></a
		></noscript
	>
	<div class="ow-leave-page-fab animate script-enabled ow-leave-fab">
		<div class="ow-fab-icon"></div>
		<h3>Safety Exit</h3>
	</div>
</div>
```

### Step 2: Install / Add Script

**Option 1:** Install the package with a package manager:

```sh
npm install escape-button-js --save
# or
yarn add escape-button-js
```

**Option 2:** Add the CDN link to the bottom of the `<body>` element on each page you want to render the button (make sure the link is below the component markup you added earlier):

```html
<script src="https://cdn.jsdelivr.net/npm/escape-button-js@1.0.5/dist/index.var.min.js"></script>
```

## Usage

<!-- prettier-ignore -->
```js
// Require module
const { EscapeButton } = require('escape-button-js');

// Enable escape button
EscapeButton(Options);
```

## Options

The following Options are available for the JS constructor:

-   `newTabUrl` updates the url that is instantaneously opened in a new tab
-   `replaceTabUrl` updates the url that replaces the current tab

## Custom Styling

It is possible to override the styling of the Escape Button in your own stylesheet by creating the following classes:

```css
.ow-screen-padding {
}

.ow-leave-page-fab {
}

.ow-leave-page-fab:hover {
}

.ow-leave-page-fab h3 {
}

.ow-leave-page-fab .ow-fab-icon {
}
```

## WordPress Version

We have also created a WordPress plugin version of the Escape Button for the community. [Check it out here](https://github.com/our-wave/escape-button-wordpress)!

## Resources

-   [MIT License](LICENSE.md)
-   [Contribution Guide](CONTRIBUTING.md)
-   [Code of Conduct](CODE_OF_CONDUCT.md)

## Links

-   [Our Wave Website](https://www.ourwave.org)
-   [Our Wave Community Guidelines](https://www.ourwave.org/community-guidelines)
-   [Our Wave News on X / Twitter](https://x.com/ourwavestories)
