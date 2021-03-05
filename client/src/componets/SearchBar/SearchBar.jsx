import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { getProductsAction, orderProductsByPriceAction, fiterProductsByCondition } from '../../redux/productsDuck';
import './SeacrhBar.css'

function SearchBar({ getProductsAction, orderProductsByPriceAction, fiterProductsByCondition }) {
    
    const [keyword, setKeyword] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);

    const sortOptions = [
        {label: 'Sort By Price', code: 0 },
        {label: 'Price High to Low', code: 1 },
        {label: 'Price Low to High', code: 2 },
    ];

    const filterOptions = [
        {label: 'Filter By Condition', code: 0 },
        {label: 'New', code: 1 },
        {label: 'Used', code: 2 },
        {label: 'Other', code: 3 },
    ];

    const onConditionChange = (e) => {
        setSelectedCondition(e.value);
        fiterProductsByCondition(e.value);
    }

    const onPriceChange = (e) => {
        setSelectedPrice(e.value);
        console.log('cod dropdown', e.value.code)
        orderProductsByPriceAction(e.value.code)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getProductsAction(keyword.trim());

    }
    const start = <div className="p-inputgroup"><img alt="logo" src="./images/logoHenry.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>
    <Dropdown   
        value={selectedPrice}
        onChange={onPriceChange}
        options={sortOptions}   
        optionLabel="label" 
        placeholder="Sort By Price" 
        style={{ marginRight: '5px' }}  
    />
    <Dropdown 
        value={selectedCondition}
        onChange={onConditionChange}
        options={filterOptions} 
        optionLabel="label" 
        placeholder="Filter By Condition"
    />
    </div>


    const end = <div className="p-inputgroup">
                    <form onSubmit={ onSubmit }>
                        <InputText placeholder="Keyword" type="text" onChange={(e) => setKeyword(e.target.value)}/>
                        <Button icon="pi pi-search" className="p-button-warning" />
                    </form>
                </div>;

    


    return (
        <div>
            <div className="card">
                <Menubar  start={start} end={end} />
            </div>
        </div>
    )
}


export default connect(null, { getProductsAction, orderProductsByPriceAction, fiterProductsByCondition })(SearchBar)
