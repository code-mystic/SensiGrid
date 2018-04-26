import CSVProcessor from './utilities/CSVProcessor.js';
import * as sensi_grid_config from './model/config.js';
import CustomEvent from './events/event.js';
import Table from './view/Table.js';

export default class SensiGrid {

    constructor (container_id, width, height, data) {
        let dc = sensi_grid_config.defaults,
            d_tc = dc.table_config,
            tableInstances = sensi_grid_config.instances,
            csv;

        //The refernce to the table
        this._table;

        this._caption = '';

        //column related properties
        this._columns = []

        this.container = dc.container_id = container_id ? container_id : dc.container_id;
        this.width = d_tc.width = width ? width : d_tc.width;
        this.height = d_tc.height = height ? height : d_tc.height;
        //create an instance level event object for all
        //custom events bound to this instnace's scope
        this.gridEvent = new CustomEvent();

        // if data is available initiate data loading
        if(data !== undefined) {
            this._setCSVProcessor(data);
        }
    }

    set caption(caption) {
        if(caption) {
            let d_tc = sensi_grid_config.defaults.table_config;
            this._caption = d_tc.caption = caption;
        }
        
    }

    get caption () {
        return this._caption;
    }

    set columns (clmn_arr) {
        let snsGrd = this;
        if(clmn_arr.length > 0) {
            clmn_arr.forEach(function(clmn, i) {
                snsGrd._columns.push(clmn);
            });
            sensi_grid_config.defaults.table_config.columns = this._columns;
        }
    }

    _setCSVProcessor(data) {
        let sgrid = this,
            dc = sensi_grid_config.defaults,
            d_tc = dc.table_config;

        this.csvProcessor = new CSVProcessor(data);
        //listen for the data parsing complete event
        this.csvProcessor.addEventListener('dataParsed', function(json){
            console.log("DATA LOADED AND PARSED : ");
            console.log(json);
            d_tc.data = json.data;
            sgrid.createTable(d_tc.data);
        });
        this.csvProcessor.addEventListener('dataParseError', function(err){
            console.log('Error in data loading...'+err)
        })
    }

    createTable(data) {
        let table = new Table();
        //set the data if available
        if (data) {
            table.data = data
        }
        table.draw();
        //update the reference 
        this._table = table;
    }

    setCSVData (csv) {
        //CSV is not defined do nothing
        if(!csv) {
            console.log("NO CSV data provided! Nothing to do");
            return;
        }
        //check if CSV processor exists or else instantiate
        if(!this.csvProcessor) {
            this._setCSVProcessor();
        }

        this.csvProcessor.loadData(csv);
        
    }

    /**
     * API to search data in the table. It returns data 
     * as an array
     * @param {String} query The search string 
     */
    searchData (query) {
        let result = this._table.searchData(query);
        return result;
    }

}

//loadCSV();