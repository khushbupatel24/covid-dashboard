<script>
    import {Line} from "vue-chartjs";

    export default {
        extends: Line,
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
            isFilled: {
                type: Boolean,
                default: false,
            },
            chartColors: {
                type: Object
            }
        },
        mounted() {
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
                            borderColor: backgroundColor,
                            backgroundColor: backgroundColor,
                            fill: this.isFilled
                        }
                    ]
                },
                this.options
            );
        }
    };
</script>
