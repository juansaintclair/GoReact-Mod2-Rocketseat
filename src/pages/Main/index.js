import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";
import api from "../../services/api";
import moment from "moment";

export default class Main extends Component {
    state = {
        loading: false,
        repositoryError: false,
        repositoryInput: "",
        repositories: []
    };

    handleAddRepository = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        try {
            const { data: repository } = await api.get(
                `/repos/${this.state.repositoryInput}`
            );

            repository.lastCommit = moment(repository.pushed_at)
                .locale("pt-br")
                .fromNow();

            this.setState({
                repositoryInput: "",
                repositories: [...this.state.repositories, repository],
                repositoryError: false
            });
        } catch (err) {
            this.setState({ repositoryError: true });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <Container>
                <img src={logo} alt="Git Compare" />

                <Form
                    withError={this.state.repositoryError}
                    onSubmit={this.handleAddRepository}
                >
                    <input
                        type="text"
                        placeholder="usuário/repositório"
                        value={this.state.repositoryInput}
                        onChange={e =>
                            this.setState({ repositoryInput: e.target.value })
                        }
                    />
                    <button
                        type="submit"
                        disabled={
                            !this.state.repositoryInput || this.state.loading
                        }
                    >
                        {this.state.loading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "Okay!"
                        )}
                    </button>
                </Form>

                <CompareList repositories={this.state.repositories} />
            </Container>
        );
    }
}
