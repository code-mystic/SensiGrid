export default {
    //this is to store multiple table instances under a
    //single sensi grid instance
    instances: [],
    // All defaults values for sensi-grid instances
    defaults: {
        render_type: 'HTML',
        container_id: '',
        index_container_id: '',
        table_config: {
            caption: '',
            width: 600,
            height: 400,
            data: [],
            columns: [],
            css_class_name: 'sensi-table',
            max_num_rows: 20
        },
        table_index_config: {
            css_class_name: 'sensi-table-index-container',
            indices: {
                css_class_name: 'sensi-table-indices'
            }
        }
    }
    
};
