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

  keyProvider = () => {
    
    return idLiteral.concat(idNumber.toString());

  }
  
  
  addPlot = (handover, fileName) => {
    
    console.log("fileName: ", fileName)

    let holdDatasets = this.state.datas;
    let holdLabels = this.state.datasetLabels;
    let holdFills = this.state.fill;
    let holdBorderColors = this.state.borderColor;
    
    let data = this.convertData(handover)
    let id = this.keyProvider()
    idNumber++;

    holdDatasets[id] = data;
    holdFills[id] = false
    holdLabels[id] = fileName;
    holdBorderColors[id] = undefined


    this.setState({
      datas: holdDatasets,
      datasetLabels: holdLabels,
      fill: holdFills
    })

    console.log("Now state contains: ", this.state.datas)
    console.log("The state is: ", this.state)

  }

  uploadData = (content, fileName) => {

    axios.post("/uploadData", {
      content
    }).then(response => {
      this.addPlot(response.data, fileName)
    })

  }



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



  
  
  //TODO:   Event-Listener : https://stackoverflow.com/questions/55262596/using-useeffect-with-event-listeners
  //                         https://stackoverflow.com/questions/36180414/reactjs-add-custom-event-listener-to-component
  
  // TODO: Implemet droparea

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


  receivedChange = (property, value, id) => {
    console.log("Signal incoming")
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
            

          />
        </div>
        <div>
          <h3>Tools </h3>
          <Inputtag changer={this.titleChangedHandler} label="Title" ></Inputtag>
          <Inputtag changer={this.legendChangedHandler} label="Legend" ></Inputtag>
          <Inputtag changer={this.xAxisChangedHandler} label="X-Axis" ></Inputtag>
          <Inputtag changer={this.yAxisChangedHandler} label="Y-Axis" ></Inputtag>
          {/* <input type="file" id="fileSelector" accept=".txt, .csv" onChange={this.readInputFile}></input> */}
          {/* <ButtonGroup variant = "contained" color ="primary">
          <CustomButton changer = {this.receiveChange} value = "Gradient"> </CustomButton>
          <CustomButton changer = {this.receiveChange} value = "Smooth"> </CustomButton>
          <CustomButton changer = {this.receiveChange} value = "Maximum"> </CustomButton>
          </ButtonGroup> */}
        
        </div>

      </div>
      </ThemeProvider>
    );
  };

}

export default App;
