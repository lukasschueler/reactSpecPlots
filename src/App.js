import React, { Component } from 'react';
import './App.css';
import ButtonGroup from '@material-ui/core/Button' 
import CustomButton from "./components/Custombutton"
import Chart from "./components/Chart"
import Inputtag from "./components/Custominput"
// import { Button } from '@material-ui/core';
import axios from 'axios';
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core';
import { green, red} from '@material-ui/core/colors' 
// import AppBar from '@material-ui/core/AppBar'
// import Menu from '@material-ui/core/Menu'
// import Toolbar from '@material-ui/core/ToolBar'
// import IconButton from '@material-ui/core/IconButton'




let idNumber = 0;
let idLiteral = "chart_0"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500]
    }
  }
});

class App extends Component {
  //defaults:
  //Legend onClick,onHover, onLeave
  
  constructor() {
    super();
    
    this.state = {
      activePlots: [],
      pointRadius:{},
      datas:{},
      datasetLabels:{},
      fill:{},
      legendDisplay:true,
      legendText:"Some lovely plot",
      legendPosition: "top",
      titleDisplay:true,
      titleText:"Testing",
      xAxisLabel:"",
      yAxisLabel:"",
      borderColor: {}
      
    }
    this.receivedChange = this.receivedChange.bind(this);
  }
  //Filereader
  readFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.uploadData(event.target.result, file.name);
    });
    reader.readAsText(file);
  }
  readInputFile = (event) => {
    const fileList = event.target.files;
    this.readFile(fileList[0])
  }

  //Initialize droparea after mounting
  componentDidMount() {
    console.log("Mounted")

    const dropArea = document.getElementsByClassName('chartDiv');
    dropArea[0].addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = 'copy';
    });
  
    dropArea[0].addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      this.readFile(fileList[0])
    });
  }

  //Converts the server data into chart.js readable form 
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
  //Builds unique identifier for each dataset
  keyProvider = () => {
    return idLiteral.concat(idNumber.toString())
  }
  
  //Builds the configuration for a given dataset
  addPlot = (handover, fileName) => {
    console.log("fileName: ", fileName)

    let holdDatasets = this.state.datas;
    let holdLabels = this.state.datasetLabels;
    let holdFills = this.state.fill;
    let holdBorderColors = this.state.borderColor;
    let holdPointRadius = this.state.pointRadius;
    
    let data = this.convertData(handover)
    let id = this.keyProvider()
    idNumber++;

    holdDatasets[id] = data;
    holdFills[id] = false
    holdLabels[id] = fileName;
    holdBorderColors[id] = undefined
    holdPointRadius[id] = 0


    this.setState({
      datas: holdDatasets,
      datasetLabels: holdLabels,
      fill: holdFills,
      pointRadius: holdPointRadius
    })
    console.log("The state is: ", this.state)
  }

  //Hands file over to server for conversion to useable data
  uploadData = (content, fileName) => {
    axios.post("/uploadData", {
      content
    }).then(response => {
      this.addPlot(response.data, fileName)
    })

  }
  
  //This fucntion supervises the selction of different plots
  setActivity = (id) => {
    if (this.state.activePlots.includes(id)){
      let tmp = this.state.activePlots.filter(function(e) { return e !== id })
      this.setState(prevState => ({
        activePlots:tmp,
        pointRadius: {
          ...prevState.pointRadius,
          [id]: 0
        }
      }))
    } else {
      this.setState(prevState => ({
        activePlots: [...prevState.activePlots, id],
        pointRadius: {
          ...prevState.pointRadius,
          [id]: 2
        }
      }))
    }
    console.log("ActivePlots: ", this.state.activePlots)
  }

  smoothSelection = () => {
    let polynomialDegree = document.getElementById("degree").value
    let windowSize = document.getElementById("windowSize").value

    console.log("Degree", polynomialDegree)
    console.log("windowSize", windowSize)

    this.state.activePlots.forEach(id => {
      
      let content = this.state.datas[id]
      // console.log("content:" ,  content)
      axios.post("/smoothData", {
        data : content,
        degree : polynomialDegree,
        windowSize : windowSize
        }
      ).then(response => {
          this.setState(prevState => ({
            datas:{
              ...prevState.datas,
              [id]: response.data
            }
          }))
          console.log("Responsetype: ", response)
        })
    });
  }
  
  
  receivedChange = (property, value, id) => {
    console.log("APP.JS: Signal incoming")
    console.log("Property: ", property)
    console.log("Value: ", value)
    // this.setState({
      //   [property] : value
      
      // })
      

      this.setState(prevState => ({
        
        // update your 'list' property
        [property]: {
          // spread old values into this object so you don't lose any data
          ...prevState.property,
          // update this field's value
          [id]: value
        }
      }))
      console.log("Updated?: " ,this.state)
    }
    
    toggleGradient = (event) => {
      this.setState({
        
      })
      
    }
    
    //TODO:   Event-Listener : https://stackoverflow.com/questions/55262596/using-useeffect-with-event-listeners
    //                         https://stackoverflow.com/questions/36180414/reactjs-add-custom-event-listener-to-component
    
    //HANDLER FOR THE RESPECTIVE HTML ELEMENTS
    
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
            <ThemeProvider theme={theme} >
            {/* <AppBar>
              <Toolbar>
              <IconButton>
                  <Menu />
              </IconButton>
              </Toolbar>
            </AppBar> */}
        <div className="App" position="relative">
        <h1>Spectral Plotting</h1>
        <div className="chartDiv" position="absolute" align="center">
          <Chart
            {...this.state}
            receiveChange = {this.receivedChange}
            setActivity = {this.setActivity}
            

          />
        </div>
        <div>
          <h3>Tools </h3>
          <Inputtag changer={this.titleChangedHandler} label="Title" ></Inputtag>
          <Inputtag changer={this.legendChangedHandler} label="Legend" ></Inputtag>
          <Inputtag changer={this.xAxisChangedHandler} label="X-Axis" ></Inputtag>
          <Inputtag changer={this.yAxisChangedHandler} label="Y-Axis" ></Inputtag>   

          <Inputtag id = "degree" changer={this.xAxisChangedHandler} label="Degree" default = "3" ></Inputtag>
          <Inputtag id ="windowSize" changer={this.yAxisChangedHandler} label="WindowSize" default = "23"></Inputtag>
          <CustomButton changer = {this.smoothSelection} value = "Smooth"> </CustomButton>


          {/* <input type="file" id="fileSelector" accept=".txt, .csv" onChange={this.readInputFile}></input> */}
          {/* <ButtonGroup variant = "contained" color ="primary">
          <CustomButton changer = {this.receiveChange} value = "Gradient"> </CustomButton>
          <CustomButton changer = {this.receiveChange} value = "Maximum"> </CustomButton>
          </ButtonGroup> */}
        
        </div>

      </div>
      </ThemeProvider>
    );
  };

}

export default App;
