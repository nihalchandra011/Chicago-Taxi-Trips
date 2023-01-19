let mapWidth = 800;
let mapHeight = 750;
let center_x = -87.7;
let center_y = 41.825;
let svg;
let raceSvg;


let projection = d3
.geoMercator()
.scale(mapWidth * 75)
.center([center_x, center_y])
.translate([mapWidth / 2, mapHeight / 2]);

let path = d3.geoPath(projection);



const loadAllFiles = async () => {
    chicagoCommunityAreaData = await d3.json("communityAreas.geojson");

    trips = await d3.csv("Taxi_Trips_Preprocessed.csv");
    agg = await d3.csv("Trip_Ag.csv");
  
    loadMap();

  };

  const loadMap = async () => {

    let mapColorScale = d3
    .scaleLinear()
    .interpolate(() => d3.interpolateBlues)
    .domain([5,23676]);
  
    svg = d3.select("#chicagoMap");
    chicagoMap = svg.append("g");
    chicagoMap
      .selectAll("path")
      .data(chicagoCommunityAreaData.features)
      .enter()
      .append("path")
      // .attr("fill", "#ADD8E6")
      .attr("stroke", "#000000")
      .attr("d", path)
      .on("click",click)
      .attr("fill", (d) => {
        const community_area = d.properties.area_numbe;
        return mapColorScale(agg[community_area - 1]['Trip ID']);
      })
      ;};

      const click = (d) => { 
        
        width = 700
        height = 650

        if (raceSvg) {
            raceSvg.selectAll("*").remove();
          }
      
        const selectedCommunityId = d.target.__data__.properties.area_numbe;

        var selectedTrips = trips.filter(
            (stop) => parseInt(stop['Pickup Community Area']) == selectedCommunityId
          );
        
          raceSvg = d3.select('#plot')

  const margin = { left: 60, top: 20, right: 10, bottom: 50 }


  var company1 = [0,0,0,0,0,0,0]
  var company2 = [0,0,0,0,0,0,0]
  var company3 = [0,0,0,0,0,0,0]
  
  selectedTrips.forEach(function(d){
    if(d['Trip Day']==0){
      switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[0] += 1
    break;
  case 'Flash Cab':
    company2[0] += 1
    break;
  case 'Sun Taxi':
    company3[0] += 1
    break;
}
    }
    else if(d['Trip Day']==1 && d['Company']=='Taxi Affiliation Services'){
       switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[1] += 1
    break;
  case 'Flash Cab':
    company2[1] += 1
    break;
  case 'Sun Taxi':
    company3[1] += 1
    break;
    } }
    else if(d['Trip Day']==2 && d['Company']=='Taxi Affiliation Services'){
      switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[2] += 1
    break;
  case 'Flash Cab':
    company2[2] += 1
    break;
  case 'Sun Taxi':
    company3[2] += 1
    break;
    } 
    }
    else if(d['Trip Day']==3 && d['Company']=='Taxi Affiliation Services'){
      switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[3] += 1
    break;
  case 'Flash Cab':
    company2[3] += 1
    break;
  case 'Sun Taxi':
    company3[3] += 1
    break;
    } 
    }
    else if(d['Trip Day']==4 && d['Company']=='Taxi Affiliation Services'){
        switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[4] += 1
    break;
  case 'Flash Cab':
    company2[4] += 1
    break;
  case 'Sun Taxi':
    company3[4] += 1
    break;
    } 
    }
    else if(d['Trip Day']==5 && d['Company']=='Taxi Affiliation Services'){
       switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[5] += 1
    break;
  case 'Flash Cab':
    company2[5] += 1
    break;
  case 'Sun Taxi':
    company3[5] += 1
    break;
    } 
    }
    else {
      switch(d['Company']) {
  case 'Taxi Affiliation Services':
    company1[6] += 1
    break;
  case 'Flash Cab':
    company2[6] += 1
    break;
  case 'Sun Taxi':
    company3[6] += 1
    break;
    } 
    }
  })


var days = [0, 1, 2, 3, 4, 5, 6]
  
  var xy = []; 
  var xy2 = [];
  var xy3 = [];
for(var i = 0; i < company1.length; i++ ) {
   xy.push({x: days[i], y: company1[i]});
  xy2.push({x: days[i], y: company2[i]});
  xy3.push({x: days[i], y: company3[i]});
}
  
var xScale = d3.scaleLinear()
    .domain(d3.extent(xy2, function(d) {return d.x;}))
    .range([margin.left, width - margin.right])

var yScale = d3.scaleLinear()
    .domain(d3.extent(xy2, function(d) {return d.y;}))
    .range([height - margin.bottom, margin.top])

    const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))


    raceSvg.append('g').selectAll('path')
    .data([xy])
    .enter()
    .append('path')
      .attr('d', d => line(d))
      .attr('fill', 'none')
      .attr('stroke', 'LightBlue')
            .attr('stroke-width','3px')

            raceSvg.append('g').selectAll('path')
    .data([xy2])
    .enter()
    .append('path')
      .attr('d', d => line(d))
      .attr('fill', 'none')
      .attr('stroke', 'Pink')
            .attr('stroke-width','3px')

            raceSvg.append('g').selectAll('path')
    .data([xy3])
    .enter()
    .append('path')
      .attr('d', d => line(d))
      .attr('fill', 'none')
      .attr('stroke', 'Plum')
            .attr('stroke-width','3px')

  
            raceSvg.append('g')
    .call(d3.axisBottom(xScale).ticks(7))
    .attr('transform', `translate(0,${height - margin.bottom})`)

    raceSvg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left+5},0)`)

    raceSvg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-250)
    .attr("y", height - 6)
    .text("Days of the Week[Mon - Sun]");

    raceSvg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 0-250)
    .attr("y", 15)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total No. of Trips");


// create a list of keys
var keys = ["Flash Cab", "Taxi Affiliation Services", "Sun Taxi"]

// Usually you have a color scale in your chart already
var color = ['Pink','LightBlue','Plum']

// Add one dot in the legend for each name.
var size = 20
raceSvg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 100)
    .attr("y", function(d,i){ return 30 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d,i){ return color[i]})

// Add one dot in the legend for each name.
raceSvg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 100 + size*1.2)
    .attr("y", function(d,i){ return 30 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
 
  return raceSvg.node()
        
      };


  window.onload = loadAllFiles;