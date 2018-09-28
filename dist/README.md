# Welcome to visualize-it!

Have you ever wanted to visually look at a set of interconnected data and derive insightful information from it? 
Have you wondered how long will it take to do it? Well... wonder no more and add this component into your project... 

This code is copied and enhanced from http://bl.ocks.org/eyaler/10586116. The intension here is to make it easier to use and make it accessible to anular application.

[Live Demo](https://visualize-it.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualize-it/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/visualize-it/issues)


## Version 1.0.0

```javascript
MODULE:
  visualizeItModule

EXPORTS:
  visualizeItComponent
```

## So... How it can be done?

Run `npm install visualize-it` in your application. and do the following:

in your html:
```javascript
<visualize-it	[data]="myDataSet" width="calc(100vw - 44px)" height="400px"></visualize-it>
```

in your `.angular-cli.json` file include the following:
```javascript
  "apps": [
    {
      ....

      "assets": [
        "assets",
        { "glob": "**/*", "input": "../node_modules/visualize-it/assets/", "output": "./assets/" },
        "favicon.ico"
      ],

      ....

```


![alt text](https://raw.githubusercontent.com/msalehisedeh/visualize-it/master/sample.png  "What you would see when a visualize-it is used")
