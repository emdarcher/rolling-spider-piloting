//testing flying the rolling spider drone
//

'use strict';

var RollingSpider = require("rolling-spider");
var temporal = require('temporal');
var rollingSpider = new RollingSpider();

rollingSpider.connect(function(err) {
    if (err) throw err;
    rollingSpider.setup(function() {
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();

        temporal.queue([
            {
                delay: 5000,
                task: function () {
                    rollingSpider.takeOff();
                    rollingSpider.flatTrim();
                }
            },
            /*{
                delay: 2000,
                task: function () {
                    rollingSpider.forward();
                }
            },*/
            {
                delay: 5000,
                task: function () {
                    rollingSpider.land();
                }
            },
            {
                delay: 5000,
                task: function () {
                    temporal.clear();
                    process.exit(0);
                }
            }
        ]);


    });
});



