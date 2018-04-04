import Papa from 'papaparse';
import {checkURLPattern} from './helpers.js';
import CustomEvent from '../events/event.js';

/**
 * Basically an Utility function for understanding the 
 * Type of data (URL, String etc) passed henced kept outside the class
 * but accessible from this class only. Can be later 
 * shifted to utility shared across project if need be.
 * @param {*} data 
 */
function detectData(data) {
    let dataType = '';
    //check whether this is a URL
    if(checkURLPattern(data)) {
        dataType = 'URL'
    } else{
        dataType = 'String'
    }

    return dataType;
}

export default class CSVProcessor extends CustomEvent {

    constructor(data) {
        //get event power
        super();
        //Instance specific data config
        this.data_config = {};
        //if the data is not empty start processing
        if(data) {
            this.data_config.rawData = data;
            if(detectData(data) === 'URL') {
                this.data_config.rawDataIsURL = true;
            } else {
                this.data_config.rawDataIsURL = false;
            }

            this.parseCSVtoJSON();
        }
       // debugger;
    }

    /**
     * Method to load and parse the passed CSV using the 
     * library Papaparse. 
     */
    parseCSVtoJSON () {
        let csvParser = this,
            dt_config = this.data_config,
            data = dt_config && dt_config.rawData,
            isURL = dt_config && dt_config.rawDataIsURL,
            parsedJSON;
            
        Papa.parse(data, {
            download: isURL,
            complete: function(results) {
                parsedJSON = results;
                csvParser.emit('dataParsed', parsedJSON);
            },
            error: function(err, file) {
                csvParser.emit('dataParseError', err);
            }
        });
    }

    
}