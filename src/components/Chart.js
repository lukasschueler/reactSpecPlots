import React from 'react'
import {Line} from 'react-chartjs-2'
import "chartjs-plugin-colorschemes"
import "chartjs-plugin-zoom"



const Chart = (
   {  
       pointRadius,
       datas,
        datasetLabels ,
        fill ,
        legendDisplay , 
        legendText , 
        legendPosition ,
    titleDisplay ,
    titleText ,
    xAxisLabel ,
    yAxisLabel,
    borderColor , 
    receiveChange,
    setActivity
    },

    ) => {
        // console.log("Signal: ", receiveChange)
        
        let chartData = buildData()
        
        let chartOptions  = {
            title: {
              display: titleDisplay,
              text: titleText
            },
            legend: {
                display: legendDisplay,
                text: legendText,
                position: legendPosition,
                onClick: handleLegendClick
            },
            scales: {
                xAxes: [{
                    type: "linear",
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: xAxisLabel                
                    }
                }],
        
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: yAxisLabel
                    }
                  }]
            },
            elements: {
                line: {
                    tension: 0 // disables bezier curves
                }
            },
            plugins: {
                colorschemes: {
                  scheme: 'brewer.Spectral7'
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        // drag: true,
                        mode: 'xy',
                        speed: 0.08,
                    }
                }
              },
        }
        


    this.chartReference = React.createRef();

    function rainbow (canvas) {
        console.log("Called")
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(250,174,50,1)');   
        gradient.addColorStop(1, 'rgba(250,174,50,0)');
        
        return gradient;      
    }


    function buildData() {
        let datasets = [];
        Object.keys(datas).forEach(function(key) {

            let tmp = {
                id: key,
                data: datas[key],
                label: datasetLabels[key],
                fill: fill[key],
                pointRadius: pointRadius[key],
                borderColor: borderColor[key]
            }
            datasets.push(tmp)
        });

        let output = {
            datasets: datasets
        }
        return output;
    } 


    function handleLegendClick(e, legendItem, legend){
       let identifier =  getKeyByValue(datasetLabels, legendItem.text)
       console.log("Identifier:", identifier)
       setActivity(identifier)

    //    receiveChange("pointRadius", 3, identifier)

    //    const result = chartData.datasets.find( ({ id }) => id === identifier );
    //    console.log("Result: ", result)
    //    result.borderColor = "black"
    //    result.fill = true;
    //    result.label = "Selected"
    //    console.log("Result22: ", result)


        // console.log("Dataset: " , chartData)

       //Add to selection
       //Change visuals acoordingly 


    }

    function handleLegendHover(){

    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }
      
      

      



    // -----------------Different Color Supplies--------------------------
    // var colors = [];
    // while (colors.length < 100) {
    //     do {
    //         var color = Math.floor((Math.random()*1000000)+1);
    //     } while (colors.indexOf(color) >= 0);
    //     colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    // }


    // var colorArray = [
    //     '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
	// 	  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	// 	  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
	// 	  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	// 	  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
	// 	  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	// 	  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
	// 	  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	// 	  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    //       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    //     ];

    // ---------------------------------------------------------------------------

    
    
    

    
    return (
        <div style = {{ postion: "absolute", width : "1000px", height : "650px" }} className ="chart" >
            <Line
                ref={this.chartReference}
                data = {chartData}
                options = {chartOptions}
            /> 
        </div>
    )
}

export default Chart;

    