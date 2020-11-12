
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
    weeks: [3.2146905937041748, 16.337442378832883, 3.2539601774461735, 4.755584638603736, 15.956184503328522, 1.0236859132489684, 6.423572479978357, 19.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981],
    chapters: [3.2146905937041748, 15.337442378832883, 13.2539601774461735, 14.755584638603736, 5.956184503328522, 11.0236859132489684, 16.423572479978357, 10.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981]
  }

  var text = studentsInfo.map(x => x.first_name + " " + x.last_name + "<" + x.email + ">")
  var studentsInfoIndex = {};

  for (var i = 0; i < studentsInfo.length; i++) {
    studentsInfoIndex[studentsInfo[i]['email']] = i;
  }

  var plotlyDiv = document.getElementById('plotlyDiv')

  var plotMean = null;
  var plotQ1 = null;
  var dataTables = null;
  var currentTab = 'weeks';

  function createDataTables(chosenStudentsInfo) {
    return $('#students_info').DataTable({
      destroy: true,
      data: chosenStudentsInfo,
      columns: [
        { title: "Fist Name" },
        { title: "Last Name" },
        { title: "Email" },
        { title: "Reading time" }
      ]
    });
  }

  // plotly data
  var data = [
    {
      name: 'Week 1',
      type: 'box',
      y: yData["weeks"],
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
      selectedpoints: [],
      selected: {
        marker: {
          size: 6,
          color: 'rgb(255, 0, 0)'
        }
      },
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
      y: yData["chapters"],
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
      selectedpoints: [],
      selected: {
        marker: {
          size: 6,
          color: 'rgb(255, 0, 0)'
        }
      },
      line: {
        width: 1
      },
      hoverlabel: {
        font: { size: 15 }
      },
      visible: false
    }
  ];

  // plotly style the selected points
  // var selected = {
  //   marker: {
  //     size: 6,
  //     color: 'rgb(255, 0, 0)'
  //   }
  // }

  // plotly menu
  var updatemenus = [
    {
      buttons: [
        {
          name: 'weeks',
          args: [{ 'visible': [true, false] },
          {
            'title': 'Total time students spend on OpenDSA materials per week.'
          }
          ],
          label: 'Weeks',
          method: 'update'
        },
        {
          name: 'chapters',
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
      xanchor: 'right',
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
      showactive: false,
      type: 'buttons',
      x: 0,
      xanchor: 'left',
      y: 1.2,
      yanchor: 'top'
    }
  ]

  // plotly layout
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

  // plotly initialize
  Plotly.newPlot(plotlyDiv, data, layout)

  // event handler to select points and show datatabels
  plotlyDiv.on('plotly_buttonclicked', function (e) {
    // console.log(e.button.name)
    var buttonName = e.button.name;

    if (['weeks', 'chapters'].includes(buttonName)) {
      currentTab = buttonName;
      selectize.clear()
      // console.log(plotlyDiv.calcdata);
    } else {
      if (currentTab == 'weeks') {
        plotMean = plotlyDiv.calcdata[0][0]['med'];
        plotQ1 = plotlyDiv.calcdata[0][0]['q1'];
      } else if (currentTab == 'chapters') {
        plotMean = plotlyDiv.calcdata[1][0]['med'];
        plotQ1 = plotlyDiv.calcdata[1][0]['q1'];
      }
    }

    var chosenStudents = [];
    var chosenStudentsInfo = [];
    var studentInfo = {};
    if (buttonName == '25') {
      for (var i = 0; i < yData[currentTab].length; i++) {
        if (yData[currentTab][i] <= plotQ1) {
          chosenStudents.push(i);
          studentInfo = studentsInfo[i]
          chosenStudentsInfo.push([studentInfo['first_name'], studentInfo['last_name'], studentInfo['email'], yData[currentTab][i]])
        }
      }
      dataTables = createDataTables(chosenStudentsInfo)
    } else if (buttonName == '50') {
      for (var i = 0; i < yData[currentTab].length; i++) {
        if (yData[currentTab][i] <= plotMean) {
          chosenStudents.push(i);
          studentInfo = studentsInfo[i]
          chosenStudentsInfo.push([studentInfo['first_name'], studentInfo['last_name'], studentInfo['email'], yData[currentTab][i]])
        }
      }
      dataTables = createDataTables(chosenStudentsInfo)
    } else {
      chosenStudents = []
      if (dataTables) {
        // dataTables.clear();
        dataTables.rows()
          .remove()
          .draw();
      }
    }

    data[0]['selectedpoints'] = chosenStudents
    // data[0]['selected'] = selected
    data[1]['selectedpoints'] = chosenStudents
    // data[1]['selected'] = selected

    Plotly.update(plotlyDiv, data, layout);
  })

  function updateBoxPlot(chosenStudents) {
    var chosenStudents = chosenStudents || []

    data[0]['selectedpoints'] = chosenStudents
    // data[0]['selected'] = selected
    data[1]['selectedpoints'] = chosenStudents
    // data[1]['selected'] = selected

    Plotly.update(plotlyDiv, data, layout)
  };

  //
  // selectize code
  //
  var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

  var formatName = function (item) {
    return $.trim((item.first_name || '') + ' ' + (item.last_name || ''));
  };



  var $selectize = $('#select-to').selectize({
    plugins: ['remove_button'],
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

  var selectize = $selectize[0].selectize;

  // show current values in multi input dropdown
  $('select.selectized,input.selectized').each(function () {
    var $input = $(this);

    var update = function (e) {
      var selectedStudents = $input.val();
      if (selectedStudents) {
        var chosenStudents = [];
        for (var i = 0; i < selectedStudents.length; i++) {
          chosenStudents.push(studentsInfoIndex[selectedStudents[i]]);
        }
        updateBoxPlot(chosenStudents)
      }
    }

    $(this).on('change', update);
  });

});
