$(function () {
  Plotly.d3.json("https://raw.githubusercontent.com/hosamshahin/plotly_test/master/fake_data.json",
    function (err, userData) {

      var studentsInfo = userData['studentsInfo']
      var numOfWeeks = userData['weeks'].length
      var numOfChapters = userData['chapters'].length
      var text = studentsInfo.map(x => x.first_name + " " + x.last_name + "<" + x.email + ">")
      var studentsInfoIndex = {};

      for (var i = 0; i < studentsInfo.length; i++) {
        studentsInfoIndex[studentsInfo[i]['email']] = i;
      }

      plotlyDiv = $("#plotlyDiv")[0]

      var dataTables = null;
      var currentTab = 'weeks';

      function createDataTables(chosenStudentsInfo, caption) {
        var caption = caption || ""
        if ($(".students_caption").length) {
          $(".students_caption").text(caption);
        } else {
          $('#students_info').append('<caption style="caption-side: top" class="students_caption">' + caption + '</caption>');
        }

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

      function clearDataTables(dataTables) {
        if ($(".students_caption").length) {
          $(".students_caption").text("");
        }

        dataTables.rows()
          .remove()
          .draw();
      }

      // plotly data
      var plotlyData = []
      var weeksVisible = []
      var chaptersVisible = []
      // Add weeks
      for (var i = 0; i < userData["weeks"].length; i++) {
        var result = {
          name: userData["weeks_names"][i],
          type: 'box',
          y: userData["weeks"][i],
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
              size: 7,
              color: 'rgb(255, 0, 0)'
            }
          },
          line: {
            width: 1
          },
          hoverlabel: {
            font: { size: 15 }
          }
        };
        plotlyData.push(result);
        weeksVisible.push(true)
        chaptersVisible.push(false)
      };

      // Add chapters
      for (var i = 0; i < userData["chapters"].length; i++) {
        var result = {
          name: userData["chapters_names"][i],
          type: 'box',
          y: userData["chapters"][i],
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
        };
        plotlyData.push(result);
        weeksVisible.push(false)
        chaptersVisible.push(true)
      };

      // plotly menu
      var updatemenus = [
        {
          buttons: [
            {
              name: 'weeks',
              args: [{ 'visible': weeksVisible },
              {
                'title': 'Total time students spend on OpenDSA materials per week.'
              }
              ],
              label: 'Weeks',
              method: 'update'
            },
            {
              name: 'chapters',
              args: [{ 'visible': chaptersVisible },
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
          title: 'Reading time in mins.',
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
        showlegend: true,
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
      }

      // plotly initialize
      Plotly.newPlot(plotlyDiv, plotlyData, layout)

      // get the index(es) of the active trace(s)
      function getActiveTrace() {
        var calcdata = plotlyDiv.calcdata
        var activeTraces = []
        for (var i = 0; i < calcdata.length; i++) {
          if (calcdata[i][0]['x'] != undefined)
            activeTraces.push(i)
        }
        return activeTraces
      }

      // event handler to select points and show dataTables
      plotlyDiv.on('plotly_buttonclicked', function (e) {
        var buttonName = e.button.name;
        var plotMean = null;
        var plotQ1 = null;
        var traceIndex = null
        var chosenStudents = [];
        var chosenStudentsInfo = [];
        var studentInfo = {};
        selectize.clear()

        if (['weeks', 'chapters'].includes(buttonName)) {
          currentTab = buttonName;
          if (dataTables) {
            clearDataTables(dataTables)
          }
        } else {
          traceIndex = getActiveTrace()[0]

          plotMean = plotlyDiv.calcdata[traceIndex][0]['med'];
          plotQ1 = plotlyDiv.calcdata[traceIndex][0]['q1'];

          var tabIndex = (traceIndex + 1 > numOfWeeks) ? traceIndex - numOfWeeks : traceIndex;
          var refData = userData[currentTab][tabIndex]
          var refName = userData[currentTab + "_names"][tabIndex]
          if (buttonName == '25') {
            for (var i = 0; i < refData.length; i++) {
              if (refData[i] <= plotQ1) {
                chosenStudents.push(i);
                studentInfo = studentsInfo[i]
                chosenStudentsInfo.push([studentInfo['first_name'], studentInfo['last_name'], studentInfo['email'], refData[i]])
              }
            }
            dataTables = createDataTables(chosenStudentsInfo, "Students reading time less than 25th percentile for " + refName)
          } else if (buttonName == '50') {
            for (var i = 0; i < refData.length; i++) {
              if (refData[i] <= plotMean) {
                chosenStudents.push(i);
                studentInfo = studentsInfo[i]
                chosenStudentsInfo.push([studentInfo['first_name'], studentInfo['last_name'], studentInfo['email'], refData[i]])
              }
            }
            dataTables = createDataTables(chosenStudentsInfo, "Students reading time less than 50th percentile for " + refName)
          } else {
            chosenStudents = []
            if (dataTables) {
              clearDataTables(dataTables)
            }
          }

          plotlyData[traceIndex]['selectedpoints'] = chosenStudents
          Plotly.update(plotlyDiv, plotlyData, layout);
        }

      })

      function updateBoxPlot(chosenStudents) {
        var chosenStudents = chosenStudents || []
        var traceIndex = getActiveTrace()

        for (var i = 0; i < traceIndex.length; i++) {
          plotlyData[traceIndex[i]]['selectedpoints'] = chosenStudents
        }
        Plotly.update(plotlyDiv, plotlyData, layout)
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
            if (dataTables) {
              clearDataTables(dataTables)
            }
          }
        }

        $(this).on('change', update);
      });
    });
});
