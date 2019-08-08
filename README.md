# Introduction

This mini-project it's just a short example to show what you can do with this amazing library called [vis](https://visjs.org/). As it says on its own site, vis it's a library which can be used to display a lot of graph's types, from 2D to 3D graphs:

> A dynamic, browser based visualization library.
The library is designed to be easy to use, to handle large amounts of dynamic data, and to enable manipulation of and interaction with the data.
The library consists of the components DataSet, Timeline, Network, Graph2d and Graph3d.

It lets you build a [directed graph](https://en.wikipedia.org/wiki/Orientation_(graph_theory)) entering edge's costs to calculate the optimal path from the root node (numbered 0) to any other node. For this calculation it has a JavaScript implementation of the [Dijkstra algorithm](https://es.wikipedia.org/wiki/Algoritmo_de_Dijkstra#Pseudoc%C3%B3digo).

# Content

The project contains four files where the ```index.html``` **is the entry point** (you have to open it with your browser) :

- ```index.html``` (main entry point)
- ```jquery.min.js``` (JQuery 3.3.1 minified version)
- ```vis.min.js``` (vis minified version)
- ```vis.min.css``` (vis styles minified version)
- ```main.js``` (algorithms and some other functions)
- ```main.css``` (simple styles for the HTML)

``main.js`` is written using some constructions of the emerging standard ES6 (also called ECMAScript 2015) so **it can be opened with any browser that supports this standard**. For example I tested it on Google Chrome Versión 75.0.3770.142. If you are interested in ES6 you can find a very nice book here: https://leanpub.com/understandinges6/read

The vis library can be downloaded from it's [oficial site](https://visjs.org/) or through the ``bower`` command (previously installing Node.js and the NPM package manager). It consists of the components DataSet, Timeline, Network, Graph2d and Graph3d. Any of this components is initialized as a new object, for instance :

```javascript
  network = new vis.Network(container, data, options)
```

For this project I used the ``Network`` and ``DataSet`` components. For more information about those components look at the [examples](https://visjs.github.io/vis-network/examples/) and the [oficial documentation of the Network component](https://visjs.github.io/vis-network/docs/network/) on the vis's site.

# Bugs and further improvements

When trying to display a 5-node graph with this cost's matrix :

```
  0   1   2   3   4
0 INF 1   1   1   INF
1 INF INF 1   INF INF
2 INF INF INF 1   INF
3 INF INF INF INF 1
4 INF INF INF INF INF
```

the code got stucked on the ``displayShortestPath`` function. If you know the cause of this bug feel free to send me an email to brunopiaggiok@gmail.com. Any other ideas to do with the vis library will also be welcomed!
