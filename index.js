
$(function () {
  //
  // plotly data
  //
  var studentsInfo = [
    { last_name: "Istrator", first_name: "Admin", email: "admin@opendsa.org" },
    { last_name: "Teacher", first_name: "Ima", email: "example-1@railstutorial.org" },
    { last_name: "Stoltenberg", first_name: "Jordon", email: "example-2@railstutorial.org" },
    { last_name: "Torphy", first_name: "Ardith", email: "example-3@railstutorial.org" },
    { last_name: "Keeling", first_name: "Pearlie", email: "example-4@railstutorial.org" },
    { last_name: "White", first_name: "Rahul", email: "example-5@railstutorial.org" },
    { last_name: "Conn", first_name: "Maiya", email: "example-6@railstutorial.org" },
    { last_name: "Thompson", first_name: "Koby", email: "example-7@railstutorial.org" },
    { last_name: "Haag", first_name: "Robyn", email: "example-8@railstutorial.org" },
    { last_name: "O", first_name: "Reilly", email: "example-9@railstutorial.org" },
    { last_name: "Marquardt", first_name: "Zoe", email: "example-10@railstutorial.org" },
    { last_name: "Kiehn", first_name: "Amira", email: "example-11@railstutorial.org" },
    { last_name: "Doyle", first_name: "Patrick", email: "example-12@railstutorial.org" },
    { last_name: "Runte", first_name: "Brooks", email: "example-13@railstutorial.org" },
    { last_name: "Morissette", first_name: "Otho", email: "example-14@railstutorial.org" },
    { last_name: "Connelly", first_name: "Leda", email: "example-15@railstutorial.org" },
    { last_name: "Frami", first_name: "Dayne", email: "example-16@railstutorial.org" },
    { last_name: "Morar", first_name: "Aurelia", email: "example-17@railstutorial.org" },
    { last_name: "Mohr", first_name: "Buster", email: "example-18@railstutorial.org" },
    { last_name: "Sporer", first_name: "Casper", email: "example-19@railstutorial.org" },
    { last_name: "Nader", first_name: "Jammie", email: "example-20@railstutorial.org" },
    { last_name: "Wolff", first_name: "Noah", email: "example-21@railstutorial.org" },
    { last_name: "Upton", first_name: "Fatima", email: "example-22@railstutorial.org" },
    { last_name: "Bernier", first_name: "Oma", email: "example-23@railstutorial.org" },
    { last_name: "VonRueden", first_name: "Alexandro", email: "example-24@railstutorial.org" },
    { last_name: "Pfannerstill", first_name: "Breanne", email: "example-25@railstutorial.org" },
    { last_name: "Hilpert", first_name: "Darren", email: "example-26@railstutorial.org" },
    { last_name: "Becker", first_name: "Virgie", email: "example-27@railstutorial.org" },
    { last_name: "Gorczany", first_name: "Eleonore", email: "example-28@railstutorial.org" },
    { last_name: "Wolf", first_name: "Malinda", email: "example-29@railstutorial.org" },
    { last_name: "O", first_name: "Hara", email: "example-30@railstutorial.org" }
  ]

  var yData = {
    Weeks: [3.2146905937041748, 16.337442378832883, 3.2539601774461735, 4.755584638603736, 15.956184503328522, 1.0236859132489684, 6.423572479978357, 19.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981],
    Chapters: [3.2146905937041748, 15.337442378832883, 13.2539601774461735, 14.755584638603736, 5.956184503328522, 11.0236859132489684, 16.423572479978357, 10.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981]
  }

  var text = studentsInfo.map(x => x.first_name + " " + x.last_name + "<" + x.email + ">")
  var studentsInfoIndex = {};

  for (var i = 0; i < studentsInfo.length; i++) {
    studentsInfoIndex[studentsInfo[i]['email']] = i;
  }

  var plotlyDiv = document.getElementById('plotlyDiv')

  var plotMean = null;
  var plotQ1 = null;

  setBoxPlot()

  function setBoxPlot(chosenStudents) {
    var chosenStudents = chosenStudents || []
    var selected = {}

    if (chosenStudents != undefined || chosenStudents.length != 0) {
      selected = {
        marker: {
          size: 6,
          color: 'rgb(255, 0, 0)'
        }
      }
    }

    var data = [
      {
        name: 'Week 1',
        type: 'box',
        y: yData["Weeks"],
        text: text,
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
        },
        selectedpoints: chosenStudents,
        selected: selected,
        line: {
          width: 1
        },
        hoverlabel: {
          font: { size: 15 }
        }
      },
      {
        name: 'Chapter 1',
        type: 'box',
        y: yData["Chapters"],
        text: text,
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
          opacity: 1
        },
        selectedpoints: chosenStudents,
        selected: selected,
        line: {
          width: 1
        },
        hoverlabel: {
          font: { size: 15 }
        },
        visible: false
      }
    ];

    var updatemenus = [
      {
        buttons: [
          {
            args: [{ 'visible': [true, false] },
            {
              'title': 'Total time students spend on OpenDSA materials per week.'
            }
            ],
            label: 'Weeks',
            method: 'update'
          },
          {
            args: [{ 'visible': [false, true] },
            {
              'title': 'Total time students spend on OpenDSA materials per chapter.'
            }
            ],
            label: 'Chapters',
            method: 'update'
          }
        ],
        direction: 'left',
        pad: { 'r': 10, 't': 10 },
        showactive: true,
        type: 'buttons',
        x: 1,
        xanchor: 'left',
        y: 1.2,
        yanchor: 'top'
      },
      {
        buttons: [
          {
            name: 'reset',
            label: 'Reset',
            method: 'skip',
            execute: false
          },
          {
            name: '25',
            label: '25th percentile',
            method: 'skip',
            execute: false
          },
          {
            name: '50',
            label: '50th percentile',
            method: 'skip',
            execute: false
          }
        ],
        direction: 'left',
        pad: { 'r': 10, 't': 10 },
        showactive: true,
        type: 'buttons',
        x: 0,
        xanchor: 'left',
        y: 1.2,
        yanchor: 'top'
      }
    ]

    var layout = {
      'title': 'Total time students spend on OpenDSA materials per week.',
      updatemenus: updatemenus,
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
      showlegend: false
    }

    Plotly.newPlot(plotlyDiv, data, layout)
      .then((plot) => {
        console.log(plot.calcdata[0][0])
        plotMean = plot.calcdata[0][0]['med'];
        plotQ1 = plot.calcdata[0][0]['q1'];
      })

    plotlyDiv.on('plotly_buttonclicked', function (e) {
      console.log(e.button.name)
      var buttonName = e.button.name;
      var selected = {
        marker: {
          size: 6,
          color: 'rgb(255, 0, 0)'
        }
      }

      var chosenStudents = [];
      if (buttonName == '25') {
        for (var i = 0; i < yData["Weeks"].length; i++) {
          if (yData["Weeks"][i] <= plotQ1) {
            chosenStudents.push(i);
          }
        }
      } else if (buttonName == '50') {
        for (var i = 0; i < yData["Weeks"].length; i++) {
          if (yData["Weeks"][i] <= plotMean) {
            chosenStudents.push(i);
          }
        }
      } else {
        chosenStudents = []
      }

      data[0]['selectedpoints'] = chosenStudents
      data[0]['selected'] = selected

      Plotly.update(plotlyDiv, data, layout);
    })

  };

  //
  // selectize code
  //
  var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

  var formatName = function (item) {
    return $.trim((item.first_name || '') + ' ' + (item.last_name || ''));
  };

  $('#select-to').selectize({
    persist: false,
    maxItems: null,
    valueField: 'email',
    labelField: 'name',
    searchField: ['first_name', 'last_name', 'email'],
    sortField: [
      { field: 'first_name', direction: 'asc' },
      { field: 'last_name', direction: 'asc' }
    ],
    options: studentsInfo,
    render: {
      item: function (item, escape) {
        var name = formatName(item);
        return '<div>' +
          (name ? '<span class="name">' + escape(name) + '</span>' : '') +
          (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
          '</div>';
      },
      option: function (item, escape) {
        var name = formatName(item);
        var label = name || item.email;
        var caption = name ? item.email : null;
        return '<div>' +
          '<span class="label">' + escape(label) + '</span>' +
          (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
          '</div>';
      }
    },
    createFilter: function (input) {
      var regexpA = new RegExp('^' + REGEX_EMAIL + '$', 'i');
      var regexpB = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
      return regexpA.test(input) || regexpB.test(input);
    },
    create: function (input) {
      if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
        return { email: input };
      }
      var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
      if (match) {
        var name = $.trim(match[1]);
        var pos_space = name.indexOf(' ');
        var first_name = name.substring(0, pos_space);
        var last_name = name.substring(pos_space + 1);

        return {
          email: match[2],
          first_name: first_name,
          last_name: last_name
        };
      }
      alert('Invalid email address.');
      return false;
    }
  })

  // show current input values
  $('select.selectized,input.selectized').each(function () {
    var $container = $('<div>').addClass('value').html('Current Value: ');
    var $value = $('<span>').appendTo($container);
    var $input = $(this);

    var update = function (e) {
      var selectedStudents = $input.val();
      $value.text(JSON.stringify(selectedStudents));
      if (selectedStudents) {
        var chosenStudents = [];
        for (var i = 0; i < selectedStudents.length; i++) {
          chosenStudents.push(studentsInfoIndex[selectedStudents[i]]);
        }
        console.log(chosenStudents);
        setBoxPlot(chosenStudents)
      }
    }

    $(this).on('change', update);
    update();

    $container.insertAfter($input);
  });

  //
  // datatables
  //
  var dataSet = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
    ["Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
    ["Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400"],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
  ];
  $('#example').DataTable({
    data: dataSet,
    columns: [
      { title: "Name" },
      { title: "Position" },
      { title: "Office" },
      { title: "Extn." },
      { title: "Start date" },
      { title: "Salary" }
    ]
  });

});
