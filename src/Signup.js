import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
    padding: 1em;
    background:#3399ff;
    height: 500px;
    width:350px;
    margin:auto;
`;

const Title = styled.h1`
    font-size: 2em;
    text-align:center;
    color:black;
`;

const Input = styled.input`
    padding:0.5em;
    margin:0.5em;
    color:#000;
    background:white;
    border:0.5px solid #000;
    border-radius:3px;
    width:320px;
    height:30px;
`;
const Style = styled.h3`
    color:#000;
    font-size:1em;
    text-decoration:none;
    display:inline-block;
`;
const NewLink = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
)
const StyledLink = styled(NewLink) `
    color:#000;
    font-weight:bold;
    font-size:1em;
    display:inline-block;
    height:5px;
`;

const Button = styled.button`
    background:white;
    font-size:1em;
    margin:0.5em;
    padding:0.25em 1em;
    border:1.5px solid #000;
    border-radius:3px;
`;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: ''
            },
        }
    }

    handleChange = (key, e) => {
        let { input } = this.state;
        input[key] = e.target.value;

        this.setState({
            input
        });
    }

    signUp = (e) => {
        axios({
            method: 'post',
            url: 'https://login-api-signup.herokuapp.com/user/signup',
            data: {
                first_name: this.state.input.first_name,
                last_name: this.state.input.last_name,
                email: this.state.input.email,
                password: this.state.input.password,
                confirm_password: this.state.input.confirm_password,
            },
            headers: { 'Content-Type': 'application/json' }
        })

            .then((res) => {
                this.props.history.push('/')
                console.log(res, 'response')
            })

            .catch((err) => {
                console.log(err, 'error');
                alert(err.response.data.msg)
            })
    }
    render() {
        return (
            <Wrapper>
                <Title>
                    SIGN UP
              </Title>
                <div>
                    <Input placeholder="First Name"
                        type="text"
                        onChange={this.handleChange.bind(this, 'first_name')}
                        value={this.state.input.first_name}
                    />
                </div>
                <div>
                    <Input placeholder="Last Name"
                        type="text"
                        onChange={this.handleChange.bind(this, 'last_name')}
                        value={this.state.input.last_name}
                    />
                </div>
                <div>
                    <Input placeholder="Email"
                        type="email"
                        value={this.state.input.email}
                        onChange={this.handleChange.bind(this, 'email')}
                    />
                </div>
                <div>
                    <Input placeholder="Password"
                        type="password"
                        value={this.state.input.password}
                        onChange={this.handleChange.bind(this, 'password')}
                    />
                </div>
                <div>
                    <Input placeholder="Confirm Password"
                        type="password"
                        value={this.state.input.confirm_password}
                        onChange={this.handleChange.bind(this, 'confirm_password')}
                    />
                </div>
                <div>
                    <Button onClick={this.signUp}>
                        SIGN UP
                    </Button>
                </div>
                <div>
                    <p>Already have an account?
                        <StyledLink>
                            <Link to="/">
                                <Style>
                                    Sign In.
                                </Style>
                            </Link>
                        </StyledLink>
                    </p>
                </div>
            </Wrapper>
        );
    }
}

export default Signup;