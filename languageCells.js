define(["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"], function() {


    function watsonAPI() {};

    watsonAPI.prototype.initialize = function(oControlHost, fnDoneInitializing) {
        console.log('1. ***** init')
        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' type='text/css' media='screen'>");
        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='http://localhost/controls/assets/style/paper.bootstrap.min.css'>");
        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='http://localhost/controls/assets/style/table.css' type='text/css' media='screen'>");
        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='http://localhost/controls/assets/style/sparkTbl.css' type='text/css' media='screen'>");

        fnDoneInitializing();
    };

    watsonAPI.prototype.draw = function(oControlHost) {
        console.log('3. **** draw')
        var elContainer = oControlHost.container;

        var dropDown = '<select class="selectpicker" data-style="btn-primary" style="display: none;">' +
            '<option value="es">Spanish</option>' +
            '<option value="fr">French</option>' +
            '<option value="de">German</option>' +
            '<option value="it">Italan</option>' +
            '<option value="pt-br">Brazilian Potugese</option>' +
            '<option value="ar">Arabic</option>' +
            '</select>'


        elContainer.innerHTML = '<a id="translate" href="#" class="btn btn-primary">Analyze</a>'



        this.m_btn = elContainer.lastChild;
        this.m_btn.onclick = this.onClick.bind(this, oControlHost);
    };

    watsonAPI.prototype.onClick = function(oControlHost) {
        console.log('test')
        $("[lid='List1'] tr").each(function(i) {
            var $this = $(this);
            var $tds = $(this).find('td'),
                source = $tds.eq(2).text();
            var dest = '';

            //console.log(source);

            var head = '<td class="lt">Sentiment</td>'
            var head2 = '<td class="lt">Emotions</td>'

            if (i == 0) {
                $(this).append(head);
                $(this).append(head2);
            } else {
                $.post("URL to BlueMix NodeRed goes Here", { "lang": "na", "txt": source },
                    function(data, status) {
                        var myKeyWords = '';
                        var translated = '<td class="lc" style="padding: 10px;">' + data.sentiment.document.label + '&nbsp &nbsp' + Number(Math.round(data.sentiment.document.score + 'e' + 2) + 'e-' + 2) + posNeg(data.sentiment.document.score) + '</td>'
                        $this.append(translated);

                        var emote = '<td id=row' + i + ' class="lc" style="padding: 10px; width:300px;"> <tbl class="sparkTbl" id=results' + i + '></tbl></td>';
                        $this.append(emote);

                        var results = '<tr><td > joy: </td><td>' + barSize(data.emotion.document.emotion.joy, 'joy') + '</td><td>' + Number(Math.round(data.emotion.document.emotion.joy + 'e' + 2) + 'e-' + 2) + '</td></tr>' +
                            '<tr><td > anger: </td><td>' + barSize(data.emotion.document.emotion.anger, 'anger') + '</td><td>' + Number(Math.round(data.emotion.document.emotion.anger + 'e' + 2) + 'e-' + 2) + '</td></tr>' +
                            '<tr><td > sadness: </td><td>' + barSize(data.emotion.document.emotion.sadness, 'sadness') + '</td><td>' + Number(Math.round(data.emotion.document.emotion.sadness + 'e' + 2) + 'e-' + 2) + '</td></tr>' +
                            '<tr><td > fear: </td><td>' + barSize(data.emotion.document.emotion.fear, 'fear') + '</td><td>' + Number(Math.round(data.emotion.document.emotion.fear + 'e' + 2) + 'e-' + 2) + '</td></tr>' +
                            '<tr><td > disgust: </td><td>' + barSize(data.emotion.document.emotion.disgust, 'disgust') + '</td><td>' + Number(Math.round(data.emotion.document.emotion.disgust + 'e' + 2) + 'e-' + 2) + '</td></tr>';

                        console.log(results)
                        $('#results' + i).append(results);

                    });
            }


        });

    };

    barSize = function(barVal, emotion) {
        console.log('VAL*****************');

        console.log(emotion);
        var barColor = 'grey';

        switch (emotion) {
            case 'joy':
                barColor = 'orange'
                break;
            case 'anger':
                barColor = 'red'
                break;
            case 'sadness':
                barColor = 'grey'
                break;
            case 'disgust':
                barColor = 'black'
                break;
            case 'fear':
                barColor = 'pink'
        }



        barVal = Math.round(barVal * 100);
        bar = '<div style="background-color:white; width:100px; height:10px; border-width: 0px; border-style: solid;">' +
            '<div style="background-color:' + barColor + '; width:' + barVal + 'px; height:10px;"></div>' +
            '</div>'

        console.log(bar);
        return (bar)
    }
    posNeg = function(barVal) {
        console.log('VAL*****************');

        console.log(barVal);
        barval = Number(Math.round(barVal + 'e' + 2) + 'e-' + 2)
        console.log(barVal);
        var barLen = 50 * barVal;
        console.log(barLen);
        var pos = 0;
        var neg = 0;

        if (barVal >= 0) { pos = barLen; } else { neg = barLen * -1; }



        html = '<table class="posneg"><tr>' +
            '<td> <div class="neg" style = "width:' + neg + 'px "></div> </td>' +
            '<td> <div class="pos" style = "width:' + pos + 'px "></div> </td>' +
            '</tr><tr>' +
            '<td> <div class="tdWidth"></div> </td>' +
            '<td> <div class="tdWidth"></div> </td>' +
            '</tr></table>'
        return (html)
    }

    watsonAPI.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2. **** set data')

    };


    return watsonAPI;
});