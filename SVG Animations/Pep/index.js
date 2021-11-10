// setting initial positions and opacities
d3.select('#E').attr('transform', 'translate(0,-500)')
d3.select('#coding').attr('transform', 'translate(0,500)')

d3.select("#P").attr('opacity', 0)
d3.select("#inner-shadow").attr('opacity', 0)
d3.select("#outer-shadow").attr('opacity', 0)

d3.select('#name').attr('opacity', 0)

// adding transitions

d3.select("#P").transition().duration(1000).attr('opacity', 1)
d3.select("#outer-shadow").transition().duration(2500).attr('opacity', 1)
d3.select("#inner-shadow").transition().duration(2500).attr('opacity', 1)


d3.select('#E').transition().duration(2000).attr('transform', 'translate(0,0)')

d3.select('#coding').transition().duration(2800).attr('transform', 'translate(0,0)')



setTimeout(()=>{
    // d3.selectAll("path").attr('opacity', 1).transition().duration(5000).attr('opacity', 0)
    // d3.select('#logo').transition().duration(2000).attr('width', '100vw');
    d3.selectAll("#logo path").transition().duration(2000).attr('transform', 'translate(100, 0)scale(0.5)') 

    d3.select('#name').transition().duration(2000).attr('opacity', 1).attr('z-index', 200)

}, 3000)


