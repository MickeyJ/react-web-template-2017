import style from './product_selector.module.scss'
import React from 'react'
import PropTypes from 'prop-types'
import filterListIcon from '../../assets/images/filter_list.png'

const REGEXP_SEARCH_OPTION = '^';
const BRAND_FILTER_KEY = 'brand_name';
const PRODUCT_FILTER_KEY = 'product_name';
const SELECTED_FILTER_KEY = 'selected';

class ProductSelector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filters: {
        [BRAND_FILTER_KEY]: '',
        [SELECTED_FILTER_KEY]: false,
      },
      selectInteractionStyle: {}
    };

    this.selectColorTimeout = setTimeout(() => {}, 0);
  }

  componentWillUnmount(){
    clearTimeout(this.selectColorTimeout)
  }

  get hasReachedLimit(){
    const {
      selectionTotal,
      selectionLimit,
    } = this.props;
    return +selectionTotal === +selectionLimit;
  }

  getSelectedProducts(products){
    return products.filter(({ selected }) => selected)
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
      },
    })
  }

  /**
   * Test(RegExp) Filter Value
   * @param key     : String
   * @param subject : Object
   * @param subjectKey : String | null
   * @param searchOption : String | null
   * @returns {boolean}
   */
  testFilterValue(key, subject, subjectKey=null, searchOption=REGEXP_SEARCH_OPTION){
    const { filters } = this.state;
    const searchPattern = new RegExp(searchOption + filters[key], 'i');
    return searchPattern.test(subject[subjectKey || key])
  }


  /**
   * Run Data Through Filters
   * @param brandData : Array
   * @returns {Array}
   */
  processBrandData(brandData){
    const { filters } = this.state;
    let brandDataProcessed = brandData;

    if(filters[SELECTED_FILTER_KEY]){
      brandDataProcessed = brandDataProcessed.filter(
        ({ products }) => this.getSelectedProducts(products).length
      ).map(brand => ({
        ...brand,
        products: this.getSelectedProducts(brand.products)
      }))
    }

    if(filters[BRAND_FILTER_KEY]){
      brandDataProcessed = brandDataProcessed.filter(
        brand => {

          const brandNameMatch = this.testFilterValue(
            BRAND_FILTER_KEY,
            brand,
          );

          const productNameMatch = brand.products.filter(product => {
            return this.testFilterValue(
              BRAND_FILTER_KEY,
              product,
              PRODUCT_FILTER_KEY,
              ''
            );
          }).length;

          return brandNameMatch || productNameMatch
        }
      )
    }

    return brandDataProcessed;
  }


  /**
   * Set Interaction Style
   * @param product_id : Number
   * @param color      : String
   */
  setSelectInteractionStyle(product_id, color){
    this.setState({
      selectInteractionStyle: {
        [product_id]: { background: color }
      }
    });
    this.selectColorTimeout = setTimeout(() => {
      this.setState({
        selectInteractionStyle: {}
      });
    }, 200)
  }

  toggleSelectedFilter = () => {
    const {
      [SELECTED_FILTER_KEY]: shouldFilter,
    } = this.state.filters;
    this.setFilter(SELECTED_FILTER_KEY, !shouldFilter)
  };

  /**
   * Handle Product Selection
   * @param product_id : Number
   * @param isSelected : Boolean
   */
  handleSelectProduct(product_id, isSelected){
    const { onProductSelect } = this.props;

    if(isSelected){
      onProductSelect(product_id);
      return;
    }
    if(this.hasReachedLimit){
      this.setSelectInteractionStyle(product_id, 'rgba(224, 43, 43, 0.35)');
      return;
    }
    onProductSelect(product_id);
    this.setSelectInteractionStyle(product_id, 'rgba(132, 224, 144, 0.47)');
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
          placeholder="Search Brand/Product Name"
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

  renderSelectionFilter(){

    const optionOnStyle = (
      this.state.filters[SELECTED_FILTER_KEY]
        ? { background: '#feffef' }
        : {}
    );

    return (
      <div className={style.selected_filter} style={optionOnStyle} onClick={this.toggleSelectedFilter}>
        <img src={filterListIcon} alt="I" />
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
      this.hasReachedLimit ? {
        color: 'FireBrick',
      } : {}
    );

    const selectionTotalText = (
      this.hasReachedLimit
        ? `${selectionTotal}/${selectionLimit}`
        : selectionTotal
    );

    return(
      <div className={style.selection_total} style={reachedLimitStyle}>
        { selectionTotal ? selectionTotalText : '' }
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

      const brandProductQty = this.getSelectedProducts(products).length;

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
    const {
      selectInteractionStyle
    } = this.state;
    return productData.map((product, idx) => {

      const {
        product_id,
        product_name,
        selected,
      } = product;

      const selectStatusCheckStyle =  (
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
          style={selectInteractionStyle[product_id] || selectStatusRowStyle}
          onClick={() => this.handleSelectProduct(product_id, selected)}
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
          {this.renderSelectionFilter()}
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
