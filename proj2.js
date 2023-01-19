let mapWidth = 800;
let mapHeight = 750;
let center_x = -87.7;
let center_y = 41.825;
let svg;


const loadAllFiles = async () => {

    taxi = await d3.csv("Taxi_Trips_Preprocessed.csv");
    plot1();
    create();
  
  };

  function plot1(){


    
        const height = 650
        const width = 700
        const svg = d3.select('#bar')
        
        const margin = { left: 90, top: 20, right: 30, bottom: 50 }
      
      
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
          .attr("y", 10)
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


    function scatterPlot(){
        // set up
        var height = 650
      
        var width = 700
      
        const initialValue = taxi;
        
          const svg = d3.select('#scatter')
            .property('value', initialValue);
        
        const margin = { left: 70, top: 10, right: 80, bottom: 50 }
      
      
        var xScale = d3.scaleLinear()
          .domain(d3.extent(taxi, function(d) {return d.Tips;}))
          .range([margin.left, width - margin.right])
      
      var yScale = d3.scaleLinear()
          .domain(d3.extent(taxi, function(d) {return d.Fare;}))
          .range([height - margin.bottom, margin.top])
      
          svg.append('g')
          .call(d3.axisBottom(xScale))
          .attr('transform', `translate(0,${height - margin.bottom})`)
        
        svg.append('g')
          .call(d3.axisLeft(yScale))
          .attr('transform', `translate(${margin.left},0)`)
      
        var company = Array.from(new Set(taxi.map(d => d.Company)));
      
        var companyColor = d3.scaleOrdinal().domain(company).range(d3.schemeSet2);
      
        
        // draw points
        var dots = svg.selectAll('circle')
          // filter data to only contain selected companies
          .data(taxi.filter(d => d.Company))
          .join('circle')
            .attr('cx', d => xScale(d.Tips))
            .attr('cy', d => yScale(d.Fare))
            .attr('fill', d =>  companyColor(d.Company))
            .attr('opacity', 1)
            .attr('r', 3);
      
            svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width-300)
          .attr("y", height - 6)
          .text("Tip Amount in Dollars");
      
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("x", 0-200)
          .attr("y", 10)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Fare Amount in Dollars");
        //*******************************************************************
         const brush = d3.brush()
            // set the space that the brush can take up
            .extent([[0, 0], [width, height]])
            // handle events
            .on('brush', onBrush)
            .on('end', onEnd);
        
        svg.append('g')
            .call(brush);
        
        function onBrush(event) {
          // event.selection gives us the coordinates of the
          // top left and bottom right of the brush box
          const [[x1, y1], [x2, y2]] = event.selection;
          
          // return true if the dot is in the brush box, false otherwise
          function isBrushed(d) {
            const cx = xScale(d.Tips);
            const cy = yScale(d.Fare)
            return cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2;
          } 
          
          // style the dots
          dots.attr('fill', d => isBrushed(d) ? companyColor(d.Company) : 'gray');
          
          // update the data that appears in the cars variable
          svg.property('value', taxi.filter(isBrushed)).dispatch('input');
        }
        
        function onEnd(event) {
          // if the brush is cleared
          if (event.selection === null) {
            // reset the color of all of the dots
            dots.attr('fill', d => companyColor(d.Company));
            svg.property('value', initialValue).dispatch('input');
          }
        }
        return svg.node();
      }

      function barChart(){
        // set up
        
        var height = 700
      
        var width = 700
      
        const initialValue = taxi;
        
          const svg = d3.select('#scatterbar').property('value', initialValue);
        
        const margin = { left: 180, top: 10, right: 100, bottom: 10 }
      
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        var company = Array.from(new Set(taxi.map(d => d.Company)));
        // create scales
        const x = d3.scaleLinear()
            .range([0, width]);
        
         var companyColor = d3.scaleOrdinal().domain(company).range(d3.schemeSet2);
        
        const y = d3.scaleBand()
            .domain(companyColor.domain())
            .range([0, height])
            .padding(0.2);
        
        // create and add axes
        const xAxis = d3.axisBottom(x).tickSizeOuter(0);
        
        const xAxisGroup = g.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`);
        
        xAxisGroup.append("text")
            .attr("x", width / 3)
            .attr("y", 39)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text("Count");
        
        const yAxis = d3.axisLeft(y);
        
        const yAxisGroup = g.append("g")
            .call(yAxis)
            // remove baseline from the axis
            .call(g => g.select(".domain").remove());
          
        let barsGroup = g.append("g");
      
        function update(data) {
          
          // get the number of cars for each origin
          const companyCounts = d3.rollup(
            data,
            group => group.length,
            d => d.Company
          );
      
          // update x scale
          x.domain([0, d3.max(companyCounts.values())]).nice()
      
          // update x axis
      
          const t = svg.transition()
              .ease(d3.easeLinear)
              .duration(200);
      
          xAxisGroup
            .transition(t)
            .call(xAxis);
          
          // draw bars
          barsGroup.selectAll("rect")
            .data(companyCounts, ([Company, count]) => Company)
            .join("rect")
              .attr("fill", ([Company, count]) => companyColor(Company))
              .attr("height", y.bandwidth())
              .attr("x", 0)
              .attr("y", ([Company, count]) => y(Company))
            .transition(t)
              .attr("width", ([Company, count]) => x(count))
        }
        
        return Object.assign(svg.node(), { update });;
      }

      const create = async () =>{
        const scatter = scatterPlot();
        const bar = barChart();
      console.log(scatter)
        // update the bar chart when the scatterplot
        // selection changes
        d3.select(scatter).on('input', () => {
          bar.update(scatter.value);
        });
      
        // intial state of bar chart
        bar.update(scatter.value);
      
        // use HTML to place the two charts next to each other
        //return html`<div style="display: flex">${scatter}${bar}</div>`;
      }


  window.onload = loadAllFiles;