import React, { Component } from 'react';
import './App.css';
// import CustomButton from "./components/Custombutton"
import Chart from "./components/Chart"
import Inputtag from "./components/Custominput"
// import { Button } from '@material-ui/core';
import axios from 'axios';


let idNumber = 0;
let idLiteral = "chart_0"

class App extends Component {
  //defaults:
  //Legend onClick,onHover, onLeave

  constructor() {
    super();

    this.state = {
      datas:{},
      datasetLabels:{},
      fill:{},
      legendDisplay:true,
      legendText:"Some lovely plot",
      legendPosition: "top",
      titleDisplay:true,
      titleText:"My beautiful Chart",
      xAxisLabel:"",
      yAxisLabel:""

    }
  }

  convertData = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      let tmp = {
        x: data[i][0],
        y: data[i][1]
      }
      result.push(tmp)
    }
    return result;

  }



  addPlot = (handover) => {

    let holdDatasets = this.state.datas;
    let holdLabels = this.state.datasetLabels;
    let holdFills = this.state.fill;

    let data = this.convertData(handover)
    let id = idLiteral.concat(idNumber.toString());

    holdDatasets[id] = data;
    holdFills[id] = false
    holdLabels[id] = "";


    this.setState({
      datas: holdDatasets,
      datasetLabels: holdLabels,
      fill: holdFills
    })

    this.idNumber++;

  }

  uploadData = (content) => {

    axios.post("/uploadData", {
      content
    }).then(response => {
      this.addPlot(response.data)
    })

  }



  readFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.uploadData(event.target.result);
    });


    // const uploadDataSet = (event) => {
    //   const fileList = event.target.files;
    //   this.readFile(fileList[0])
    // }
    reader.readAsText(file);
  }


  readInputFile = (event) => {

    const fileList = event.target.files;
    this.readFile(fileList[0])
  }



  //TODO: Implemet droparea
  // dropArea = document.getElementById('chartDiv');


  //TODO:   Event-Listener : https://stackoverflow.com/questions/55262596/using-useeffect-with-event-listeners
  //                         https://stackoverflow.com/questions/36180414/reactjs-add-custom-event-listener-to-component

  // dropArea.addEventListener('dragover', (event) => {
  //   const dropArea = document.getElementById('chartDiv');
  //   event.stopPropagation();
  //   event.preventDefault();
  //   // Style the drag-and-drop as a "copy file" operation.
  //   event.dataTransfer.dropEffect = 'copy';
  // });

  // dropArea.addEventListener('drop', (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   const fileList = event.dataTransfer.files;
  //   readFile(fileList[0])
  // });


  loadFirstSet = () => {
    axios.get("http://localhost:8008/getData").then(response => {

      let handover = response.data;
      this.addPlot(handover)
    });
  }



  toggleGradient = (event) => {
    this.setState({
      
    })

  }


  titleChangedHandler = (event) => {
    this.setState({
      titleText: event.target.value
    })
  }
  legendChangedHandler = (event) => {
    this.setState({
      LegendText: event.target.value
    })
  }
  xAxisChangedHandler = (event) => {
    this.setState({
      xAxisLabel: event.target.value
    })
  }
  yAxisChangedHandler = (event) => {
    this.setState({
      yAxisLabel: event.target.value
    })
  }
  


      render() {
                  return (
                    <div className="App" position="relative">
        <h1>Let's work here you fucker</h1>
        <div className="chartDiv" position="absolute" align="center">
          <Chart
            {...this.state}
          />
        </div>
        <div>
          <h2>Tools </h2>
          <Inputtag changer={this.titleChangedHandler} label="Title" ></Inputtag>
          <Inputtag changer={this.legendChangedHandler} label="Legend" ></Inputtag>
          <Inputtag changer={this.xAxisChangedHandler} label="X-Axis" ></Inputtag>
          <Inputtag changer={this.yAxisChangedHandler} label="Y-Axis" ></Inputtag>
          <input type="file" id="fileSelector" accept=".txt, .csv" onChange={this.readInputFile}></input>
          <button onClick={this.loadFirstSet}>Load data</button>

          <button onClick = {Chart.colourGradient} > Linear Gradient</button>

        </div>

      </div>
    );
  };

}

export default App;
