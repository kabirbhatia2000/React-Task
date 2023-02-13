import React from 'react';
import moment from 'moment';

function Card({avatar,name,updateAt,stars,description,language,createdAt}) {

    return (
        <div className='user-card' style={{fontSize:'13px'}}>
            <img src={avatar} style={{width:'100%', height:120, objectFit:'cover', marginRight:10}} alt='user'/>
            <div style={{fontWeight:'bold', marginTop:10}}>{name}</div>
            <div>{description}</div>
            <div style={{marginTop:10}}>Language:  {language}</div>
            <div>Created at {moment(createdAt).format('ddd, DD MMM YY')}</div>
            <div>Updated at {moment(updateAt).format('ddd, DD MMM YY')}</div>
            <div style={{fontWeight:'bold'}}>{stars} Star</div>
        </div>
    );
}

export default Card;