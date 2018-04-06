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
        this._max_no_pages = 10;

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
            index_container = $('<div>').addClass(this._cssContainerClassName),
            prev_btn, next_btn, first_btn, last_btn,
            index;

        let drawIndices = function (start_index, num_indices) {
            for (let i = start_index; i <= num_indices; i++) {
                //if index already created only update the index nunmber
                //or else create.
                //Note: The length of indices_arr should never cross the 
                //max_no_pages.
                let prev_idex_btn = paginator._indices_arr[(i - start_index)];
                if(prev_idex_btn) {
                    index = prev_idex_btn;
                    index.text(i);
                } else {
                    index = $('<span>').addClass(paginator._cssIndicesClassName).text(i);
                    //store the indices element
                    paginator._indices_arr.push(index);
                }
                
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
        console.log(this._indices+' > '+this._max_no_pages);
        if(this._indices > this._max_no_pages) {
            //:to_do: This dependency on the exact order is not good.
            first_btn = $('<span>').addClass(this._cssIndicesClassName).text('First'); 
            prev_btn = $('<span>').addClass(this._cssIndicesClassName).text('Prev.');
            prev_btn.click(function(){
                if(paginator._activeIndex >= 1) {
                    paginator.activeIndex -= 1;
                }
            });
            index_container.append(first_btn);
            index_container.append(prev_btn);
            //draw indices
            drawIndices(1, this._max_no_pages);
            next_btn = $('<span>').addClass(this._cssIndicesClassName).text('Next');
            next_btn.click(function(){
                if(paginator._activeIndex <= paginator._indices) {
                    paginator.activeIndex += 1;
                }
            });
            last_btn = $('<span>').addClass(this._cssIndicesClassName).text('Last');
            index_container.append(next_btn);
            index_container.append(last_btn);
        } else {
            //draw all indices and no prev / next btn
            drawIndices(1, this._indices);
        }

        container.append(index_container);
        
    }

}