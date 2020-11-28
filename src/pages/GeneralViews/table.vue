
<template>
    <body>
        <div class="container mt-4" id="app">
            <h2>{{message}}</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">State</th>
                        <th scope="col">Confirmed Cases</th>
                        <th scope="col">Recovered Cases</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope= "row">Ontario</th>
                        <td>23</td>
                        <td>12</td>
                    </tr>
                    <!--<tr v-for="state in states">
                        <th scope="row">{{index+1}}</th>
                        <td>{{state.confirmed}}</td>
                        <td>{{state.recovered}}</td>
                    </tr>-->
                </tbody>
            </table>
        </div>
    </body>
</template>
<!--
<script>
    export default{
        e1: '#app',
        data:{
            states: []
        },

        mounted: function(){
            axios.get('https://api.github.com/repos/khushbupatel24/covid-data/contents/data/table.json')
            .then(response => {
                this.states=response.data;
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
     }) 
    }
</script>
-->

<!--  for clock -->

<!--<template>
    <div id="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    </div>
</template>
<script>
    export default
    {
        name: "app",
        data: {
                time: '',
                date: ''
            }
        };

        var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var timerID = setInterval(updateTime, 1000);
        updateTime();
        function updateTime() {
            var cd = new Date();
            clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        };

        function zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    };
</script> 
<style>
body {
    background: #0f3854;
    background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
    background-size: 100%;
}
p {
    margin: 0;
    padding: 0;
}
#clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
    .time {
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }
    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }
    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
</style>-->
