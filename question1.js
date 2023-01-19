let mapWidth = 800;
let mapHeight = 750;
let center_x = -87.7;
let center_y = 41.825;
let svg;


const loadAllFiles = async () => {

    taxi = await d3.csv("Taxi_Trips_Preprocessed.csv");
    plot1();
  };

  function plot1(){


    
        const height = 500
        const width = 700
        const svg = d3.select('#bar')
        
        const margin = { left: 70, top: 10, right: 80, bottom: 50 }
      
      
        var total_fare = [0,0,0,0,0,0,0]
        var total_total = [0,0,0,0,0,0,0]
        
        taxi.forEach(function(d){
          if(d['Trip Day']==0){
            total_fare[0] += parseFloat(d['Fare'])
            total_total[0] += parseFloat(d['Trip Total'])
      
          }
          else if(d['Trip Day']==1){
            total_fare[1] += parseFloat(d['Fare'])
            total_total[1] += parseFloat(d['Trip Total'])
          }
          else if(d['Trip Day']==2){
            total_fare[2] += parseFloat(d['Fare'])
            total_total[2] += parseFloat(d['Trip Total'])
          }
          else if(d['Trip Day']==3){
            total_fare[3] += parseFloat(d['Fare'])
            total_total[3] += parseFloat(d['Trip Total'])
          }
          else if(d['Trip Day']==4){
            total_fare[4] += parseFloat(d['Fare'])
            total_total[4] += parseFloat(d['Trip Total'])
          }
          else if(d['Trip Day']==5){
            total_fare[5] += parseFloat(d['Fare'])
            total_total[5] += parseFloat(d['Trip Total'])
          }
          else{
            total_fare[6] += parseFloat(d['Fare'])
            total_total[6] += parseFloat(d['Trip Total'])
          }
        })
      
      
      var days = [0, 1, 2, 3, 4, 5, 6]
        
        var xy = []; 
        var xy_total = [];
      for(var i = 0; i < total_fare.length; i++ ) {
         xy.push({x: days[i], y: total_fare[i]});
        xy_total.push({x: days[i], y: total_total[i]});
      }
      
      
  
        
        var xScale = d3
        .scaleBand()
        .domain(days)
        .range([margin.left, width - margin.right]);
      
      var xScaleTip = d3.scaleLinear()
          .domain(d3.extent(xy_total, function(d) {return d.x;}))
          .range([margin.left, width - margin.right])
      
      var yScale = d3.scaleLinear()
          .domain(d3.extent(xy_total, function(d) {return d.y;}))
          .range([height - margin.bottom, margin.top])
        
        svg.append('g')
          .call(d3.axisBottom(xScale).ticks(7))
          .attr('transform', `translate(0,${height - margin.bottom})`)
        
        svg.append('g')
          .call(d3.axisLeft(yScale))
          .attr('transform', `translate(${margin.left},0)`)
      
           var ga = svg.append('g').selectAll('rect')
           .data(xy)
           .join(enter => enter.append("rect")
           .attr(
            "x",
            (d, i) =>
              margin.left +
              i * ((width - margin.right - margin.left) / days.length) +
              15
          )
                 .attr("y", d => yScale(d.y))
                 .attr("width", 30)
                 .attr("height", d => yScale(0) - yScale(d.y))
                 .attr("fill", (d, i) => 'Pink')
                 .on('mouseover', function (d,i) {
                    d3.select(this)
                .attr('opacity', 0.5)
          
            })
            .on('mouseout',function (d,i) {
                    d3.select(this)
                .attr('opacity', 1)
          
            }).append('title').text(d => `Fare: ${Math.round(d.y)}`));
                 
           
      
            var ga = svg.append('g').selectAll('rect')
           .data(xy_total)
           .join(enter => enter.append("rect")
                .attr("x",
                (d, i) =>
                  margin.left +
                  i * ((width - margin.right - margin.left) / days.length) +
                  45)
                 .attr("y", d => yScale(d.y))
                 .attr("width", 30)
                 .attr('height', d => yScale(0) - yScale(d.y))
                .attr("fill", (d, i) => 'Plum')
                .on('mouseover', function (d,i) {
                          d3.select(this)
                      .attr('opacity', 0.5)
                
                  })
                  .on('mouseout',function (d,i) {
                          d3.select(this)
                      .attr('opacity', 1)
                
                  })
                  .append('title').text(d => `Trip Total: ${Math.round(d.y)}`));
            
      
          svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width-300)
          .attr("y", height - 6)
          .text("Days of the Week[Mon - Sun]");
      
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("x", 0-250)
          .attr("y", 0)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Amount in Dollars");
      
        // create a list of keys
      var keys = ["Fare", "Trip Total"]
      
      // Usually you have a color scale in your chart already
      var color = ['Pink', 'Plum']
      
      // Add one dot in the legend for each name.
      var size = 20
      svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("rect")
          .attr("x", 100)
          .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("width", size)
          .attr("height", size)
          .style("fill", function(d,i){ return color[i]})
      
      // Add one dot in the legend for each name.
      svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
          .attr("x", 100 + size*1.2)
          .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
          .text(function(d){ return d})
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle")
    };

  window.onload = loadAllFiles;