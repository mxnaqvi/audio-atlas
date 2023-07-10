import createFamilyTree from './artistData';
import * as d3 from 'd3';

const chart = async (artistName) => {
  const loadingContainer = document.getElementById('loadingContainer');
  loadingContainer.style.display = 'block';

  const data = await createFamilyTree(artistName);

  loadingContainer.style.display = 'none';
  
  console.log('za bluetooth deevice is now cone nected')

  const width = 960; 
  const dx = 20;
  const dy = width / 6;
  const margin = { top: 10, right: 130, bottom: 10, left: 240 }; // Adjust the margin values
  const diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);
  const tree = d3.tree().nodeSize([dx, dy]);

  const root = d3.hierarchy(data);
  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  const svg = d3
    .create("svg")
    .attr("viewBox", [-margin.left, -margin.top, width, dx])
    .style("font", "11px sans-serif")
    .style("border-radius", "25%")
    .style("background-color", "#598556");
    

  const gLink = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

  const gNode = svg
    .append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore((node) => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg
      .transition()
      .duration(duration)
      .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
      .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    
    const node = gNode.selectAll("g").data(nodes, (d) => d.id);

    
    const nodeEnter = node
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event, d) => {
        d.children = d.children ? null : d._children;
        update(d);
      });

    nodeEnter
      .append("circle")
      .attr("r", 2.5)
      .attr("fill", (d) => (d._children ? "#555" : "#999"))
      .attr("stroke-width", 10);

    nodeEnter
    .append("text")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d._children ? -6 : 6))
    .attr("text-anchor", (d) => (d._children ? "end" : "start"))
    .text((d) => d.data.name)
    .clone(true)
    .lower()
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .attr("stroke", "white");

 
  const nodeUpdate = node
    .merge(nodeEnter)
    .transition(transition)
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 1);

  
  const nodeExit = node
    .exit()
    .transition(transition)
    .remove()
    .attr("transform", (d) => `translate(${source.y},${source.x})`)
    .attr("fill-opacity", 0)
    .attr("stroke-opacity", 0);

 
  const link = gLink.selectAll("path").data(links, (d) => d.target.id);

 
  const linkEnter = link
    .enter()
    .append("path")
    .attr("d", (d) => {
      const o = { x: source.x0, y: source.y0 };
      return diagonal({ source: o, target: o });
    });

  
  link.merge(linkEnter).transition(transition).attr("d", diagonal);

 
  link.exit().transition(transition).remove().attr("d", (d) => {
    const o = { x: source.x, y: source.y };
    return diagonal({ source: o, target: o });
  });

  
  root.eachBefore((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

update(root);

const clearButton = document.getElementById('clearButton');
clearButton.style.display = 'block';

return svg.node();

};

export default chart;
