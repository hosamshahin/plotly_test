var xData = 'Week 1';

var yData = [3.2146905937041748, 16.337442378832883, 3.2539601774461735, 4.755584638603736, 15.956184503328522, 1.0236859132489684, 6.423572479978357, 19.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981];

var colors = 'rgba(93, 164, 214, 0.5)'

var data = [];

var result = {
  name: xData,
  type: 'box',
  y: yData,
  text: ["-hshahin", "-hosam", "-latif", "-shahin", "Zeyad", "hshahin", "hosam", "latif", "shahin", "Zeyad", "-hshahin", "-hosam", "-latif", "-shahin", "Zeyad", "hshahin", "hosam", "latif", "shahin", "Zeyad", "-hshahin", "-hosam", "-latif", "-shahin", "Zeyad", "hshahin", "hosam", "latif", "shahin", "Zeyad", "-hshahin", "-hosam", "-latif", "-shahin", "Zeyad", "hshahin", "hosam", "latif", "shahin", "Zeyad", "-hshahin", "-hosam", "-latif", "-shahin", "Zeyad", "hshahin", "hosam", "latif", "shahin", "Zeyad"],
  hoverinfo: "all",
  hovertemplate: "%{text}<br>%{y:.2f} mins<extra></extra>",
  boxpoints: 'all',
  jitter: 0.2,
  whiskerwidth: 0.2,
  fillcolor: 'cls',
  marker: {
    outliercolor: 'rgb(255, 0, 0)',
    size: 4,
    symbol: '0',
    opacity: 1,
    // color: 'rgba(93, 164, 214, 0.5)'
  },
  // boxmean: true,
  notched: true,
  selectedpoints: [1],
  // unselected: {
  //   marker: {
  //     size: 5,
  //     opacity: .5,
  //     color: 'rgb(0, 0, 255)'
  //   }
  // },
  selected: {
    marker: {
      size: 6,
      color: 'rgb(0, 255, 0)' //green
    }
  },
  line: {
    width: 1
  },
  hoverlabel: {
    font: { size: 15 }
  },
  // hoveron: "points",
  // pointpos: -1.5
};
data.push(result);

var layout = {
  title: 'Total time students spend on OpenDSA materials per week.',
  yaxis: {
    autorange: true,
    showgrid: true,
    zeroline: true,
    dtick: 5,
    gridcolor: 'rgb(255, 255, 255)',
    gridwidth: 1,
    zerolinecolor: 'rgb(255, 255, 255)',
    zerolinewidth: 2
  },
  margin: {
    l: 40,
    r: 30,
    b: 80,
    t: 100
  },
  paper_bgcolor: 'rgb(243, 243, 243)',
  plot_bgcolor: 'rgb(243, 243, 243)',
  // showlegend: false
};

var pt = Plotly.newPlot('myDiv', data, layout);
