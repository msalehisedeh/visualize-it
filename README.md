# Welcome to visualize-it!

Have you ever wanted to visually look at a set of interconnected data and derive insightful information from it? 
Have you wondered how long will it take to do it? Well... wonder no more and add this component into your project... 

This code is copied and enhanced from http://bl.ocks.org/eyaler/10586116. The intension here is to make it easier to use and make it accessible to anular application.

[Live Demo](https://visualize-it.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualize-it/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/visualize-it/issues)


## Version 1.2.0
Added ability to see node types on hover and updated legend text.

## Version 1.1.0
Missed including the D3 library in the deployed product as angular packagr is not able to do it automatically. Also corrected the component name

## Version 1.0.0

```javascript
MODULE:
  VisualizeItModule

EXPORTS:
  VisualizeItComponent
```

## Component attributes
| Component attribute      |status    |Description                                                 |
|--------------------------|----------|------------------------------------------------------------|
|width                     |Required  |width of display area.                                      |
|height                    |Required  |height of display area.                                     |
|data                      |Required  |data containing node relationship to be displayed           |
|typeMapping               |Optional  |mapping types to help user using thie tool.                 |
|showTypeOnHover           |Optional  |Show the node type when hovering over it. Default is false. |
|enableLegends             |Optional  |allow user see the help section.                            |

## Data Attributes Structure
The JSON objects list passed in as data, should have the following attributes:

| Attribute                |status    |Description                                               |
|--------------------------|----------|----------------------------------------------------------|
|id                        |Required  |ID of the object.                                         |
|name                      |Required  |Name to be displayed.                                     |
|group                     |Required  |Group used to associate a color to all objects in the same group. |
|size                      |Required  |Size of the displayed node.                               |
|type                      |Optional  |Type of the node determining its shape if it is a square, circle, diamons, cross, tringle-up, or triangle-down. |
|sources                   |Optional  |List of IDs of other objects as a source to this one.     |
|destinations              |Optional  |List of IDs of other objects as a destination to this one.|


Type mapping will be used in legends section as a tool tip help.

| Type Mappings            |status    |Description                                               |
|--------------------------|----------|----------------------------------------------------------|
|circle                    |Optional  | Explain what it represents.                              |
|square                    |Optional  | Explain what it represents.                              |
|diamond                   |Optional  | Explain what it represents.                              |
|cross                     |Optional  | Explain what it represents.                              |
|triangle-up               |Optional  | Explain what it represents.                              |
|triangle-down             |Optional  | Explain what it represents.                              |


## So... How it can be done?

Run `npm install visualize-it` in your application. and do the following:

in your html:
```javascript
<visualize-it	
  [data]="myDataSet" 
  [typeMapping]="myTypeMapping" 
  enableLegends="true"
  showTypeOnHover="true"
  width="calc(100vw - 44px)" 
  height="400px"></visualize-it>

Where myTypeMapping is a mapping of shapes to explain them. For example, if you are including a circle you can identify what a circe represents.
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
