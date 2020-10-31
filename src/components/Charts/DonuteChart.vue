<script>
    import {Doughnut } from "vue-chartjs";

    export default {
        extends: Doughnut,
        props: {
            label: {
                type: String
            },
            labels: {
                type: Array
            },
            chartData: {
                type: Array
            },
            options: {
                type: Object
            },
            chartColors: {
                type: Object
            }
        },
        mounted() {
            console.log('in mounted line chart')
            this.renderChart(
                {
                    labels: this.labels,
                    datasets: [
                        {
                            label: this.label,
                            data: this.chartData,
                            backgroundColor: this.chartColors
                        }
                    ]
                },
                this.options
            );
        }
    };
</script>
