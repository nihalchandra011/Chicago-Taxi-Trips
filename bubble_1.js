let mapWidth = 800;
let mapHeight = 750;
let center_x = -87.7;
let center_y = 41.825;
let svg;


const loadAllFiles = async () => {

    taxi = await d3.csv("Taxi_Trips_Preprocessed.csv");
  
    plot1();
    plot2();
  };

  const plot1 = async () => {

    const width = 700;
    const height = 700;

    var svg = d3.selectAll('#bubble1')

    const margin = { left: 70, top: 10, right: 80, bottom: 50 }


  var xScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d['Trip Miles'];}))
    .range([margin.left, width - margin.right])

var yScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d.Fare;}))
    .range([height - margin.bottom, margin.top])

var zScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d.Tips;}))
    .range([0,5])

    svg.append('g')
    .call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${height - margin.bottom})`)
  
  svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left},0)`)

  var payment = Array.from(new Set(taxi.map(d => d['Payment Type'])));

  var paymentColor = d3.scaleOrdinal().domain(payment).range(d3.schemeSet2);

  
  // draw points
  var dots = svg.selectAll('circle')
    // filter data to only contain selected companies
    .data(taxi.filter(d => d['Payment Type']))
    .join('circle')
      .attr('cx', d => xScale(d['Trip Miles']))
      .attr('cy', d => yScale(d.Fare))
      .attr('fill', d =>  paymentColor(d['Payment Type']))
      //.attr('fill', 'Plum')
      .attr('opacity', 1)
      .attr('r', 3)
      .attr('id', (d,i) => {
        return 'b'+i.toString()})
        .on("mouseover",onOver)
        .on("mouseout",onOut);
      //.attr('r', d => zScale(d.Tips));

      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-300)
    .attr("y", height - 6)
    .text("Miles Travelled");

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 0-200)
    .attr("y", 0)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Fare Amount in Dollars");


};

  const plot2 = async () => {

    const width = 700;
    const height = 700;

    var svg = d3.selectAll('#bubble2')

    const margin = { left: 70, top: 10, right: 80, bottom: 50 }


  var xScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d['Trip Minutes'];}))
    .range([margin.left, width - margin.right])

var yScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d.Fare;}))
    .range([height - margin.bottom, margin.top])

var zScale = d3.scaleLinear()
    .domain(d3.extent(taxi, function(d) {return d.Tips;}))
    .range([0,5])

    svg.append('g')
    .call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${height - margin.bottom})`)
  
  svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left},0)`)

  var payment = Array.from(new Set(taxi.map(d => d['Payment Type'])));

  var paymentColor = d3.scaleOrdinal().domain(payment).range(d3.schemeSet2);

  
  // draw points
  var dots = svg.selectAll('circle')
    // filter data to only contain selected companies
    .data(taxi.filter(d => d['Payment Type']))
    .join('circle')
      .attr('cx', d => xScale(d['Trip Minutes']))
      .attr('cy', d => yScale(d.Fare))
      .attr('fill', d =>  paymentColor(d['Payment Type']))
      //.attr('fill', 'Plum')
      .attr('opacity', 1)
      .attr('r', 3)
      .attr('opacity',0.1)
      .attr('id', (d,i) => {
        return 'b'+i.toString()})
        .on("mouseover",onOver)
        .on("mouseout",onOut);
      //.attr('r', d => zScale(d.Tips));

      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-300)
    .attr("y", height - 6)
    .text("Minutes Travelled");

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 0-200)
    .attr("y", 0)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Fare Amount in Dollars");

    };

    const onOver = (i) => {  
        
      
        id = "#"+ i.path[0].id.toString()
        d3.selectAll(id).style('fill', 'rgb(120,50,50)').style('r',10).style('opacity',1);  
    
        
      };

      const onOut = (i) => {   
    var payment = Array.from(new Set(taxi.map(d => d['Payment Type'])));

    var paymentColor = d3.scaleOrdinal().domain(payment).range(d3.schemeSet2);
    
    pay = i.target.__data__['Payment Type']
  
    id = "#"+ i.path[0].id.toString()
    console.log(i.target.__data__['Payment Type'])
    d3.selectAll(id).style('fill', paymentColor(pay)).style('r',3).style('opacity',0.1);       
        
       };

  window.onload = loadAllFiles;
