import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
    padding: 1em;
    background:#3399ff;
    height: 400px;
    width:350px;
    margin:auto;
`;

const Title = styled.h1`
    font-size: 2em;
    text-align:center;
    color:black;
`;

const Style = styled.h3`
    color:#000;
    font-size:1em;
    text-decoration:none;
    display:inline-block;
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

const Button = styled.button`
    background:white;
    font-size:1em;
    margin:0.5em;
    padding:0.25em 1em;
    border:1px solid #000;
    border-radius:3px;
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
        };
    }

    handleValue = (key, e) => {
        let { user } = this.state;
        user[key] = e.target.value;

        this.setState({
            user,
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        // let { email, password } = this.state;
        this.setState({
            email: this.state.user.email,
            password: this.state.user.password,
        });
    }

    signIn = (e) => {
        axios({
            method: 'post',
            url: 'https://login-api-signup.herokuapp.com/user/login',
            data: {
                email: this.state.user.email,
                password: this.state.user.password
            },
            headers: { 'Content-Type': 'application/json' }
        })

            .then((res) => {
                this.props.history.push('/home')
            })
            .catch((err) => {
                console.log(err, 'error');
                alert(err.response.data.msg)
            })
    }

    render() {
        return (
            <div>
                <Wrapper onSubmit={this.onSubmit}>
                    <Title>
                        SIGN IN
              </Title>

                    <div>
                        <Input placeholder="Email"
                            type="email"
                            onChange={this.handleValue.bind(this, 'email')}
                            value={this.state.user.email}
                        />
                    </div>
                    <div>
                        <Input placeholder="Password"
                            type="password"
                            onChange={this.handleValue.bind(this, 'password')}
                            value={this.state.user.password}
                        />
                    </div>
                    <div>
                        <Link to="/products">
                            <Button type="submit" onSubmit={this.onSubmit} onClick={this.signIn} >
                                SIGN IN
                    </Button>
                        </Link>
                    </div>
                    <div>
                        <p>
                            <StyledLink>
                                <Link to="/forgotpassword">
                                    <Style>
                                        Forgot Password?
                            </Style>
                                </Link>
                            </StyledLink>
                        </p>
                    </div>
                    <div>
                        <p>Don't have an account?
                        <StyledLink>
                                <Link to="/signup">
                                    <Style>
                                        Create Account.
                                </Style>
                                </Link>
                            </StyledLink>
                        </p>
                    </div>

                </Wrapper>
            </div>
        );
    }
}

export default Login;
