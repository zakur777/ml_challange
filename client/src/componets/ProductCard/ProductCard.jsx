import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Image from 'react-image-resizer';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { objectOf } from 'prop-types';

function ProductCard(props) {
    //        <img alt="Card" src={image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    

    const style = {
        image: {
          background: '#fefefe',
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem"
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
            
                <Card title={props.title.substring(0,45)}  style={{ width: '20rem', marginRight: '5rem', marginBottom: '5rem' }} footer={footer(props.available_quantity, props.condition)} header={header(props.thumbnail)}>
                  <i className="pi pi-dollar"><span style={{ fontSize: '1.5rem'}}>{props.price} </span><span>{props.currency_id}</span></i>
                    
                </Card>          
        
    )
}

export default ProductCard
