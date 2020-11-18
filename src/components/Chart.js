import React, {PureComponent} from 'react'
import {Line, Scatter} from 'react-chartjs-2'

var chartData;
var chartOptions;
                //PureComponent
class Chart extends PureComponent {


    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "scatter",
            data: {
                //Bring in data
                labels: [],
                datasets: [
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div className={graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }





    // ---------------------------------

    constructor(props) {
        super(props);
    
        this.chartRef = React.createRef();
      }

    //Even working?                        
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
    }
            
            
    render() {
        chartData = this.props.chartData
        chartOptions  = this.props.chartOptions
        // console.log("Rendering in Chart.js")
        // console.log("ChartData: " , chartData);
        // console.log("ChartOptions: " , chartOptions)
        // console.log("---------------------------------------------------------")
        return (
            <div style = {{ postion: "absolute", width : "770px", height : "400px" }} className ="chart" >
                <Scatter
                    data = {chartData}
                    options = {chartOptions}
                /> 
            </div>
        )
    }
}


export default Chart;