<script>
    import {Bar} from "vue-chartjs";

    export default {
        extends: Bar,
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
            const {
                borderColor,
                pointBorderColor,
                pointBackgroundColor,
                backgroundColor
            } = this.chartColors;

            this.renderChart(
                {
                    labels: this.labels,
                    datasets: [
                        {
                            label: this.label,
                            data: this.chartData,
                            backgroundColor: backgroundColor
                        }
                    ]
                },
                this.options
            );
        }
    };
</script>
