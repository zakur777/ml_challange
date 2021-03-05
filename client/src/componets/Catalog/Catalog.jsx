import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import ReactPaginate from 'react-paginate'
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import './Catalog.css'

function Catalog({ products, fetching, error, filtering }) {

    const [pageNumber, setPagenumber] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const productsPerPage = 30;
    const pagesVisited = pageNumber * productsPerPage;

    const sortOptions = [
        {label: 'Select', code: 0 },
        {label: 'Price High to Low', code: 1 },
        {label: 'Price Low to High', code: 2 },
    ];

    const displayProducts = filtering && filtering
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map(element => 
            <ProductCard 
                id = { element.id }
                title = { element.title }
                price = { element.price }
                currency_id = { element.currency_id }
                available_quantity = { element.available_quantity }
                thumbnail = { element.thumbnail }
                condition = { element.condition }
                key = { element.id }
            />
        )


    const pageCount = Math.ceil(products.length / productsPerPage);

    const changePage = ({selected}) => {
        setPagenumber(selected)
        window.scrollTo(0, 0)
    }

    const onPriceChange = (e) => {
        setSelectedPrice(e.value);
    }

    return (
        <>
        <div className="p-d-flex p-flex-column">

            { fetching ? <ProgressSpinner /> : error ? <Message severity="error" text={error} /> : <div className="p-grid p-m-3 p-justify-center">  
            
                <div className="p-grid p-m-3 p-justify-center">
                   
                    {displayProducts}
                    
                </div>
                {
                filtering.length > 0 ? 
                <div className="p-grid p-m-3 p-justify-center">

                    <ReactPaginate 
                        previousLabel={'Previous'}
                        pageCount={ pageCount }
                        onPageChange={ changePage }
                        nextLabel={'Next'}
                        containerClassName={'paginationBttns'}
                        previousLinkClassName={'previousBttn'}
                        nextLinkClassName={'nextBttn'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                    />

                    
                </div>
                : null

                }
            </div>
            }
        </div>
        </>
    )
}

function mapState(state) {
    return {
        products: state.products.array,
        fetching: state.products.fetching,
        error : state.products.error,
        filtering: state.products.filtering
    }

}

export default connect(mapState)(Catalog)
