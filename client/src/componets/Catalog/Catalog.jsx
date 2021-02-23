import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import ReactPaginate from 'react-paginate'
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import './Catalog.css'

function Catalog({ products, fetching, error }) {

    const [pageNumber, setPagenumber] = useState(0);
    const productsPerPage = 30;
    const pagesVisited = pageNumber * productsPerPage;

    const displayProducts = products && products
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map(element => 
            <ProductCard id = { element.id }
                        title = { element.title }
                        price = { element.price }
                        currency_id = { element.currency_id }
                        available_quantity = { element.available_quantity }
                        thumbnail = { element.thumbnail }
                        condition = { element.condition }
                    />
        )


    const pageCount = Math.ceil(products.length / productsPerPage);

    const changePage = ({selected}) => {
        setPagenumber(selected)
    }

    return (
        <>
        <div className="p-grid p-m-3 p-justify-center">
        { fetching ? <ProgressSpinner /> : error ? <Message severity="error" text={error} /> : <div className="p-grid p-m-3 p-justify-center"> </div> }
        
        <div className="p-grid p-m-3 p-justify-center">
            {/* <ProgressSpinner /> */}
            {/* <Message severity="error" text="Message Content" /> */}
            {displayProducts}
            

        
            
        </div>
        </div>
        <div className="p-grid p-m-3 p-justify-center">

            <ReactPaginate 
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={ pageCount }
            onPageChange={ changePage }
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
        />
        </div>
        
        </>
    )
}

function mapState(state) {
    return {
        products: state.products.array,
        fetching: state.products.fetching,
        error : state.products.error
    }

}

export default connect(mapState)(Catalog)
