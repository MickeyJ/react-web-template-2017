import style from './product_selector.module.scss'
import React from 'react'
import PropTypes from 'prop-types'

const REGEXP_SEARCH_OPTION = '^';
const BRAND_FILTER_KEY = 'brand_name';
const SELECTED_FILTER_KEY = 'selected';

class ProductSelector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filters: {
        [BRAND_FILTER_KEY]: '',
        [SELECTED_FILTER_KEY]: false,
      }
    }
  }

  /**
   * Set Filter Key/Value
   * @param key   : String
   * @param value : *
   */
  setFilter(key, value){
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [key]: value
      }
    })
  }

  /**
   * Test(RegExp) Filter Value
   * @param key     : String
   * @param subject : Object
   * @returns {boolean}
   */
  testFilterValue(key, subject){
    const { filters } = this.state;
    const searchPattern = new RegExp(REGEXP_SEARCH_OPTION + filters[key], 'i');
    return searchPattern.test(subject[key])
  }

  /**
   * Run Data Through Filters
   * @param brandData : Array
   * @returns {Array}
   */
  processBrandData(brandData){
    const { filters } = this.state;
    let brandDataProcessed = brandData;

    if(filters[BRAND_FILTER_KEY]){
      brandDataProcessed = brandDataProcessed.filter(brand => {
        return this.testFilterValue(BRAND_FILTER_KEY, brand)
      })
    }

    return brandDataProcessed;
  }

  /**
   * Search Input
   * @returns {XML}
   */
  renderSearchInput(){
    const { filters } = this.state;
    return (
      <div className={style.search_brand} >
        <input
          type="text"
          placeholder="Search Brand Name"
          value={filters[BRAND_FILTER_KEY]}
          onChange={({ target: { value } }) =>
            this.setFilter(BRAND_FILTER_KEY, value)
          }
        />
        {
          filters[BRAND_FILTER_KEY]
            ? (
              <span onClick={() => this.setFilter(BRAND_FILTER_KEY, '')}>
                &times;
              </span>
            ) : ''
        }
      </div>
    )
  }

  /**
   * Selection Total
   * @returns {XML}
   */
  renderSelectionTotal(){
    const {
      selectionTotal,
      selectionLimit,
    } = this.props;

    const reachedLimitStyle = (
      +selectionTotal === +selectionLimit ? {
        color: 'FireBrick',
      } : {}
    );
    return(
      <div className={style.selection_total} style={reachedLimitStyle}>
        { selectionTotal ? `${selectionTotal}/${selectionLimit}` : '' }
      </div>
    )
  }

  /**
   * Brand List
   * @returns {Array<XML>}
   */
  renderBrands(brandData){
    return this.processBrandData(brandData).map((brand, idx) => {

      const {
        brand_name,
        products,
      } = brand;

      const brandProductQty = products.filter(({selected}) => selected).length;

      return (
        <div key={brand_name + idx} className={style.brand_container}>
          <header className={style.brand_header}>
            <div className={style.brand_name}>
              {brand_name}
            </div>
            <div className={style.brand_product_qty}>
              {brandProductQty ? brandProductQty : ''}
            </div>
          </header>
          <div>
            {this.renderBrandProducts(products || [])}
          </div>
        </div>
      )
    })
  }

  /**
   * Brand Product List
   * @returns {Array<XML>}
   */
  renderBrandProducts(productData){
    return productData.map((product, idx) => {

      const {
        product_id,
        product_name,
        selected,
      } = product;

      const selectStatusCheckStyle = (
        selected
          ? {
            background: '#F7CD57',
            border: 'none',
          } : {}
      );

      const selectStatusRowStyle = (
        selected
          ? {
            background: '#feffef',
          } : {}
      );

      return (
        <div
          key={product_name + idx}
          className={style.product_container}
          style={selectStatusRowStyle}
          onClick={() => this.props.onProductSelect(product_id)}
        >
          <div
            className={style.product_checkbox}
            style={selectStatusCheckStyle}
          >
            {selected ? <span>&#10003;</span> : <span>&nbsp;</span>}
          </div>
          <div className={style.product_name}>
            {product_name}
          </div>
        </div>
      )
    })
  }

  /**
   * Footer Content
   * @returns {XML | Array<XML>}
   */
  renderFooterContent(errorMessage){
    if(errorMessage){
      return (
        <div className={style.error_message}>
          <span>{errorMessage}</span>
        </div>
      )
    }
    return [
      <div key={style.clear_button} className={style.clear_button} onClick={this.props.onClear}>
        <span>Clear</span>
      </div>,
      <div key={style.done_button} className={style.done_button} onClick={this.props.onComplete}>
        <span>Done</span>
      </div>
    ]
  }

  render(){
    
    const {
      brandData,
      errorMessage,
    } = this.props;

    return(
      <div className={style.container}>
        <header className={style.header}>
          {this.renderSearchInput()}
          {this.renderSelectionTotal()}
        </header>
        <section className={style.scroll_container}>
          {this.renderBrands(brandData)}
        </section>
        <footer className={style.footer}>
          {this.renderFooterContent(errorMessage)}
        </footer>
      </div>
    )
  }
}

ProductSelector.propTypes = {
  brandData: PropTypes.array.isRequired,
  selectionTotal: PropTypes.number.isRequired,
  selectionLimit: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onProductSelect: PropTypes.func.isRequired,
};

ProductSelector.defaultProps = {
  brandData: [],
  errorMessage: (`
    Some error message that goes on 
    and on forever but doesn't actually 
    give any valid information. 
    This is a perfect example because 
    I'm not saying anything helpful.
  `)
};

export default ProductSelector
