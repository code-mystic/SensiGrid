import * as tableDefault from '../model/config.js';
import HTMLTable from './HTMLTable.js';
import * as config from '../model/config.js';
import Paginator from './Paginator.js';
/* The Table view class to render a grid/table */

export default class Table {

    constructor() {
        this._data = [];
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

    draw() {
        let tbl_inst = this,
        cd = config.defaults,
        d_tc = cd.table_config,
        tb, paginator;


        tbl_inst.headers = [];
        tbl_inst.rows = [];

        this._data.forEach(function(row, index) {
            //to_do: Here we are hardcoded assuming that the first row
            //will always be the header. All tables may not contain headers.
            if(index === 0) {
                //As header row is always a single row
                tbl_inst.headers = row;
            } else {
                tbl_inst.rows.push(row);
            }
        }, tbl_inst);
        //Now instantiate the type of table required.
        // HTML vs Canvas etc.
        if(config.defaults.render_type === 'HTML') {
            //Instantiate the HTML table instance
            tb = new HTMLTable();
            tb.container_id = cd.container_id;
            tb.width = d_tc.width;
            tb.height = d_tc.height;
            tb.caption = d_tc.caption;
            tb.headers = tbl_inst.headers;
            tb.rows = tbl_inst.rows;
            tb.css_class_name = d_tc.css_class_name;
            tb.max_num_rows = d_tc.max_num_rows;
            //Draw the table
            tb.draw();
            //If the number of rows exceed the max number of rows
            //We have to create the indexes
            if(tbl_inst.rows.length > tb.max_num_rows) {
                let num_indices = Math.ceil(tbl_inst.rows.length/tb.max_num_rows);
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
        }
        
    }
}