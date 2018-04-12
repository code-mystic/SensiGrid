import $ from 'jquery';
import CustomEvent from '../events/event.js';

export default class Paginator extends CustomEvent {

    constructor (indices, container_id) {
        super();

        if (indices) {
            this._indices = indices;
        }

        if(container_id) {
            this._conatiner_id = container_id;
        }

        //private configurations
        this._max_no_pages = 4;

        //CSS classes
        this._cssContainerClassName;
        this._cssIndicesClassName;
        this._activeIndex;
        this._activeIndexBtn;

        //element storage
        this._indices_arr = [];
    }

    set cssContainerClassName(className) {
        if (className) {
            this._cssContainerClassName = className;
        }
    }

    get cssContainerClassName() {
        return this._cssContainerClassName
    }

    set cssIndicesClassName (className) {
        if (className) {
            this._cssIndicesClassName = className;
        }
    }

    get cssIndicesClassName () {
        return this._cssIndicesClassName;
    }

    set activeIndex (index) {
        if(!isNaN(index)) {
            this._activeIndex = index;
            //if any button is already active set to deactive
            if (this._activeIndexBtn) {
                this._activeIndexBtn.removeClass('active');
            }
            //also update the related index btn
            this._activeIndexBtn = this._indices_arr[this._activeIndex];
            //set the visual state to active for the btn
            this._activeIndexBtn.addClass('active');
            //Simulate the click event of the button.
            //to_do:It currently fires `index-clicked` event twice for the first button
            //Need to check.
            this._activeIndexBtn.click();
        }
    }

    get activeIndex () {
        return this._activeIndex;
    }

    draw () {
        let paginator = this,
            container = $('#'+this._conatiner_id),
            navigation_container = $('<div>').addClass(this._cssContainerClassName),
            index_container = $('<span>'),
            prev_btn, next_btn, first_btn, last_btn,
            index,
            first_btn_index = 1, 
            last_btn_index = Math.min(this._indices, this._max_no_pages);

        let deleteIndices = function (){
            paginator._indices_arr.forEach(function(index_btn){
                index_btn.remove();
            });
        }

        let drawIndices = function (start_index, num_indices) {
            //:to-do: Could be a performance glitch. Lot of empty array traversing
            deleteIndices(); 
            for (let i = start_index; i <= num_indices; i++) {
                index = $('<span>').addClass(paginator._cssIndicesClassName).text(i);
                //store the indices element
                //paginator._indices_arr.push(index);
                paginator._indices_arr[i] = index;
                
                (function(btn_elem, index){
                    btn_elem.click(function(){
                        paginator.emit('index-clicked', i);
                        if (paginator._activeIndexBtn) {
                            paginator._activeIndexBtn.removeClass('active');
                        }
                        
                        btn_elem.addClass('active');
                        paginator._activeIndexBtn = btn_elem;
                    }); 
                    
                })(index, i)
                index_container.append(index);
            }
        }

        //if the number of required indices is greater than the 
        //max number of indices allowed. we need to add next and prev button
        //to scroll the pagination.
        if(this._indices > this._max_no_pages) {
           
            //Create static buttons
            first_btn = $('<span>').addClass(this._cssIndicesClassName).text('First'); 
            prev_btn = $('<span>').addClass(this._cssIndicesClassName).text('Prev.');
            next_btn = $('<span>').addClass(this._cssIndicesClassName).text('Next');
            last_btn = $('<span>').addClass(this._cssIndicesClassName).text('Last');


            prev_btn.click(function(){
                if(paginator._activeIndex >= 1) {
                    paginator._activeIndex -= 1;
                    //if we have to go to the prev set of buttons
                    if(paginator._activeIndex < first_btn_index) {
                        last_btn_index = first_btn_index - 1;
                        first_btn_index = first_btn_index - paginator._max_no_pages;
                        if(first_btn_index < 1) {
                            //first set of indices
                            first_btn_index = 1;
                            last_btn_index = paginator._max_no_pages;
                            paginator._activeIndex = last_btn_index;
                        }
                        drawIndices(first_btn_index, last_btn_index);
                    }
                    paginator.activeIndex = paginator._activeIndex;
                }
            });
            
            next_btn.click(function(){
                if(paginator._activeIndex <= paginator._indices) {
                    paginator._activeIndex += 1;
                    //if we have to go the next set of buttons
                    if(paginator._activeIndex > last_btn_index) {
                        first_btn_index = last_btn_index + 1;
                        last_btn_index = last_btn_index + paginator._max_no_pages;
                        if (last_btn_index > paginator._indices) {
                            //end of indices
                            paginator._activeIndex = paginator._indices;
                            last_btn_index = paginator._indices;
                            first_btn_index = last_btn_index - paginator._max_no_pages;
                            //set next and last button to inactive
                            //@to-do:
                        }
                        drawIndices(first_btn_index, last_btn_index);
                    }
                    paginator.activeIndex = paginator._activeIndex;
                }
            });

            first_btn.click(function(){
                paginator._activeIndex = 1;
                first_btn_index = paginator._activeIndex;
                last_btn_index = paginator._max_no_pages;
                //draw last set of indices
                drawIndices(first_btn_index, last_btn_index);
                //set the last indices set active
                paginator.activeIndex = paginator._activeIndex;
            });

            last_btn.click(function() {
                paginator._activeIndex = paginator._indices;
                last_btn_index = paginator._indices;
                first_btn_index = last_btn_index - paginator._max_no_pages;
                //draw last set of indices
                drawIndices(first_btn_index, last_btn_index);
                //set the last indices set active
                paginator.activeIndex = paginator._activeIndex;
            });
            
            
        }

        //create the first set of index buttons
        drawIndices(first_btn_index, last_btn_index);

        //Append all the buttons
        navigation_container.append(first_btn);
        navigation_container.append(prev_btn);
        navigation_container.append(index_container);
        navigation_container.append(next_btn);
        navigation_container.append(last_btn);
        

        container.append(navigation_container);
        
    }

}