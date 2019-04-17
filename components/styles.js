import { StyleSheet, PixelRatio } from 'react-native';
const deviceScreen = require('Dimensions').get('window')

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: '#B99BC4',
  },
  container: {
    flex: 1,
    backgroundColor: '#C5B9C9',
  },
  controlPanel: {
    flex: 1,
    backgroundColor: "#0D2847",
  },
  controlPanelText: {
    color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
  },
  controlPanelWelcome2: {
    fontSize: 15,
    margin: 10,
    color: 'lightgrey',
    fontWeight: 'bold',
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  controlPanelWelcome: {
    fontSize: 20,
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 15,
    textAlign: 'left',
    left: 10,
    padding: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    padding: 10,
    alignItems: 'center'
  },
  lastRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    padding: 10,
    alignItems: 'center'
  },
  rowLabel: {
    left: 10,
    fontSize: 15,
    flex: 1,
  },
  rowInput: {
    right: 10,
  },
  sliderMetric: {
    right: 10,
    width: 30,
  },
  slider: {
    width: 150,
    height: 30,
    margin: 10,
  },

  picker: {
    padding: 0,
  },

  label: {
    fontSize: 20,
    textAlign: 'left',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemPicker: {
    color: '#FFFFFF',
    backgroundColor: '#0D2847'
  },

  button: {
    padding: 15,
    backgroundColor: "red",
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },

  container: {
    backgroundColor: "#0D2847",
    padding: 24,
  },

  menuButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },

  largeButton: {
    backgroundColor: "#4AA7D1",
    borderRadius: 10,
    justifyContent: "center",
    height: 60,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 1.5,
    marginTop: 10,
    elevation: 1
  },

  largeButtonOutline: {
    borderWidth: 1,
    borderColor: "#4AA7D1",
    backgroundColor: "transparent",
    marginLeft: 16,
    marginRight: 16
  },

  largeButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },

  largeButtonOutlineText: {
    color: "#4AA7D1",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },

  subtitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#84A2C4",
    letterSpacing: 1.5,
  }
});