import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { Link, withRouter } from 'react-router-dom';

import { cartToggle } from '../../actions/cart_actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            open: false,
            isCartOpen: false,
            user: [
                {
                    name: 'My Cart',
                    linkTo: '/user/cart',
                    public: false
                },
                {
                    name: 'My Account',
                    linkTo: '/user/dashboard',
                    public: false
                },
                {
                    name: 'Log in',
                    linkTo: '/register_login',
                    public: true
                },
                {
                    name: 'Log out',
                    linkTo: '/user/logout',
                    public: false
                }
            ]
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }

    defaultLink = (item, i) => (
        item.name === 'Log out' ?
            <li className="nav-item active" onClick={() => this.logoutHandler()}>
                <Link to={item.linkTo} key={i} className="nav-link">
                    {item.name}
                </Link>
            </li>
            :
            <li className="nav-item active">
                <Link to={item.linkTo} key={i} className="nav-link">
                    {item.name}
                </Link>
            </li>
    )


    cartLink = (item, i) => {
        const user = this.props.user.userData;
        return (

            <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between mx-lg-5" onClick={this.handleCart}>
                <span className="cart-info_icon mr-lg-3">
                    <i className="fas fa-shopping-cart"></i>
                </span>
                <p className="mb-0 text-capitalize">
                    <span id="item-count">{user.cart ? user.cart.length : 0}</span>
                    items - $
                        <span className="item-total">
                        10.49
                        </span>
                </p>
            </div>
            // <div className="cart_link">
            //     <span>{user.cart ? user.cart.length : 0}</span>
            //     <Link to={item.linkTo} key={i}>
            //         {item.name}
            //     </Link>
            // </div>
        )
    }

    showLinks = (type) => {
        let list = [];
        if (this.props.user.userData) {

            type.forEach(element => {
                if (!this.props.user.userData.isAuth) {
                    if (element.public) {
                        list.push(element);
                    }
                } else {
                    if (element.name !== 'Log in') {
                        list.push(element);
                    }
                }
            });
        }
        return list.map((item, i) => {
            if (item.name !== 'My Cart') {
                return this.defaultLink(item, i);
            }
        })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleCart = () => {
        this.props.dispatch(cartToggle(!this.props.cart.isCartOpen));
    }
    render() {
        const show = (this.state.menu) ? "show" : "";
        return (
            <header>
                <nav className="navbar navbar-expand-lg px-4">
                    <a href="/" className="navbar-brand">
                        <img src="/images/logo.svg" alt="main icon" />
                    </a>
                    <button type="button" className="navbar-toggler" onClick={this.toggleMenu}>
                        <span className="toggler-icon">
                            <i className="fas fa-bars"></i>
                        </span>
                    </button>
                    <div className={"collapse navbar-collapse " + show} >
                        <ul className="navbar-nav text-capitalize mx-auto">
                            <li className="nav-item active">
                                <a href="/" className="nav-link">home</a>
                            </li>
                            <li className="nav-item active">
                                <Link to='/services' className="nav-link">services</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/store' className="nav-link">store</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/about' className="nav-link">about</Link>
                            </li>
                            {this.showLinks(this.state.user)}

                        </ul>
                        <div className="nav-info-items d-none d-lg-flex">
                            {/* 1st info */}
                            <div className="nav-info align-items-center d-flex justify-content-between mx-lg-5">
                                <span className="info-icon mx-lg-3">
                                    <i className="fas fa-phone"></i>
                                </span>
                                <p className="mb-0">+ 123 456 789</p>
                            </div>
                            {/* 2nd info */}
                            {
                                this.props.user.userData ?

                                    <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between mx-lg-5" onClick={this.handleCart}>
                                        <span className="cart-info_icon mr-lg-3">
                                            <i className="fas fa-shopping-cart"></i>
                                        </span>
                                        <p className="mb-0 text-capitalize">
                                            <span id="item-count">{this.props.user.cart ? this.props.user.cart.length : 0} </span>
                                            items - $
                                            <span className="item-total">
                                                10.49
                                            </span>
                                        </p>
                                    </div>

                                    : null
                            }

                        </div>
                    </div>
                </nav>
                {/* end of navbar */}
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Header));