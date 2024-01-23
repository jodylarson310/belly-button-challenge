// Get the samples data from D3 library
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let OTUdata;

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("Sample Data: ", data);

OTUdata = data
let names = data.names

// Assign dropdown variable
let dropdown = d3.select('#selDataset');

// Add dropdown options
for (i=0;i<names.length;i++) {
    dropdown.append("option").text(names[i]).property("value",i)
}

// call option for dashboard
optionChanged(0);
});

// Create index, assign variables and build charts
function optionChanged(nameIndex) {

nameValue = OTUdata.names[nameIndex];
sampleData = OTUdata.samples[nameIndex];
otuIds = sampleData.otu_ids;
values = sampleData.sample_values;
labels = sampleData.otu_labels;

// Bar chart
let trace1 = {

    x: values.slice(0,10).reverse(),
    y: otuIds.slice(0,10).reverse().map(id => `OTU ${id}`),
    text: labels.slice(0,10).reverse(),
    type: 'bar',
    orientation: 'h'
};

let data1 = [trace1];
let layout1 = {
    title: "Top 10 OTUs Found in Selected Sample's Belly Button",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
}

Plotly.newPlot("bar", data1, layout1);

// Bubble plot
let trace2 = {

    x: otuIds,
    y: values,
    text: labels,
    mode: 'markers',
    marker: {
        size: values,
        color: otuIds,
        colorscale: "Viridis"
    }
};

let data2 = [trace2];
let layout2 = {
    title: "All OTUs for Selected Sample's Belly Button by OTU ID and Values",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Values" },
    showlegend: false
};

Plotly.newPlot("bubble", data2, layout2);

// Demographic Info
let demoInfo = d3.select('#sample-metadata');
let demoData = OTUdata.metadata[nameIndex];

// Complete Demo Info
console.log(demoData);
demoInfo.selectAll('p').remove();
for(let key in demoData) {
    demoInfo.append('p').text(`${key}: ${demoData[key]}`);
}

}
