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
        height: 150,
        width: 100,
        // maxWidth: 345,
    },
    media: {
        height: 140,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },

});

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            allProducts: [],
            spacing: '16',
        }
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get('https://e-commerce-node.herokuapp.com/products')
            .then(
                res => {
                    console.log(res.data.response.products)
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
                <Link to="/post">
                    <Button size="small"
                        color="primary"
                    >
                        New Arrivals >>
                </Button>
                </Link>
                <Grid container className={styles.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={styles.demo} justify="center">
                            {[0, 1, 2].map(value => (
                                <Grid key={value} item>
                                    {
                                        this.state.allProducts.map((allProducts, key) => {
                                            return (

                                                <div className={styles.root}>
                                                    <Card className={styles.card}>
                                                        <img src={allProducts.productimage} height={300} width={300} />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="headline" component="h2">
                                                                {allProducts.name}
                                                            </Typography>
                                                            <Typography component="p">
                                                                {allProducts.description}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" color="primary">
                                                                ${allProducts.price}
                                                            </Button>
                                                            <Button size="small" color="primary">
                                                                Add to Cart
                                                            </Button>
                                                            <Button size="small" color="primary">
                                                                In Stock:  {allProducts.stock}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                    }
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )

    }
}

export default withStyles(styles)(Products);