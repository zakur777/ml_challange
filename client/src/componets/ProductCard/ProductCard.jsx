import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Image from 'react-image-resizer';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { objectOf } from 'prop-types';
import './ProductCard.css'

function ProductCard(props) {
    //        <img alt="Card" src={image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    

    const style = {
        image: {
          background: '#fefefe',
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5px"
        },
      };

    const header = (image) => {
    return (

        <Image
          alt="Card"
          src={ image }
          width={ 150 }
          height={ 150 }
          style={style.image}
        />
        )
    }

    const footer = (stock, condition) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ marginRight: '6px'}}>Stock</span>
              <Badge value={stock} severity={stock > 10 ? 'info' : 'danger'} className="p-mr-2"></Badge>
            </div>
            <div>
              <Tag className="p-mr-2" severity={condition == 'new' ? 'success' : condition == 'used' ? 'warning' : 'danger'} value={condition}></Tag>
            </div>
        </div>
      )
    }
    ;
    
    
    return (
            //{/* substring(0,45) */}
            /**   new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)    */

        <Card  
        
          title={props.title.substring(0,58)}  
          style={{ width: '15rem', marginRight: '5rem', marginBottom: '2em', borderTop: '1px solid #EAE8E8' }} 
          footer={footer(props.available_quantity, props.condition)} header={header(props.thumbnail)}>
          <i className="pi pi-dollar"><span style={{ fontSize: '1rem'}}>{props.price.toLocaleString('es-AR')} </span><span>{props.currency_id}</span></i>
            
        </Card>          
        
    )
}

export default ProductCard
