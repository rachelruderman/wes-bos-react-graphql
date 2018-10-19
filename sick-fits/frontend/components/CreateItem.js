import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    )
    id
  }
`;

export default class CreateItem extends Component {

  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  handleChange = (e) => {
    const {name, type, value} = e.target;
    const val = (type === 'number') ? parseFloat(value) : value;
    this.setState({[name]: val})
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, {loading, error}) => (
        <Form onSubmit={async (e) => {
          //Stop form from submitting
          e.preventDefault();
          //Call mutation
          const {data} = await createItem();
          //Bring to single item page
          Router.push({
            pathname: '/item',
            query: {id: data.createItem.id}
          })
        }}>
          <Error error={error}/>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor='title'>
              Title
              <input 
                onChange={this.handleChange}
                type='text' 
                id='title' 
                name='title' 
                value={this.state.title}
                placeholder='Title' 
                required/>
            </label>

            <label htmlFor='price'>
              Price
              <input 
                onChange={this.handleChange}
                type='number' 
                id='price' 
                name='price' 
                value={this.state.price}
                placeholder='Price' 
                required/>
            </label>

            <label htmlFor='description'>
              Description
              <textarea 
                onChange={this.handleChange}
                type='text' 
                id='description' 
                name='description' 
                value={this.state.description}
                placeholder='Enter a Description' 
                required/>
            </label>
            <button type='submit'>Submit</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
    )
  }
}
