import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TopBar from '../components/TopBar/';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 100,
    },
    media: {
        height: 140,
    },
});

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            allProducts: [],
        }
    }

    componentDidMount() {
        this.getAllProducts();
        this.getbyid(this.props.match.params.id);
    }

    getbyid(productId) {
        axios.delete('https://e-commerce-node.herokuapp.com/products/' + '5b16b8bbc9a67600204f56aa')
            .then(
                res => {
                    const product = res.data;
                    this.setState({ product });
                    console.log(res);
                }
            );
    }

    getAllProducts() {
        axios.get('https://e-commerce-node.herokuapp.com/products/')
            .then(
                res => {
                    // console.log(res.data.response.products)
                    const allProducts = res.data.response.products;
                    this.setState({ allProducts });
                    console.log(res);
                }
            );
    }

    render() {
        return (
            <div>
                <TopBar />
                <Link to="/put">
                    <Button size="small"
                        color="primary"
                    >
                        View Updated Products >>
                </Button>
                </Link>
                {
                    this.state.allProducts.map((product, key) => {
                        // console.log(product);
                        return (
                            <div className={styles.root}>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={4}>
                                        <Card className={styles.card}>
                                            <img src={product.productimage} height={300} width={300} />
                                            <CardContent>
                                                <Typography gutterBottom variant="headline" component="h2">
                                                    {product.name}
                                                </Typography>
                                                <Typography component="p">
                                                    {product.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    ${product.price}
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Add to Cart
                                                </Button>
                                                <Button size="small" color="primary">
                                                    In Stock:  {product.stock}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}

export default withStyles(styles)(Delete);