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
            //also update the related index btn
            this._activeIndexBtn = this._indices_arr[this._activeIndex];
            //set the visual state to active for the btn
            this._activeIndexBtn.addClass('active');
        }
    }

    get activeIndex () {
        return this._activeIndex;
    }

    draw () {
        let paginator = this,
            container = $('#'+this._conatiner_id),
            index_container = $('<div>').addClass(this._cssContainerClassName),
            index;
    
        for (let i = 1; i <= this._indices; i++) {
            index = $('<span>').addClass(this._cssIndicesClassName).text(i);
            //store the indices element
            this._indices_arr.push(index);
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

        container.append(index_container);
    }

}