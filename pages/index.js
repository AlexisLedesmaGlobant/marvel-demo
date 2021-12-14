import { useState, useEffect } from "react";
import Head from 'next/head'
import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import styles from '../styles/Home.module.css'

const Home = () => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    offset: 0,
    limit: 10
  });

  const [dataHeroes, setDataHeroes] = useState(null);

  const [expanded, setExpanded] = useState(false);

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
      limit: 10,
    })
  };

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title>Marvel App</title>
        <meta name="description" content="Show some heroes" />
      </Head>
      <Container maxWidth="sm">
        {dataHeroes && dataHeroes.map((hero, index) =>
          <Accordion key={hero.id} expanded={expanded === `panel${index}`} onChange={handleExpanded(`panel${index}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{hero.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Card >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${hero.thumbnail.path}/portrait_xlarge.jpg`}
                  alt="green iguana"
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
            </AccordionDetails>
          </Accordion>
        )}
      </Container>
        <div className={styles.pagination}>
          <Pagination count={1559} page={pageConfig.page} variant="outlined" shape="rounded" onChange={handleChange} />
        </div>
    </>
  )
}

export default Home;