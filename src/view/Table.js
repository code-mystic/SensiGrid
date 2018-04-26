import * as tableDefault from '../model/config.js';
import HTMLTable from './HTMLTable.js';
import * as config from '../model/config.js';
import Paginator from './Paginator.js';
/* The Table view class to render a grid/table */

export default class Table {

    constructor() {
        //this is the original data 
        this._data = [];
        this._headers = [];
        this._rows = [];
        this._htmlTable;
        this._activeTable;
    }

    get data () {
        return this._data;
    }

    set data (data) {
        //to-do: need to take measures against type object/array
        if (data) {
            this._data = data;
        }
    }

    searchData (query, data_arr) {
        let queries = query.split(':'),
            headerStr= queries[0].toLowerCase(),
            valueStr = queries[1].toLowerCase(),
            headerIndex,
            returnArr = [];

        //debugger;

        //lets find the index of the header
        for (let i = 0, len = this._headers.length; i < len; i++) {
            let header = this._headers[i].toLowerCase();
            if(headerStr === header.toLowerCase()) {
                headerIndex = i;
                break;
            }
        }
        /*this._headers.forEach(function(header, index){
            if(headerStr === header.toLowerCase()) {
                headerIndex = index;
                break;
            }
        });*/

        if(!isNaN(headerIndex)) {
            //now look for the rows which has the search value
            //in the specified index
            this._rows.forEach(function(row, index){
                let val = row[headerIndex];
                if(val) {
                    if(val.toLowerCase() === valueStr) {
                        //debugger;
                        returnArr.push(row);
                    }
                }
            });
        } else {
            //The header could not be found either there 
            //is a problem or we have to check all values 
            //of all rows.
        }

        

        return returnArr;


    }

    processData (data_arr) {
        let tbl_inst = this,
            data_obj = {
                headers: [],
                rows: []
            };

        data_arr.forEach(function(row, index) {
            //to_do: Here we are hardcoded assuming that the first row
            //will always be the header. All tables may not contain headers.
            if(index === 0) {
                //As header row is always a single row
                data_obj.headers = row;
            } else {
                data_obj.rows.push(row);
            }
        }, tbl_inst);

        return data_obj;
    }

    draw() {
        let tbl_inst = this,
        cd = config.defaults,
        d_tc = cd.table_config,
        tb, paginator,
        processsedData;

        processsedData = this.processData(this._data);
        this._headers = processsedData.headers;
        this._rows = processsedData.rows;
        //Now instantiate the type of table required.
        // HTML vs Canvas etc.
        if(config.defaults.render_type === 'HTML') {
            //Instantiate the HTML table instance
            tb = new HTMLTable();
            tb.container_id = cd.container_id;
            tb.width = d_tc.width;
            tb.height = d_tc.height;
            tb.caption = d_tc.caption;
            tb.headers = processsedData.headers;
            tb.rows = processsedData.rows;
            tb.columns = d_tc.columns;
            tb.css_class_name = d_tc.css_class_name;
            tb.max_num_rows = d_tc.max_num_rows;
            //Draw the table
            tb.draw();
            //If the number of rows exceed the max number of rows
            //We have to create the indexes
            if(processsedData.rows.length > tb.max_num_rows) {
                let num_indices = Math.ceil(processsedData.rows.length/tb.max_num_rows);
                //If specific index container defined then use that DOM element
                //Or append at the table conatiner DOM element
                let index_container = cd.index_container_id ? cd.index_container_id : cd.container_id;
                paginator = new Paginator(num_indices, index_container);
                paginator.cssContainerClassName = cd.table_index_config.css_class_name;
                paginator.cssIndicesClassName = cd.table_index_config.indices.css_class_name;
                paginator.addEventListener('index-clicked', function(index){
                    let st_indx = (index - 1) * tb.max_num_rows;
                    tb.deleteRows();
                    tb.drawRows(tb.rows, st_indx, tb.max_num_rows);
                });
                paginator.draw();
                //set the active state of first button
                paginator.activeIndex = 1;
            }

            this._activeTable = this._htmlTable = tb;
        }
        
    }
}