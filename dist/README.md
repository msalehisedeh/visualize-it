# Welcome to visualize-it!

Have you ever wanted to visually look at a set of interconnected data and derive insightful information from it? 
Have you wondered how long will it take to do it? Well... wonder no more and add this component into your project... 

This code is copied and enhanced from http://bl.ocks.org/eyaler/10586116. The intention here is to make it easier to use and make it accessible to angular application.

[Live Demo](https://visualize-it.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualize-it/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/visualize-it/issues)


## Version 1.3.2
Trying to fix issue with stackblitz.

## Version 1.3.1
Fixed a logic on displaying data when request is sent for the second time.

## Version 1.3.0
Added Ability to display details of a node in tool-tip.

## Version 1.2.3
Added Arrows directionality on links. Updated code to allow you toggle displaying of arrows and toggle displaying of node categories with node names.

## Version 1.2.2
Legend information ended up displaying in single line after compilation and uploading to npm. fixed the issue.

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
|typeMapping               |Optional  |mapping types to help user using this tool.                 |
|showTypeOnHover           |Optional  |Show the node type when hovering over it. Default is false. |
|enableLegends             |Optional  |allow user see the help section.                            |
|showDirections            |Optional  |Display arrow directions on links.                          |
|enableTooltip             |Optional  |Display tool-tip on focus key down.                          |

## Data Attributes Structure
The JSON objects list passed in as data, should have the following attributes:

| Attribute                |status    |Description                                               |
|--------------------------|----------|----------------------------------------------------------|
|id                        |Required  |ID of the object.                                         |
|name                      |Required  |Name to be displayed.                                     |
|group                     |Required  |Group used to associate a color to all objects in the same group. |
|size                      |Required  |Size of the displayed node.                               |
|type                      |Optional  |Type of the node determining its shape if it is a square, circle, diamonds, cross, triangle-up, or triangle-down. |
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
  [data]="data.names" 
  [typeMapping]="data.roles" 
  enableLegends="true"
  showTypeOnHover="true"
  showDirections="true"
  width="calc(100vw - 44px)" 
  height="400px"></visualize-it>

Where typeMapping is a mapping of shapes to explain them. A sample data could be like the following:
{
    roles: {
      "circle": "Mentor",
      "diamond": "Student"
    },
    names: [
      {"id":"0", "size": 60, "group": 0, data: {age: 22, sex: "female", score: 5657567}, "name": "Andria", type:"circle", sources:["1","2"]},
      {"id":"1", "size": 10, "group": 2, data: {age: 32, sex: "female", score: 5756756}, "name": "Joshephine", type:"circle", sources:["3","4"]},
      {"id":"2", "size": 60, "group": 4, data: {age: 54, sex: "male", score: 2343423}, "name": "Alfred", type:"diamond", sources:["4"]},
      {"id":"3", "size": 10, "group": 6, data: {age: 43, sex: "female", score: 8675755}, "name": "Maya", type:"diamond"]},
      {"id":"4", "size": 60, "group": 8, data: {age: 33, sex: "male", score: 9678678}, "name": "Ali", type:"diamond"}
    ]
}
```

in your `.angular-cli.json` file include the following:
```javascript
  "apps": [
    {
      ....

      "assets": [
        "assets",
        { "glob": "**/*", "input": "../node_modules/visualize-it/src/assets/", "output": "./assets/" },
        "favicon.ico"
      ],

      ....

```


![alt text](https://raw.githubusercontent.com/msalehisedeh/visualize-it/master/sample.png  "What you would see when a visualize-it is used")
