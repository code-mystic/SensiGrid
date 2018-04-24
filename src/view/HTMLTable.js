import $ from 'jquery';
import * as config from '../model/config.js';

export default class HTMLTable {
    
    constructor() {
        this._container_id = '';
        this._width;
        this._height;
        this._headers = [];
        this._rows = [];
        this._columns = [];
        this._caption = '';
        this._cssClassName = '';
        this._max_num_rows = '';

        //UI elements
        this._headerTable = '';
        this._tableElem = '';

        //UI Element storage
        this._table_row_arr = [];
    }

    set container_id (container_id) {
        if(container_id) {
            this._container_id = container_id;
        }
    }

    get container_id () {
        return this._container_id;
    }

    set headers (header_arr) {
        if(header_arr) {
            this._headers = header_arr;
        }
    }

    get headers () {
        return this._headers;
    }

    set rows (rows_arr) {
        if(rows_arr) {
            this._rows = rows_arr;
        }
    }

    get rows () {
        return this._rows;
    }

    set columns (clmns_arr) {
        if(clmns_arr) {
            this._columns = clmns_arr;
        }
    }

    get columns () {
        return this._columns;
    }

    set width (width) {
        if(width) {
            this._width = width;
        }
    }

    get width () {
        return this._width;
    }

    set height (height) {
        if(height) {
            this._height = height;
        }
    }

    get height () {
        return this._height;
    }

    set caption(caption) {
        if(caption) {
            this._caption = caption;
        }
    }

    get caption() {
        return this._caption;
    }

    set css_class_name(className) {
        if(className) {
            this._cssClassName = className
        }
    }

    get css_class_name() {
        return this._cssClassName;
    }

    set max_num_rows (num_rows) {
        if(num_rows) {
            this._max_num_rows = num_rows;
        }
    }

    get max_num_rows () {
        return this._max_num_rows;
    }

    setCellStyle (cell, index) {
       
        let column = this._columns[index],
            width = column && column.width;

        if(!isNaN(width)) {
            $(cell).css('width', width);
        }
    }

    drawCaption (caption, table_to_append) {
        let table_caption_elem;
        if(caption) {
            table_caption_elem = $('<h3>').text(caption);
            table_to_append.append(table_caption_elem);
        }
    }

    drawHeaders (headers, isFiltering, container_to_append) {
        let headerTable = this._headerTable = $('<table>').attr('display', 'table'),
            thead_elem,
            tr_elem;

        if(headers) {
            thead_elem = $('<thead>');
            tr_elem = $('<tr>');
            headers.forEach(function(header, index) {
                let tb_header = $('<th>').text(header);
                //set column specific style
                this.setCellStyle(tb_header, index);
                tr_elem.append(tb_header);
            }, this);
            //Append the row to header
            thead_elem.append(tr_elem)
            //Append the header row to table
            headerTable.append(thead_elem);
        }

        //append the header table to the container
        container_to_append.append(headerTable);
    }

    darwTableBody (rows, container_to_append) {
        let table_elem = this._tableElem = $('<table>'),
        row_count;

        //Set width, height and style of the table
        table_elem.addClass(this._cssClassName);
        table_elem.css({
            'table-layout': 'fixed',
            'display': 'table'
        });

        row_count = (rows.length > this._max_num_rows) ?
                        this._max_num_rows : rows.length;

        this.drawRows(this._rows,0,row_count);

        //Append the table to the container elem
        container_to_append.append(table_elem);
    }

    draw () {
        let table_container_elem = $('<div>').attr('id', 'sensi-grid'),
            caption_container_elem = $('<div>').attr('id', 'sensi-grid-caption'),
            header_container_elem = $('<div>').attr('id', 'sensi-grid-header'),
            body_container_elem = $('<div>').attr('id', 'sensi-grid-body');
        
        //Add Caption if available
        this.drawCaption(this._caption, caption_container_elem);
        //Add headers if avaialble
        this.drawHeaders(this._headers, this._isFilter, header_container_elem);
        //Add the rows or the main table rows
        this.darwTableBody(this._rows, body_container_elem);
        
        //append the caption container
        table_container_elem.append(caption_container_elem);
        //set style of the header container
       /* header_container_elem.css({
            'overflow-x': 'hidden',
            'overflow-y': 'scroll' 
        });*/
        //append the header conatiner
        table_container_elem.append(header_container_elem);
        //set style of the body container
        /*body_container_elem.css({
            'overflow-x': 'auto',
            'overflow-y': 'scroll'
        });*/
        //append the body or main rows
        table_container_elem.append(body_container_elem);
        
        //Apply some global styles to the table container element
        table_container_elem.css({
            'position': 'relative',
            'overflow': 'hidden',
            'width': this._width,
            'height': this._height,
            'overflow-x': 'auto',
            'overflow-y': 'scroll'
        });
        //append the container to the provided dom elemnet
        $('#'+this._container_id).append(table_container_elem);
    }

    /*
     * Method to draw rows from a specifi index to a specific 
     * number of rows.
    */
    drawRows (rows_arr, start_index, count) {
        let table_body = this._table_body = $('<tbody>'),
            end_index,
            table_row_elem;

        if(!start_index) {
            start_index = 0;
        } 
        end_index = start_index + count;

        if(end_index > rows_arr.length) {
            end_index = rows_arr.length;
        }

        if(rows_arr && rows_arr.length > 0) {
            for (let i = start_index; i < end_index; i++) {
                let row = rows_arr[i];
                table_row_elem = $('<tr>');
                //Store for easy retrieval
                this._table_row_arr.push(table_row_elem);
                //Now create the row content
                row.forEach(function(text, i){
                    let row_td = $('<td>').text(text);
                    this.setCellStyle(row_td, i);
                    table_row_elem.append(row_td);
                }, this);
                table_body.append(table_row_elem);
            }
            this._tableElem.append(table_body);
        }

        
    }

    /*
     * Method to delete a certain number of rows
     * Note: This will always work on the internal row storage
     *       didn't yet clear whether any other arr will be required
     *       as it should always clear the existing rows
    */
    deleteRows (start_index, count) {
        let delRows;

        //If start index is not define we assume we have to delete 
        //from the beginning
        if(!start_index) {
            start_index = 0;
        }

        //If count is not defined we assume we have to delete everything
        if(!count) {
            count = this._table_row_arr.length;
        }
        
        delRows = this._table_row_arr.splice(start_index, count);

        delRows.forEach(function(row){
            $(row).remove();
        });

        delRows = [];
        this._table_body.remove();
    }

}