/* global vis */

/*eslint-disable-next-line no-unused-vars */
var network, edges, nodes, costs_matrix

function displayShortestPath(pred){
  let n = costs_matrix.length
  while(pred.filter(x => x == undefined).length < n){
    let i = pred.length -1
    while(pred[i] == undefined)
      i--
    while(i != undefined){
      edges.update({id: `${pred[i]}_${i}`, color: {color: 'green'}})
      let aux = i
      i = pred[aux]
      pred[aux] = undefined
    }
  }
}

function dijkstra(root_node){
  var dist = []
  var pred = []
  var visited_nodes = []
  var actual_node = root_node
  var n = costs_matrix.length

  for(let i=0; i<n; i++)
    dist.push(Infinity)
  dist[root_node] = 0

  while(visited_nodes.length < n){
    var neighbours = costs_matrix[actual_node].map((cost, node) => [cost, node])
      .filter(x => x[0] < Infinity && x[0] > 0)
      .map(x => x[1])
      .filter(x => visited_nodes.indexOf(x) == -1)
    neighbours.forEach(function(i){
      if(dist[actual_node] + costs_matrix[actual_node][i] < dist[i]){
        dist[i] = dist[actual_node] + costs_matrix[actual_node][i]
        pred[i] = actual_node
      }
    })
    visited_nodes.push(actual_node)
    actual_node = dist.indexOf(Math.min(...dist.filter((_, node) => visited_nodes.indexOf(node) == -1)))
  }

  return pred
}

// Get edges costs from user input and returns a matrix
function getCosts(){
  var cantNodes = parseInt($('#cant-nodes').val())
  costs_matrix = []

  for(var i=0; i<cantNodes; i++){
    var row = []
    for(var j=0; j<cantNodes; j++){
      if(i == j)
        row.push(0)
      else {
        var c = parseInt($(`#costs_matrix_${i}_${j}`).val())
        if(!isNaN(c))
          row.push(c)
        else
          row.push(Infinity)
      }
    }
    costs_matrix.push(row)
  }
}

// Display the network with the vis library
function displayNetwork(){
  var n = costs_matrix.length
  var nodesArray = []
  var edgesArray = []

  for(var i=0; i<n; i++){
    nodesArray.push({id: i, label: i.toString()})
    for(var j=0; j<n; j++){
      if(costs_matrix[i][j] > 0 && costs_matrix[i][j] < Infinity){
        edgesArray.push({
          from: i,
          to: j,
          id: `${i}_${j}`,
          label: costs_matrix[i][j].toString(),
          arrows: 'to'
        })
      }
    }
  }

  // create a network
  var container = document.getElementById('network')
  edges = new vis.DataSet()
  nodes = new vis.DataSet()
  edges.add(edgesArray)
  nodes.add(nodesArray)
  var data = {nodes, edges}
  var options = {}
  network = new vis.Network(container, data, options)
}

// Displays a matrix in HTML for the user to input edges costs
function displayCostsMatrix(){
  var cantNodes = parseInt($('#cant-nodes').val())
  var first_row_html = '<div class="costs-matrix-cell"></div>'
  var html = ''
  for(var i=0; i<cantNodes; i++){
    first_row_html += `<div class="costs-matrix-cell">${i}</div>`
    html += `<div class="costs-matrix-cell">${i}</div>`
    for(var j=0; j<cantNodes; j++)
      html += `<input class="costs-matrix-cell" type="text" value="INF" id="costs_matrix_${i}_${j}">`
    html += '<br>'
  }
  $('#costs-matrix').html(first_row_html + '<br>' + html)
}


$(document).ready(function(){

  $('#rst-cost-matrix-btn').click(function(){
    displayCostsMatrix()
  })

  $('#display-network-btn').click(function(){
    getCosts()
    displayNetwork()
  })

  $('#show-shortest-path-btn').click(function(){
    var pred = dijkstra(0)
    displayShortestPath(pred)
  })

  displayCostsMatrix(2)
})
