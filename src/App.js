import React, {
  Component
} from 'react';
import './App.css';
// import CustomButton from "./components/Custombutton"
import Chart from "./components/Chart"
import Inputtag from "./components/Custominput"
// import { Button } from '@material-ui/core';
import axios from 'axios';


class App extends Component {

  constructor() {
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {}
      // title: {
      // display: this.props.displayTitle,
      // text: "STARTINGPOINT", 
      // this.state.chartData,
      // fontSize:25
      // ,
      // legend:{
      // display:this.props.displayLegend,
      // position:this.props.legendPosition
      // },      
      // maintainAspectRatio: false,
    }
  }



  const uploadDataSet = (event) => {

    const fileList = event.target.files;
    readFile(fileList[0])
  }


  let readFile(file) {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      uploadData(event.target.result, file.name);
    });

    reader.readAsText(file);
  }

  const uploadData = (content, name) => {

    axios.post("/uploadData", {
      content
    }).then(response => {
      addPlot(response.data, {
        name
      })
    })

  }

  addPlot = (content, values) => {

    let data = [];
    for (let i = 0; i < content.length; i++) {
      let tmp = {
        x: content[i][0],
        y: content[i][1]
      }
      data.push(tmp)
    }
    console.log("Länge: ", data.length)


    this.setState({
      chartData: {
        datasets: [{
          label: values.name,
          data: data
        }]
      },
      chartOptions: {
        title: {
          display: true,
          text: 'You made it!'
        }
      }
    })
  }


  const dropArea = document.getElementById('chartDiv');

  dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
  });

  dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    readFile(fileList[0])
  });



  makeColourGradient = (event) => {
    var ctx = document.getElementById('chart').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(0.2, "#94d973");
    gradientStroke.addColorStop(0.5, "#fad874");
    gradientStroke.addColorStop(1, "#f49080");


    this.setState({
      chartData: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          label: event.target.value,
          data: [2, 15, 23],
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke
        }]
      },
      chartOptions: {
        title: {
          display: true,
          text: 'You made it!'
        }
      }
    })
  }

  loadFirstSet = () => {
    axios.get("http://localhost:8008/getData").then(response => {


      let content = response.data;
      let data = [];
      for (let i = 0; i < content.length; i++) {
        let tmp = {
          x: content[i][0],
          y: content[i][1]
        }
        data.push(tmp)
      }
      console.log("Länge: ", data.length)


      this.setState({
        chartData: {
          datasets: [{
            label: "First load",
            data: data
          }]
        },
        chartOptions: {
          title: {
            display: true,
            text: 'You made it!'
          }
        }
      })

    });
  }




  titleChangedHandler = (event) => {
    console.log(event.target)
    this.setState({
      chartData: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          label: event.target.value,
          data: [2, 15, 23]
        }]
      },
      chartOptions: {
        title: {
          display: true,
          text: 'You made it!'
        }
      }
    })
  }
                                                                        
render() {
    return (
      <div className="App" position="relative">
        <h1>Let's work here you fucker</h1>
        <div className = "chartDiv" position="absolute" align="center">
          <Chart
            chartData={this.state.chartData}
            chartOptions={this.state.chartOptions}
          />
        </div>
        <div>
          <h2>Tools </h2>
          <Inputtag changer={this.titleChangedHandler} content="Title" ></Inputtag>
          <Inputtag changer={this.makeColourGradient} content="Colour" ></Inputtag>
          <Inputtag changer={this.titleChangedHandler} content="X-Axis" ></Inputtag>
          <Inputtag changer={this.titleChangedHandler} content="Y-Axis" ></Inputtag>
          <input type="file" id="fileSelector" accept=".txt, .csv" onChange = {this.uploadDataSet}></input>
          <button onClick = {this.loadFirstSet} > Load data</button>

        </div>

      </div>
    );
  };
}
  

  export default App;
  