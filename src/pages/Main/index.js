import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";
import api from "../../services/api";
import moment from "moment";

const filterRepository = (repositories, repositoryInput) =>
    repositories.filter(
        repository =>
            repository.full_name.toLowerCase() === repositoryInput.toLowerCase()
    );

export default class Main extends Component {
    state = {
        loading: false,
        repositoryError: false,
        repositoryInput: "",
        repositories: []
    };

    componentDidMount() {
        if (!localStorage.repositories) {
            localStorage.repositories = JSON.stringify([]);
        }

        this.setState({ repositories: JSON.parse(localStorage.repositories) });
    }

    handleRemoveRepository = id => {
        const { repositories } = this.state;

        const removedRepository = repositories.filter(
            repository => repository.id !== id
        );

        localStorage.repositories = JSON.stringify(removedRepository);

        this.setState({ repositories: removedRepository });
    };

    handleAddRepository = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { repositoryInput, repositories } = this.state;

        try {
            if (filterRepository(repositories, repositoryInput).length) {
                this.setState({
                    repositoryError: true,
                    loading: false
                });
            } else {
                const { data: repository } = await api.get(
                    `/repos/${this.state.repositoryInput}`
                );

                localStorage.repositories = JSON.stringify([
                    ...repositories,
                    repository
                ]);

                repository.lastCommit = moment(repository.pushed_at).fromNow();

                this.setState({
                    repositoryInput: "",
                    repositories: [...this.state.repositories, repository],
                    repositoryError: false
                });

                localStorage.setItem(this.state.repositories);
            }
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

                <CompareList
                    repositories={this.state.repositories}
                    onRemove={this.handleRemoveRepository}
                />
            </Container>
        );
    }
}
