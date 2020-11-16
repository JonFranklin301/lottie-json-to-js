# Lottie JSON to JS Converter

Convert [Lottie/BodyMovin](http://airbnb.io/lottie) .json animations to .js files

## Why?

The After Effects plugin [BodyMovin](https://exchange.adobe.com/creativecloud.details.12557.html) is a great way to export animations and play them on the web. These animations are exported as `.json` files however `.json` files need to be loaded from a web server, so if you're wanting to load a lottie animation on a local web page (a `.html` file being served from your file system) it will not work.

This app is an easy and convenient way to convert the `.json ` file to a `.js` file that **can** be read from a local web page.

I work with a lot these animation files that are frequently changed for different animations files. I also work with a team of motion graphics designers that are not developers. This app can be provided to a member of the team who can convert the file, drop the converted file in a folder and it's good to go - no coding knowledge required.

## How to Use

1. Download the app from the releases page.

2. Open the app, drag 'n' drop some `.json` files and click `Convert`.
   The `.js` files will be output in the same directory as the `.json` files.

3. Include the `.js` file that was created in the previous step in your `.html` file.
   This needs adding before configuring the lottie player with the animation.
   `html <script src="animation.js"></script> `
4. The animation is then globally available as `window.animationData` and can be used like this:
   ```javascript
   lottie.loadAnimation({
     container: element,
     renderer: 'svg',
     loop: true,
     autoplay: true,
     animationData: window.animationData,
   });
   ```

## Development

Simply clone down this repository, install dependencies, and get started.
The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
# clone this repo using git clone
git clone https://github.com/jonfranklin301/lottie-json-to-js-converter
cd lottie-json-to-js-converter

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```

This app is based on [`electron-webpack`](https://github.com/electron-userland/electron-webpack). See [`electron-webpack`'s documentation](https://webpack.electron.build/) for more info.

## License

MIT License
(c) Jon Franklin
