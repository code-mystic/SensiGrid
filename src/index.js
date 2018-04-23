import CSVProcessor from './utilities/CSVProcessor.js';
import * as sensi_grid_config from './model/config.js';
import CustomEvent from './events/event.js';
import Table from './view/Table.js';

export default class SensiGrid {

    constructor (container_id, width, height, data) {
        let sgrid = this,
            dc = sensi_grid_config.defaults,
            d_tc = dc.table_config,
            tableInstances = sensi_grid_config.instances,
            csv;

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
            csv = new CSVProcessor(data);
            //listen for the data parsing complete event
            csv.addEventListener('dataParsed', function(json){
                console.log("DATA LOADED AND PARSED : ");
                console.log(json);
                d_tc.data = json.data;
                sgrid.createTable(d_tc.data);
            });
            csv.addEventListener('dataParseError', function(err){
                console.log('Error in data loading...'+err)
            })
            
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

    createTable(data) {
        let table = new Table();
        //set the data if available
        if (data) {
            table.data = data
        }
        table.draw();
         
    }

}

//loadCSV();