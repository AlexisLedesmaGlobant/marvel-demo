import { useState, useEffect } from "react";
import Head from 'next/head'
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const cardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '380px'
}

const Home = () => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    offset: 0,
    limit: 9
  });

  const [dataHeroes, setDataHeroes] = useState(null);

  useEffect(() => {
    getHeroes();
  }, [pageConfig]);

  useEffect(() => {
    console.log('dataHeroes', dataHeroes)
  }, [dataHeroes]);

  const getHeroes = async () => {
    const API_KEY = 'c270b72e0c383c739c6e2e5de068eaf0';
    const API_HASH = '61b04b3d66de1fbeaea0659d1d420cea';
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${pageConfig.limit}&offset=${pageConfig.offset}&ts=1000&apikey=${API_KEY}&hash=${API_HASH}`)
    const data = await response.json();
    setDataHeroes(data.data.results)
  }
  const handleChange = (event, value) => {
    setPageConfig({
      page: value,
      offset: (parseInt(value) - 1) * 10,
      limit: 9,
    })
  };

  return (
    <>
      <Head>
        <title>Marvel App</title>
        <meta name="description" content="Show some heroes" />
      </Head>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {dataHeroes && dataHeroes.map((hero, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card style={cardStyle}>
                  <CardMedia
                  sx={{objectPosition: "50%",}}
                    component="img"
                    height="180"
                    image={`${hero.thumbnail.path}/standard_amazing.jpg`}
                    alt={`${hero.name}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {hero.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hero.description ? hero.description : `No description founded`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid
          sx={{ mt: 5, mb:1 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <Pagination count={156} page={pageConfig.page} variant="outlined" shape="rounded" onChange={handleChange} />
        </Grid>
      </Container>
    </>
  )
}

export default Home;