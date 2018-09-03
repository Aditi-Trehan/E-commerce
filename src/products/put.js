import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/TopBar/'; 

const styles = theme=>({
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

class Put extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedProduct: [{
                "_id": "5b16ba31c9a67600204f56ae",
                "name": "Forever 21 Women Beige Bodysuit",
                "price": 1111,
                "stock": 22,
                "description": "This wonderfully designed hood tshirt is most comfortable to the body. Fit is very nice and every stich is take care of by the brand.",
                "category": "women",
                "productimage": "https://rukminim1.flixcart.com/image/704/704/j62hrww0/bodysuit-sleepsuit/h/3/y/1-s-8664509-forever-21-1-original-imaewmc8qsfhxq3f.jpeg?q=70"
            }, {
                "_id": "5b16b9fec9a67600204f56ad",
                "name": "The Dry State Printed Women Round Neck Maroon T-Shirt",
                "price": 700,
                "stock": 3,
                "description": "This wonderfully designed hood tshirt is most comfortable to the body. Fit is very nice and every stich is take care of by the brand.",
                "category": "women",
                "productimage": "https://rukminim1.flixcart.com/image/704/704/j7ksia80/t-shirt/v/u/y/s-2022-the-dry-state-original-imaexrqtvvgydngc.jpeg?q=70"
            }],
            allProducts: [],
            productId: {
                Id_one: '5b16ba31c9a67600204f56ae',
                Id_two: '5b16b9fec9a67600204f56ad'
            }

        }
    }


    componentDidMount() {
        this.putProduct();
    }

    putProduct() {
        let { updatedProduct } = this.state;
        let { productId, key } = this.state;
        productId[key] = this.state;

        axios.put('https://e-commerce-node.herokuapp.com/products' + { productId }, { updatedProduct })
            .then(
                res => {
                    const updatedProduct = res.data;
                    this.setState({ updatedProduct });
                    console.log(updatedProduct);
                }
            );
    }

    render() {
        return (
            <div>
                <TopBar/>
                {
                    this.state.updatedProduct.map((updatedProduct, key) => {
                        console.log(updatedProduct);
                        return (
                            <div className={styles.root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={4}>
                                        <Card className={styles.card}>
                                            <img src={updatedProduct.productimage} height={300} width={300} />
                                            <CardContent>
                                                <Typography gutterBottom variant="headline" component="h2">
                                                    {updatedProduct.name}
                                                </Typography>
                                                <Typography component="p">
                                                    {updatedProduct.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    ${updatedProduct.price}
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Add to Cart
                                </Button>
                                                <Button size="small" color="primary">
                                                    In Stock:  {updatedProduct.stock}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>)
                    })
                }

            </div>
        )
    }
}

export default withStyles(styles)(Put);