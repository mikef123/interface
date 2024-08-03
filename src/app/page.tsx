import { Box, Button, Container, Typography } from '@mui/material'
import styles from './page.module.css'
interface House {
  name: string
  url: string
}

export default async function Home() {
  const res = await fetch('https://anapioficeandfire.com/api/houses')
  const houses: House[] = await res.json()
  return (
    <Box className={styles.titleContainer}>
      <Typography variant="h1" className={styles.title}>
        WELCOME TO ICE AND FIRE APP
      </Typography>
      <Container maxWidth="sm" className={styles.buttonContainer}>
        <Typography variant="body1" align="center">
          <Button href={`/house`} className={styles.button}>
            Go to Houses
          </Button>
        </Typography>
      </Container>
    </Box>
  )
}
