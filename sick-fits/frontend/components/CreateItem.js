import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

export default class CreateItem extends Component {
  render() {
    return (
      <Form>
        <h2>Sell an item.</h2>
      </Form>
    )
  }
}
