var Myo = require('myo');

var queue = Array.apply(null, new Array(150)).map(function() {return 0;});
var total_push_ups = 0;
var states = {
    UP : 0,
    DOWN : 1,
    REST : 2
}
var state = states.UP;
var count = 0;
var started = false;
var prev_time = Date.now();

const THRESHOLD = 180;

//Start talking with Myo Connect
Myo.connect('com.ronnoceel.myoapp');

Myo.on('connected', function(){
    this.streamEMG(true);
});

Myo.on('emg', function(data){
    var data_sum = data.map(Math.abs).reduce(add,0);


    queue.push(data_sum);
    var value = queue.shift();
    var queue_sum = queue.reduce(add,0);

    average = queue_sum / queue.length;

    stars = Array(Math.floor(average/8)).join('*')
    console.log(stars);

    /*
    count++;
    if(count%250 == 0){
        console.log(Date.now()-prev_time);
        prev_time = Date.now();
    }
    */

    //console.log(Math.floor(average));
    /*
    if (average < THRESHOLD){
        new_state = states.UP;
    } else {
        new_state = states.DOWN;
    }
    //This is an xor condition
    if ( state ? !new_state : new_state ) {
        if (state == states.DOWN) {
            state = states.UP
            time = Date.now();
            if(started && (time - prev_time > 5000)){
                this.streamEMG(false);
                console.log("more than three seconds between ups... end");
            //prevents us from double counting state changes
            } else if(started && (time - prev_time > 1000)){
                count++;
                console.log(count);
                prev_time = time;
            } else if(started && (time - prev_time > 500)){
                console.log("Too fast");
            }
        } else {
            state = states.DOWN;
            if(!started){
                started = true;
                prev_time = Date.now();
                console.log("Started!");
            }
        }
    }*/
});

function add(a, b) {
    return a + b;
}
