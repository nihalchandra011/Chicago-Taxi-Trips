# Chicago Taxi Trips
**Project 3** \
**CS 424 - Visualization and Visual Analytics** \
 **Authors: Swetha Jayakumar, Nihal Chandra**

**Link to Webpage**: https://nchand26.github.io/project-3-viz-comrades/ 
<br><br>
**Visualization Interface**
![Homepage](https://github.com/nchand26/project-3-viz-comrades/blob/main/homepage.PNG)

This projects aims to explore the [Chicago Taxi Trips Dataset](https://data.cityofchicago.org/Transportation/Taxi-Trips/wrvz-psew) through interactive and informative Visualizations. 

**The Dataset** \
The dataset consists of taxi trips reported to the City of Chicago in its role as a regulatory agency. The original dataset consists of over 203M trips, of which we have taken a subset consisting of 99,457 trips and  23 attributes, spanning over a week. Each row in the dataset represents a taxi trip between September 1st, 2022 and September 7th, 2022. Each trip has a unique ID and timestamp associated with it. Let's look at a snapshot of the dataset below.

![Dataset Columns Screenshot](https://github.com/uic-vis/project-2-viz-comrades/blob/main/imgs/DatasetColumns.png)

**Fundamental Types of Information** 
  
An initial look at the dataset led to the following inferences:
- The dataset consisted of 99,457 entries primarily comprising of *float* and *object* datatypes.  
- **Identifers**: *Trip ID, Taxi ID*
- **Categories - Unordered**: *Payment Type, Company*
- **Measures**: *Trip Miles, Fare, Tips, Tolls, Extras, Trip Total*
- **Locations and Regions**: *Pickup Census Tract, Dropoff Census Tract, Pickup Community Area, Dropoff Community Area, Pickup Centroid Latitude, Pickup Centroid Longitude, Pickup Centroid Location, Dropoff Centroid Latitude, Dropoff Centroid Longitude, Dropoff Centroid Location*
- **Times and Dates**: *Trip Start Timestamp, Trip End Timestamp, Trip Seconds*

**Questions Answered**  
As a part of this project, the questions we tried to answer through visualization are:
- How does the Trip Fare compare with the Trip Total for the entire week?
- Is the Trip Fare positively correlated to the Tip?
- How does the fare relate to the trip distance and duration?
- For each community area, how do the top three taxi companies perform over the week?

**Baseline Apporach**
<br>The baseline approach followed to analyze and visualize these questions is as follows:

![Baseline Approach Screenshot](https://github.com/uic-vis/project-2-viz-comrades/blob/main/imgs/Baseline_approach.jpg)

Let's try to understand this baseline approach better by breaking it down to stepwise tasks. Let's take a look at the tasks performed at each stage of the project.

**Task 0: Setting up a web page**
<br>The [website](https://nchand26.github.io/project-3-viz-comrades/) has been created and hosted using [GitHub pages](https://pages.github.com/) and all the related files can be found in this repository.

**Task 1: Creating an empty page** 
The webpage has been created using HTML and JavaScript and hosted via Github Pages. The page is structured in such a way that, in order to navigate to any visualization, just click on the corresponding question number in the navigation bar or the hyperlink on the Homepage.

**Using previous visualizations**

**1.Domain Question**: How does the Trip Fare compare with the Trip Total for the entire week?
<br>**Data Attributes Used**:
- Trip Start Timestamp (Time)
- Trip Day (Time)
- Trip Fare (Quantitative)
- Trip Total (Quantitative)

**Transformations Performed**: Extracted *'Trip Day'* from *'Trip Start Timestamp'* in the preprocessing stage using Pandas in Python.

**Data Question**: How does the Trip Fare compare with the Trip Total for each day of the week?

**Visual Encoding**
- Each vertical bar represents either the cumulative Fare or Trip total of that particular day of the week.
- The height of the bar is directly proportional to the Total amount (in $). 
- Pink color - Trip Fare, Purple Color - Trip Total

**Representation**
<br>The visualization is represented through a bar chart since we are comparing a quantitative attribute (Amount in $) vs a time based attribute (day of the week) over two quantitative attributes (Fare and Trip Total). 

**Design Choice**
- We used a bar chart for this visualization because we were trying to compare two quantities belonging to different attributes such as fare and trip total.
- We reduce the opacity based on the user hovering over a bar so that the user knows which bar is selected. We show the tooltip to display to the user the exact amount in dollars.
 
**Findings**
- We find that the number of trips on Wednesday is extremely low when compared to other days.
- We see that there is a positive correlation between the trip total and the fare proving there the additional charges do not vary much over the week.

**Interaction**
<br>When we hover over any bar, its color fades and a tooltip pops up to show the corresponding cumulative Fare amount or Trip Total.

![Number of Trips based Day of the Week](https://github.com/nchand26/project-3-viz-comrades/blob/main/FarevsTripTotalvsDay.PNG) 

**2.Domain Question**: Is the Trip Fare positively correlated to the Tip?
<br>**Data Attributes Used**:
- Fare (Quantitative)
- Tips (Quantitative)
- Company (Categorical)

**Transformations Performed**: Extracted Count of trips belonging to a particular brushed area of the scatter plot.

**Data Question**: What is the correlation between The Fare and Tip amount for each company?

**Visual Encoding**
- Each point on the scatter plot represents a trip and is given a particular color based on its Taxi company.
- Each horizontal bar in the adjacent bar chart represents the count of trips included in the highlighted area of the scatter plot (by default - everything).
- The length of the bar is directly proportional to number of trips of that cab company. 
- Each color represents a particular cab company.

**Representation**
<br>The visualization is represented through mulliple linked views - a brushable scatterplot and a linked bar chart. The Scatterplot helps us understand the correlation between Tips and Fares. It is also the area where the user can brush over to select a smaller subset and visualize the corresponding change in the linked bar chart. The Bar chart contains Taxi companies compared with their corresponding highlighted count.

**Design Choice**
- We used a scatter plot to show the relationship between two quantities so that we can easily identify any trends.
- We use a bar chart to show the number of trips for each cab company since it is easier to see the count.
- The brushing interaction allows the user to select specific trips to see a more detailed view.
 
**Initial Findings**
- We see that for the most part tips and fare are positively correlated.
- We also see that people prefer to pay the tip in whole dollar amounts rather than in cents.

**Interaction**
<br>This visualization provides the interactive ability to brush over the scatter plot to highlight a specific portion of it, and on doing so, we can observe the corresponding change in the adjacent linked bar chart. To brush over the scatterplot, simply drag the mouse over the desired area and release it to observe the effect.

![Brushing effect on Visualization](https://github.com/nchand26/project-3-viz-comrades/blob/main/FarevsTipvsCompany.PNG) 


**Task 3: New multiple linked view**

**3.Domain Question**: How does the fare relate to the trip distance and duration based on the type of payment?
<br>**Data Attributes Used**:
- Fare (Quantitative)
- Trip Start Timestamp (Time)
- Trip Minutes (Time)
- Trip Miles (Quantitative)
- Payment Type (Categorical)

**Transformations Performed**: Extracted *'Trip Minutes'* from *'Trip Start Timestamp'* in the preprocessing stage using Pandas in Python.

**Data Question**: How does the Trip fare relate to the Miles travelled and Minutes travelled based on the payment method?

**Visual Encoding**
- Each point on the scatter plot represents a trip and is given a particular color based on the payment method used.
- Each color represents a particular payment method.

**Representation**
<br>The visualization is represented through mulliple linked views - two linked scatterplots. The Scatterplot helps us understand the correlation between the Fare and Miles/Minutes. 

**Design Choice**
- We used a scatter plot to show the relationship between two quantities so that we can easily identify any trends.
- A pointer is used to hover over the plot as it is easier to pin-point a taxi trip on the plot.
- A tooltip is used to show the current value of the pointed trip.
 
**Findings**
<br>We see that there is a positive correlation in both the cases - between the trip miles-fare and trip minutes-fare, although the later is much steeper than the former.

**Interaction**
<br>To intereact with the visualization, the user can move the cursor over either of the plots and observe the corresponding value change in the other plot. A tooltip pops up showing the Trip Miles, Fare, and Minutes for that particular trip. 

![Linked Scatterplots](https://github.com/nchand26/project-3-viz-comrades/blob/main/linked_scatterplots.png) 

**Task 4: New spatial view**
<br>**4.Domain Question**: For each community of Chicago, how do the top taxi companies perform over the week?
<br>**Data Attributes Used**:
- Pickup Community Area (Spatial) 
- Pickup Centroid Latitude (Spatial)
- Pickup Centroid Longitude (Spatial) 
- Pickup Centroid Location (Spatial)

**Transformations Performed**: Aggregated the number of trips in each community area during the preprocessing stage using Pandas in Python.

**Data Question**: For each community area, how do the top three taxi companies perform over the week?

**Visual Encoding**
- A chloropeth map to represent the community boundaries of Chicago.
- The darkness of color represents the number of Taxi Trips taken in each community area.
- Lines to represent and compare the number of trips from that area over the week.
- Each color of the line graph represents one of the top 3 cab companies. 

**Representation**
<br>This visualization is represented through multiple linked views - a chloropath map and an adjacent linked line chart. The chloropath map is a map of Chicago seperated based on communities where the darkness of color over a particular community signifies the density of cab trips in that area. A line chart is used to visualize how the three most popular cab companies perform over the week in a selected community area.

**Design Choice**
- We have used a chloropeth map as it is a good approach to visualize spatial data and makes it easier for the user to interpret.
- A line chart has been used as the linked plot since we are trying to visualize quantitative data changing over the week.

**Findings**
- The area near Downtown and Loop has higher taxi traffic compared to other communities, probably due to the presence of alot of attractions in the area.
- Overall, if we look at the line charts of different communities, we observe that Taxi Affiliation Serives has the highest average over the week and the number of trips shoot up significantly as the weekend arrives.

**Interaction**
<br>This visualization provides the interactive ability to click on a particular community in the map of Chicago and observe the number of trips from the corresponding community for the entire week in the adjacent linked line chart. To switch to another community area, simply click on that area and view the results in adjacent line graph.

![Linked Scatterplots](https://github.com/nchand26/project-3-viz-comrades/blob/main/question4.png) 
  
**Coding Environment** \
The entire code execution and visualization has been performed as follows:
- Data Preprocessing in a Jupyter notebook using Python.
- Visualization and presentation on the Webpage through Visual Studio Code using HTML, D3 and JavaScript.
- Documentation in Github.

**Package Requirements** \
The following libraries were used for data preprocessing in Python.
- numpy
- pandas
