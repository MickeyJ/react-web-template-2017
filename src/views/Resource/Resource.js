import style from './resource.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import AuthHOC from '../../containers/AuthHOC'

import _ from 'lodash'

import {
  BRANDS,
  PRODUCTS,
} from './brand_data'

import LDModal from '../../components/LDModal/LDModal'
import ProductSelector from '../../components/ProductSelector/ProductSelector'

const selectionLimit = 5;

class Resource extends React.Component{
  constructor(){
    super();
    this.state = {
      modalOpen: true,
      selectedProducts: {
        10: { product_id: 10 },
        11: { product_id: 11 },
        15: { product_id: 15 },
        17: { product_id: 17 },
      },
    }
  }

  get selectionTotal(){
    return _.size(this.state.selectedProducts)
  }

  setModal(modalOpen){
    this.setState({ modalOpen })
  }

  handleSelectProduct = (product_id) =>{
    const nextSelectedProducts = this.toggleSelection(product_id);
    if(nextSelectedProducts){
      this.updateProductSelection(nextSelectedProducts);
    }
  };

  updateProductSelection(selectedProducts){
    this.setState({ selectedProducts, });
  }

  toggleSelection(product_id){
    const { selectedProducts } = this.state;
    const productIsAlreadySelected = !!selectedProducts[product_id];
    if(productIsAlreadySelected) {
      return _.omit(selectedProducts, product_id);
    } else {
      return {
        ...selectedProducts,
        [product_id]: PRODUCTS[product_id]
      }
    }
  }

  clearSelection(){
    this.setState({
      selectedProducts: {}
    })
  }

  render(){

    let errorMessage = '';

    // if(+this.selectionTotal === +selectionLimit){
    //   errorMessage = 'You have reached the product limit.'
    // }

    return (
      <div className={style.resource}>

        <h3>Super Special Secret Data</h3>

        <br />

        <Link to="/">
          Home
        </Link>

        <br />
        <br />

        <button onClick={() => this.setModal(true)}>
          Open Modal
        </button>

        <LDModal
          title="Choose Products"
          open={this.state.modalOpen}
          onClose={() => this.setModal(false)}
        >
          <ProductSelector
            brandData={formatProductSelections(BRANDS, PRODUCTS, this.state.selectedProducts)}
            selectionTotal={this.selectionTotal}
            selectionLimit={selectionLimit}
            errorMessage={errorMessage}
            onClear={() => this.clearSelection(false)}
            onComplete={() => this.setModal(false)}
            onProductSelect={this.handleSelectProduct}
          />
        </LDModal>

      </div>
    )
  }
}

function formatProductSelections(brands, products, selection){
  return _
    .valuesIn(brands)
    .map(b => ({
      ...b,
      products: _
        .valuesIn(products)
        .filter(p => p.brand_id === b.brand_id)
        .map(p => ({
          ...p,
          selected: !!selection[p.product_id],
        }))
    }))
}

export default AuthHOC(Resource)
