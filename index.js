
$(function () {
  // $('.student_data').select2();
  var studentsInfo = [
    { first_name: "Istrator", last_name: "Admin", email: "admin@opendsa.org" },
    { first_name: "Teacher", last_name: "Ima", email: "example-1@railstutorial.org" },
    { first_name: "Stoltenberg", last_name: "Jordon", email: "example-2@railstutorial.org" },
    { first_name: "Torphy", last_name: "Ardith", email: "example-3@railstutorial.org" },
    { first_name: "Keeling", last_name: "Pearlie", email: "example-4@railstutorial.org" },
    { first_name: "White", last_name: "Rahul", email: "example-5@railstutorial.org" },
    { first_name: "Conn", last_name: "Maiya", email: "example-6@railstutorial.org" },
    { first_name: "Thompson", last_name: "Koby", email: "example-7@railstutorial.org" },
    { first_name: "Haag", last_name: "Robyn", email: "example-8@railstutorial.org" },
    { first_name: "O", last_name: "Reilly", email: "example-9@railstutorial.org" },
    { first_name: "Marquardt", last_name: "Zoe", email: "example-10@railstutorial.org" },
    { first_name: "Kiehn", last_name: "Amira", email: "example-11@railstutorial.org" },
    { first_name: "Doyle", last_name: "Patrick", email: "example-12@railstutorial.org" },
    { first_name: "Runte", last_name: "Brooks", email: "example-13@railstutorial.org" },
    { first_name: "Morissette", last_name: "Otho", email: "example-14@railstutorial.org" },
    { first_name: "Connelly", last_name: "Leda", email: "example-15@railstutorial.org" },
    { first_name: "Frami", last_name: "Dayne", email: "example-16@railstutorial.org" },
    { first_name: "Morar", last_name: "Aurelia", email: "example-17@railstutorial.org" },
    { first_name: "Mohr", last_name: "Buster", email: "example-18@railstutorial.org" },
    { first_name: "Sporer", last_name: "Casper", email: "example-19@railstutorial.org" },
    { first_name: "Nader", last_name: "Jammie", email: "example-20@railstutorial.org" },
    { first_name: "Wolff", last_name: "Noah", email: "example-21@railstutorial.org" },
    { first_name: "Upton", last_name: "Fatima", email: "example-22@railstutorial.org" },
    { first_name: "Bernier", last_name: "Oma", email: "example-23@railstutorial.org" },
    { first_name: "VonRueden", last_name: "Alexandro", email: "example-24@railstutorial.org" },
    { first_name: "Pfannerstill", last_name: "Breanne", email: "example-25@railstutorial.org" },
    { first_name: "Hilpert", last_name: "Darren", email: "example-26@railstutorial.org" },
    { first_name: "Becker", last_name: "Virgie", email: "example-27@railstutorial.org" },
    { first_name: "Gorczany", last_name: "Eleonore", email: "example-28@railstutorial.org" },
    { first_name: "Wolf", last_name: "Malinda", email: "example-29@railstutorial.org" },
    { first_name: "O", last_name: "Hara", email: "example-30@railstutorial.org" }
  ]
  var text = studentsInfo.map(x => x.first_name + " " + x.last_name + "<" + x.email + ">")
  var studentsInfoIndex = {};

  for (var i = 0; i < studentsInfo.length; i++) {
    studentsInfoIndex[studentsInfo[i]['email']] = i;
  }


  // Default box plot
  setBoxPlot();

  function setBoxPlot(chosenStudents) {
    var chosenStudents = chosenStudents || [];
    var selected = {};
    var unselected = {};
    if (chosenStudents != undefined || chosenStudents.length != 0) {
      selected = {
        marker: {
          size: 6,
          color: 'rgb(255, 0, 0)'
        }
      }
      unselected = {
        marker: {
          size: 5,
          opacity: 0.5
        }
      }
    }

    var yData = [3.2146905937041748, 16.337442378832883, 3.2539601774461735, 4.755584638603736, 15.956184503328522, 1.0236859132489684, 6.423572479978357, 19.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981];
    var yData1 = [3.2146905937041748, 15.337442378832883, 13.2539601774461735, 14.755584638603736, 5.956184503328522, 11.0236859132489684, 16.423572479978357, 10.933330118912536, 6.2264725816196265, 10.274937628559645, 8.047246143373282, 9.175666737991758, 18.645787209731942, 18.567844540339404, 17.528679104158215, 0.5182648760324993, 3.8180323515972248, 15.527970648790216, 19.753525357400772, 2.781231640974644, 12.854973038577594, 12.827236979598968, 5.496562187336775, 9.653908256257871, 13.86613500036622, 18.408012701634846, 18.7709252038373, 12.40018253575155, 17.028683936654602, 14.459569438850227, 7.365172492737981];

    var data = [{
      name: 'Week 1',
      type: 'box',
      y: yData,
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
        // color: 'rgba(93, 164, 214, 0.5)'
      },
      // boxmean: true,
      // notched: true,
      selectedpoints: chosenStudents,
      selected: selected,
      // unselected: unselected,
      line: {
        width: 1
      },
      hoverlabel: {
        font: { size: 15 }
      }
    }, {
      name: 'Chapter 1',
      type: 'box',
      y: yData1,
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
      // notched: true,
      selectedpoints: chosenStudents,
      selected: selected,
      // unselected: unselected,
      line: {
        width: 1
      },
      hoverlabel: {
        font: { size: 15 }
      },
      visible: false
    }];

    var updatemenus = [{
      buttons: [{
        args: [{ 'visible': [true, false] },
        {
          'title': 'Total time students spend on OpenDSA materials per week.'
        }
        ],
        label: 'Weeks',
        method: 'update'
      }, {
        args: [{ 'visible': [false, true] },
        {
          'title': 'Total time students spend on OpenDSA materials per chapter.'
        }
        ],
        label: 'Chapters',
        method: 'update'
      }],
      direction: 'left',
      pad: { 'r': 10, 't': 10 },
      showactive: true,
      type: 'buttons',
      x: 1,
      xanchor: 'left',
      y: 1.2,
      yanchor: 'top'
    }]

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
    };

    Plotly.newPlot('myDiv', data, layout);
  };

  // selectize code
  var $wrapper = $('#wrapper');

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
  });

  // show current input values
  $('select.selectized,input.selectized', $wrapper).each(function () {
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

});
