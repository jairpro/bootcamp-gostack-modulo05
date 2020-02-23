/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton } from "./styles";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    // console.log(newRepo);

    const obj = this;
    api
      .get(`/repos/${newRepo}`)
      .then(response => {
        // console.log(response.data);

        const data = {
          name: response.data.full_name,
        };

        obj.setState({
          repositories: [...repositories, data],
          newRepo: "",
          loading: false,
        });
      })
      .catch(error => {
        obj.setState({ loading: false });
        console.log(error);
        alert(error);
      });
  };

  render() {
    const { newRepo, loading } = this.state;

    // Se em SubmitButton passar loading como bollean exibe:
    // "Warning: Received `false` for a non-boolean attribute `loading`"
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
