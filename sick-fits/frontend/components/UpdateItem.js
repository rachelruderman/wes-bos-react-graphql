import React, { Component } from 'react'
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

export const SINGLE_ITEM_QUERY = gql`
  query UPDATE_ITEM_QUERY(
    $id: ID!
  ) {
    item(where: {id: $id}){
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ){
      id
    }
  }
`;

export default class UpdateItem extends Component {

  state = {}

  handleChange = (e) => {
    const {name, type, value} = e.target;
    const val = (type === 'number') ? parseFloat(value) : value;
    this.setState({[name]: val})
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("this props id", this.props.id)
    const response = await updateItemMutation({
      variables: {
        id: this.props.id,
      }
    });
    console.log('udpated', response)
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
      {({data, loading}) => {
        if (loading)    return <p>Loading...</p>
        if (!data.item) return <p>No Item Found for {this.props.id}</p>
        return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
      {(updateItem, {loading, error}) => (
        <Form onSubmit={(e) => this.updateItem(e, updateItem)}>
          <ErrorMessage error={error}/>
          <fieldset disabled={loading} aria-busy={loading}>

            <label htmlFor='title'>
              Title
              <input 
                onChange={this.handleChange}
                type='text' 
                id='title' 
                name='title' 
                defaultValue={data.item.title}
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
                defaultValue={data.item.price}
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
                defaultValue={data.item.description}
                placeholder='Enter a Description' 
                required/>
            </label>
            <button type='submit'>Sav{loading ? 'ing' : 'e'} Changes</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
              )
        }}
        </Query>
    )
  }
}
