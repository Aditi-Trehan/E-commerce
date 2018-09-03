import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/TopBar/';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProducts: [],
            allProducts: [],
            newProduct: [{
                name: "Warm Shirt Women",
                description: "Woolen Hoodie Women",
                price: 70.00,
                gender: "women",
                type: "shirt",
                stock: '6',
                img: "https://image.ibb.co/dVfORk/img4.jpg",
                inCart: false,
                category: "clothes"
            }]
        }
    }

    componentDidMount() {
        this.postProducts();
    }

    postProducts() {
        let { newProduct } = this.state;

        axios.post('https://e-commerce-node.herokuapp.com/products', { newProduct })
            .then(
                res => {
                    const newProducts = res.data;
                    this.setState({ newProducts });
                }
            );
        console.log(newProduct);
    }

    render() {
        return (
            <div>
                <TopBar />
                <Link to="/delete">
                    <Button size="small"
                        color="primary"
                    >
                        Now Available >>
                    </Button>
                </Link>
                {
                    this.state.newProduct.map((newProduct, key) => {
                        return (
                            <div className={styles.root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={4}>
                                        <Card className={styles.card}>
                                            <img src={newProduct.img} height={300} width={300} />
                                            <CardContent>
                                                <Typography gutterBottom variant="headline" component="h2">
                                                    {newProduct.name}
                                                </Typography>
                                                <Typography component="p">
                                                    {newProduct.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    ${newProduct.price}
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Add to Cart
                                                </Button>
                                                <Button size="small" color="primary">
                                                    In Stock:{newProduct.stock}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                }</div>
        )

    }
}

export default withStyles(styles)(Post);