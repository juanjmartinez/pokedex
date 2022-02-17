import React, { useState, ChangeEvent } from 'react';
import { AppBar, Toolbar, CssBaseline, Typography, Paper, Container, Card, CardActionArea, CardContent, CardMedia, Grid, CircularProgress, Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { makeStyles } from '@mui/styles';
import { usePokemon } from '../hooks/usePokemon';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 250
  },
  div: {
    padding: 20, 
    display: 'flex', 
    alignItems: 'center'
  },
  input: {
    padding: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  div1: {
    margin: 'auto',
    marginRight: 'auto',
    // marginLeft: 450,
    display: 'flex', 
    alignItems: 'center',
    textAlign: 'center'
  },
  img: {
    height: 50, 
    marginLeft: 35, 
    marginRight: 'auto'
  },
  container: {
    marginTop: 100
  },
  container1: {
    alignItems: 'center',
    alignContent: 'center'  
  },
  card: {
    maxWidth: 300,
    height: 300,
    background: 'linear-gradient(45deg, #ffffff 10%, #A9CCE3 90%)'
  },
  card1: {
    maxWidth: 300,
    width: 220,
    height: 220,
    background: 'linear-gradient(45deg, #ffffff 10%, #A9CCE3 90%)'
  },
  card2: {
    maxWidth: 600,
    width: 600,
    height: 180,
    background: 'linear-gradient(45deg, #ffffff 10%, #A9CCE3 90%)'
  },
  cardModal: {
    maxWidth: 600,
    width: 600,
    height: 350,
    background: 'linear-gradient(45deg, #ffffff 10%, #A9CCE3 90%)'
  },
  cardmedia: {
    height: 200,
    width: 200,
    paddingTop: '81.25%',
    borderRadius: '50%',
    margin: 'auto',
    background: '#ffffff',
    alignItems: 'center'
  },
  cardmedia1: {
    height: 200,
    width: 200,
    paddingTop: '81.25%',
    margin: 'auto',
    alignItems: 'center'
  },
  cardmedia2: {
    height: 120,
    width: 120,
    paddingTop: '10.25%',
    margin: 'auto',
    alignItems: 'center'
  }

}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [experience, setExperience] = useState();
  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [name, setName] = useState();
  const [types, setTypes] = useState('');
  const [ability, setAbility] = useState('');
  const [games, setGames] = useState('');
  const [held, setHeld] = useState('');
  const [move, setMoves] = useState('');

  const handleOpen = (url: string) => {
      axios.get(url)
      .then(result => {
          getDetail(result.data);
      })

      setOpen(true);
  }



  const getDetail = (data: any) => {
      setExperience(data.base_experience);
      setImage(data.sprites.front_default);
      setImage1(data.sprites.back_default);
      setImage2(data.sprites.front_female);
      setImage3(data.sprites.back_female);
      setImage4(data.sprites.front_shiny);
      setName(data.name);
      // setTypes(data.types);

      let type = [];
      let abilities = [];
      let games = [];
      let held = [];
      let moves = [];
      type = data.types;
      abilities = data.abilities;
      games = data.game_indices;
      held = data.held_items;
      moves = data.moves;
      let typeName = '';
      let abilitiesName = '';
      let gamesName = '';
      let heldName = '';
      let movesName = '';

    for (let index = 0; index < type.length; index++) {
        typeName = typeName + ', ' + type[index].type.name;
    }
    setTypes(typeName);

    for (let index = 0; index < abilities.length; index++) {
        abilitiesName = abilitiesName + ', ' +  abilities[index].ability.name;        
    }

    for (let index = 0; index < games.length; index++) {
        gamesName = gamesName + ', ' +  games[index].version.name;        
    }

    for (let index = 0; index < held.length; index++) {
        heldName = heldName + ', '; // + held[index].name;
    }

    for (let index = 0; index < moves.length; index++) {
        movesName = movesName + ', ' + moves[index].move.name;
        
    }
      
      setAbility(abilitiesName);
      setGames(gamesName);
      setHeld(heldName);
      setMoves(movesName);
      setPokemonDetail(data);
  }

  const filterPokemons = (): Pokemon[] => {
    
    if(search.length === 0)
    return pokemons.slice(currentPage, currentPage + 20);

    const filtered = pokemons.filter(poke => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 20)
  }

  const nextPage = () => {
      if (pokemons.filter(poke => poke.name.includes(search)).length > currentPage + 20)
      setCurrentPage(currentPage + 20);
  }

  const prevPage = () => {
      if(currentPage > 0)
        setCurrentPage(currentPage - 20);

  }

  const onSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  return (
    <>
    <CssBaseline />
    <AppBar>
      <Toolbar>
        <Typography>PokeDex</Typography>
        <img src='https://cdn-icons-png.flaticon.com/512/362/362003.png' alt='Pokedex' className={classes.img}/>       
      </Toolbar>
    </AppBar>
    <Container maxWidth='lg' component={Paper} elevation={4} className={classes.container}>
    <br />
    <TextField className={classes.input} defaultValue="Small"  fullWidth value={search} onChange={onSearchChange} placeholder="Buscar"/>
    <br /><br />
      <Grid container spacing={2}>
          {filterPokemons().map(({id, name, pic, url}) => (
               <Grid key={id} item xs={6} sm={3}>
               <Card className={classes.card} raised={true}>
                 <CardActionArea onClick={() => handleOpen(url)}>
                   <CardContent>
                     <CardMedia 
                       image={pic}
                       className={classes.cardmedia}
                     />
                     <Typography align='center' variant='h6'>{name}</Typography>                     
                   </CardContent>
                 </CardActionArea>
               </Card>
             </Grid>
          ))}
          
      </Grid>
        <br /><br />
      {
          isLoading && <CircularProgress color="secondary" />
      }
              <br />
        <div className={classes.div1}>
        <Button variant="outlined" onClick={prevPage} startIcon={<ArrowBack />}>
                Anteriores
        </Button>
        &nbsp;
        <Button variant="contained" onClick={nextPage} endIcon={<ArrowForward />}>
                Siguientes
        </Button>
        </div>
        <br /><br />
    </Container>
    <Container>

    </Container>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Grid container spacing={2}>

          {pokemonDetail &&
          <Grid item xs={12} sm={4} md={6}>
               <Card className={classes.card2} raised={true}>
                 <CardActionArea >
                   <CardContent>
                     <Typography align='center' variant='h6'>{name}</Typography>
                     <img src={image}  alt=''/><img src={image1} alt=''/><img src={image2} alt=''/><img src={image3} alt=''/><img src={image4} alt=''/>                     
                    {/* <CardMedia 
                       image={image}
                       className={classes.cardmedia2}
                     />      */}
                           
                   </CardContent>
                 </CardActionArea>
               </Card>
             
               &nbsp;

             </Grid>
             }
            </Grid>
            <Grid container spacing={1}>

                {pokemonDetail &&
                <Grid item xs={12} sm={3} md={6}>
                    <Card className={classes.cardModal} raised={true}>
                    <CardActionArea >
                        <CardContent>
                        <p><b>Base Experience:</b> {experience}</p>
                        <p><b>Types: </b>
                        {types}                        
                        </p>
                        <p><b>Abilities: </b>
                        {ability}                        
                        </p>
                        <p><b>Games: </b>
                        {games}                        
                        </p>
                        <p><b>Held items: </b>
                        {held}                        
                        </p>
                        <p><b>Moves: </b>
                        {move}                        
                        </p>
                        
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
                }
                </Grid>

                
          </Box>
        </Fade>
      </Modal>
    </> 
  )
}
