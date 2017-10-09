import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import style from './_store_selector.module.scss'

const StoreSelector = (props) => {

  const {
    // Data
    storeList,
    selectedStores,
    selectedStoreIndex,

    // Actions
    onStoreAdd,
    onStoreRemove,
    onStoreSelect,

    // Style
    minHeight,
    maxHeight
  } = props;

  const renderSelectedStores = () =>{
    return selectedStores.map((store, idx) => {

      let itemClass = style.selected_store_item;
      let handleSelectStore = () => onStoreSelect(idx);

      if(+selectedStoreIndex === idx){
        itemClass += ` ${style.selected_store_item_active}`;
        handleSelectStore = null;
      }

      console.log(store.store_name, idx);

      return (
        <div key={store.store_code} className={itemClass}>

          <div className={style.store_item_name} onClick={handleSelectStore}>
            <span>
              {store.store_name} - {store.store_code}
            </span>
          </div>

          <div className={style.store_item_icon}>
            <div
              className={style.delete_icon}
              onClick={() => selectedStores.length - 1 && onStoreRemove(store.store_id)}
            >
            </div>
          </div>

        </div>
      )
    })
  };

  return (
    <div className={style.container} style={{ minHeight, maxHeight }}>

      <div className={style.store_search_container}>
        <Select
          multi
          value=""
          placeholder="Search Here to Add a Store"
          options={storeList}
          onChange={selection => onStoreAdd(selection[0].value)}
          style={{ height: 'inherit' }}
        />
      </div>

      <div className={style.selected_stores_container}>
        {renderSelectedStores()}
      </div>

    </div>
  )
};

StoreSelector.propTypes = {
  // Data
  storeList          : PropTypes.array.isRequired,
  selectedStores     : PropTypes.array.isRequired,
  selectedStoreIndex : PropTypes.number.isRequired,

  // Actions
  onStoreAdd         : PropTypes.func.isRequired,
  onStoreRemove      : PropTypes.func.isRequired,
  onStoreSelect      : PropTypes.func.isRequired,

  // Style
  minHeight          : PropTypes.number.isRequired,
  maxHeight          : PropTypes.number.isRequired,
};

StoreSelector.defaultProps = {
  // Data
  storeList          : [],
  selectedStores     : [],
  selectedStoreIndex : -1,

  // Style
  minHeight          : 250,
  maxHeight          : 450,
};

export default StoreSelector
