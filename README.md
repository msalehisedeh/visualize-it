# Welcome to visualize-it!

Have you ever wanted to visually look at a set of interconnected data and derive insightful information from it? 
Have you wondered how long will it take to do it? Well... wonder no more and add this component into your project... 

This code is copied and enhanced from http://bl.ocks.org/eyaler/10586116. The intention here is to make it easier to use and make it accessible to angular application.

**NOTE:** Starting with version 1.5.1 all previous versions are deprecated and you need to import this library through @sedeh/visualize-it. Future bug fixes / enhancements will be on @sedeh scope.

[Live Demo](https://visualize-it.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualize-it/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/visualize-it/issues)


```javascript
MODULE:
  VisualizeItModule

EXPORTS:
  VisualizeItComponent
```

## Component attributes
| Component attribute      |status    |Description                                                 |
|--------------------------|----------|------------------------------------------------------------|
|visualizerId              |Optional  |ID of the object.                                           |
|width                     |Required  |Width of display area.                                      |
|height                    |Required  |Height of display area.                                     |
|data                      |Required  |Data containing node relationship to be displayed           |
|typeMapping               |Optional  |Mapping types to help user using this tool.                 |
|showTypeOnHover           |Optional  |Show the node type when hovering over it. Default is false. |
|gradientsEnabled          |Optional  |Display nodes with gradient color. Default is true.         |
|enableLegends             |Optional  |Allow user see the help section.                            |
|showDirections            |Optional  |Display arrow directions on links.                          |
|enableTooltip             |Optional  |Display tool-tip on focus key down.                         |
|outlineNodes              |Optional  |Display nodes with color outline or fill color.             |
|repealForce               |Optional  |Repeal will define the space between nodes. Default is 300  |
|fixedDistance             |Optional  |Define the distance between connected nodes. Default is 60  |
|showCurvedConnections     |Optional  |Display node connections in curves or straight lines. Default is false pertaining to straight lines.|


## Data Attributes Structure
The JSON objects list passed in as data, should have the following attributes:

| Attribute                |status    |Description                                               |
|--------------------------|----------|----------------------------------------------------------|
|id                        |Required  |ID of the object.                                         |
|name                      |Required  |Name to be displayed.                                     |
|group                     |Required  |Group used to associate a colour to all objects in the same group. |
|size                      |Required  |Size of the displayed node.                               |
|type                      |Optional  |Type of the node determining its shape if it is a square, circle, diamonds, cross, triangle-up, or triangle-down. |
|sources                   |Optional  |List of IDs of other objects as originator of a node.     |
|destinations              |Optional  |List of IDs of other objects as a descendant of a node.   |
|image                     |Optional  |URL of image to be displayed as a node. Currently works best if node is of type circle.|


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
  visualizerId="myVisualizationInstance"
  enableLegends="true"
  enableTooltip="true"
  gradientsEnabled="false"
  showTypeOnHover="true"
  showDirections="true"
  showCurvedConnections="true"
  width="calc(100vw - 44px)" 
  height="400px"></visualize-it>

Where typeMapping is a mapping of shapes to explain them. A sample data could be like the following:
{
    roles: {
      "circle": "Mentor",
      "diamond": "Student"
    },
    names: [
      {"id":"0", "size": 60, "group": 0, data: {age: 22, gender: "female", score: 5657567}, "name": "Andrea", type:"circle", sources:["1","2"]},
      {"id":"1", "size": 10, "group": 2, data: {age: 32, gender: "female", score: 5756756}, "name": "Josephine", type:"circle", sources:["3","4"]},
      {"id":"2", "size": 60, "group": 4, data: {age: 54, gender: "male", score: 2343423}, "name": "Alfred", type:"diamond", sources:["4"]},
      {"id":"3", "size": 10, "group": 6, data: {age: 43, gender: "female", score: 8675755}, "name": "Maya", type:"diamond"]},
      {"id":"4", "size": 60, "group": 8, data: {age: 33, gender: "male", score: 9678678}, "name": "Ali", type:"diamond"}
    ]
}
```

for projects started with angular 2, 4, or 5 and upgraded to 6.
In your `.angular-cli.json` file include the following:
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

for projects started with angular 6 your `angular.json` file include the following:
```javascript
  "architect": [
    {
      ....

      "assets": [
        "assets",
        { "glob": "**/*", "input": "./node_modules/visualize-it/src/assets/", "output": "./assets/" },
        "favicon.ico"
      ],

      ....

```

## Versions

|Version|Description                                                           |
|-------|----------------------------------------------------------------------|
| 2.0.0 |Updating to Angular 8.                                                |
| 1.5.5 |Apparently stackblitz.io have issues with injecting Renderer or childview in a vomponent. found a solution by instantiating renderer thruogh renderer factory. |
| 1.5.4 |Fixing issue with stackblitz.io                                       |
| 1.5.3 |Fix missing d3 file. My build process is not automatically copy files and sometimes i forget to do it. |
| 1.5.2 |Fixing issue with stackblitz.io                                       |
| 1.5.1 |Fix dependencies.                                                     |
| 1.5.0 |It was brought to my attention that some users have trouble using my components in their angular 6 environment. Since I had only updated few dependencies when moved to Angular 6, I am thinking dependencies are causing issues. So, for this release, I am updating all dependencies to what Angular 6 applications are expecting to have. Please let me know if this is fixing or not fixing any issues you are facing. |
| 1.4.0 |Added ability to display nodes with gradient colors to make it look a bit three dimensional and more visually attractive. |
| 1.3.9 |Realized under certain situations, you may want to have control over the spaces between nodes. As a result, I made the hard coded values available to you. Now you can define how close you want the nodes to be with respect to each other. |
| 1.3.8 |Explanation of node relationship was confusing to myself. As a result, decided to clarify it. |
| 1.3.7 |Disabled the event handling of full screen expansion on mac OS. There is a known problem with webkit on mac OS (https://bugs.chromium.org/p/chromium/issues/detail?id=138368) which caused problem with full-screen/escape event handling. |
| 1.3.6 |Added option to display connections between nodes in curves or straight lines. Added option to outline or fill Nodes. |
| 1.3.5 |Added ability to stop/resume animation. Added indicator of zoom level. Added ability show node size or normalize node size on zoom. |
| 1.3.4 |Added ability to lock nodes after dragging. On Initial time, centring the view. Added ability to warn if any part of the network do not have a matching node. Fixed escaping view problem when user clicks on escape key. |
| 1.3.3 |Added ability to show the graph in full screen mode.                  |
| 1.3.2 |Trying to fix issue with stackblitz.                                  |
| 1.3.1 |Fixed a logic on displaying data when request is sent for the second time. |
| 1.3.0 |Added Ability to display details of a node in tool-tip.               |
| 1.2.3 |Added Arrows directionality on links. Updated code to allow you toggle displaying of arrows and toggle displaying of node categories with node names. |
| 1.2.2 |Legend information ended up displaying in single line after compilation and uploading to npm. fixed the issue. |
| 1.2.0 |Added ability to see node types on hover and updated legend text.     |
| 1.1.0 |Missed including the D3 library in the deployed product as angular packagr is not able to do it automatically. Also corrected the component name |
| 1.0.0 |Initial release.                                                      |


![alt text](https://raw.githubusercontent.com/msalehisedeh/visualize-it/master/sample.png  "What you would see when a visualize-it is used")
