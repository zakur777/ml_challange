import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { getProductsAction } from '../../redux/productsDuck'

function SearchBar({ getProductsAction }) {
    
    const [keyword, setKeyword] = useState("");

    const start = <div className="p-inputgroup"><img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>
    <Dropdown   optionLabel="label" placeholder="Sort By Price" style={{ marginRight: '5px' }} />
    <Dropdown   optionLabel="label" placeholder="Sort By Condition" />
    </div>


    const end = <div className="p-inputgroup">
                    <InputText placeholder="Keyword" type="text" onChange={(e) => setKeyword(e.target.value)}/>
                    <Button icon="pi pi-search" className="p-button-warning" onClick={(e) => getProductsAction(keyword.trim()) }/>
                </div>;
    


    return (
        <div>
            <div className="card">
                <Menubar  start={start} end={end} />
            </div>
        </div>
    )
}


export default connect(null, { getProductsAction })(SearchBar)
