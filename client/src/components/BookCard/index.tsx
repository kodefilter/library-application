import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Book } from '../../types';
import LendingsService from '../../services/lendings'
import Cookies from 'js-cookie';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


export type BookCardProps = {
    book: Book
}

export default function BookCard({book}: BookCardProps) {


  const handleBorrow = () => {



    const obj = {
      'userId' : Cookies.getJSON('current-user')._id,
      'bookId' : book._id
    }

    const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
    
    const options: RequestInit = {
      method: "PUT",
      body: blob,
      mode: "cors",
      cache: "default",
    }
    book.isAvailable ? LendingsService.borrow(options) : LendingsService.unBorrow(options)
  }
  

  const classes = useStyles();

  return (

    
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://www.basicbooks.com/wp-content/uploads/2019/09/9781541699359-1.jpg?fit=496%2C750"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {book.publisher}
        </Button>
        <Button size="small" color="primary" onClick={handleBorrow}>{book.isAvailable ? 'Borrow' : 'Unborrow'}</Button>
      </CardActions>
    </Card>
    
  );
}
