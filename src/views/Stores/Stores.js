import style from './stores.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import AuthHOC from '../../containers/AuthHOC'

import _ from 'lodash'

import {
  STORES,
} from './store_data'

import LDModal from '../../components/LDModal/LDModal'
import StoreSelector from '../../components/StoreSelector/StoreSelector'

class Stores extends React.Component{
  constructor(){
    super();
    this.state = {
      modalOpen: false,
      selectedStoreIndex: 0,
      selectedStores: {
        1: {
          store_id: 1,
          store_name: 'Pearl Street',
          store_code: 'PRL',
        },
        2: {
          store_id: 2,
          store_name: 'Ideal Market',
          store_code: 'IDL',
        },
      }
    }
  }

  get selectedStoresLength(){
    return _.size(this.state.selectedStores)
  }

  get selectedStoresFormatted(){
    return _
      .chain(this.state.selectedStores)
      .valuesIn()
      .orderBy(['store_name'], ['asc'])
      .value()
  }

  setModal(modalOpen){
    this.setState({ modalOpen })
  }

  setSelectedStores = (selectedStores) =>{
    this.setState({ selectedStores })
  };

  addStore = (store_id) => {

    const {
      selectedStores,
    } = this.state;

    const newStore = STORES.find((store) => store.store_id === store_id);

    const nextSelectedStores = {
      ...selectedStores,
      [store_id]: newStore,
    };

    this.setSelectedStores(nextSelectedStores)
  };

  removeStore = (store_id) => {
    const {
      selectedStores,
    } = this.state;

    const nextSelectedStores = _.omit(selectedStores, store_id);
    this.setSelectedStores(nextSelectedStores)
  };

  selectStore = (selectedStoreIndex) =>{
    this.setState({ selectedStoreIndex });
    setTimeout(() =>{
      this.setModal(false);
    }, 200);
  };

  updateProductSelection(selectedProducts){
    this.setState({ selectedProducts, });
  }

  render(){
    const {
      modalOpen,
      selectedStores,
      selectedStoreIndex,
    } = this.state;

    const selectedStore = this.selectedStoresFormatted[selectedStoreIndex];

    return (
      <div className={style.stores}>

        <h3>Store Data</h3>

        <br />

        <Link to="/">
          Home
        </Link>

        <br />
        <br />

        <button onClick={() => this.setModal(true)}>
          Select Stores
        </button>

        <div style={{ color: 'DodgerBlue' }}>
          {
            selectedStore && selectedStoreIndex > -1
              ? selectedStore.store_name
              : ''
          }
        </div>

        <LDModal
          title="Select Stores"
          open={modalOpen}
          onClose={() => this.setModal(false)}
        >
          <StoreSelector
            storeList={formatStoreList(STORES.filter(({store_id}) => !selectedStores[store_id]))}
            selectedStores={this.selectedStoresFormatted}
            selectedStoreIndex={selectedStoreIndex}
            onStoreAdd={this.addStore}
            onStoreRemove={this.removeStore}
            onStoreSelect={this.selectStore}
          />

          <button
            onClick={() => this.setModal(false)}
            style={{
              width: '100%',
              height: 44,
              border: 'none',
              borderRadius: 0,
              background: 'RoyalBlue',
              fontSize: 20,
              color: 'white'
            }}
          >
            DONE
          </button>
        </LDModal>



      </div>
    )
  }
}

function formatStoreList(stores){
  return _
    .chain(stores)
    .map(o =>({
      value: o.store_id,
      label: `${o.store_name} - ${o.store_code}`,
    }))
    .orderBy(['label'], ['asc'])
    .value();
}

export default AuthHOC(Stores)
