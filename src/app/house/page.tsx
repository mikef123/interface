import { Box, List, ListItem, Typography } from '@mui/material'
import styles from '../page.module.css'
interface House {
  name: string
  url: string
}

export default async function Home() {
  const res = await fetch('https://anapioficeandfire.com/api/houses')
  const houses: House[] = await res.json()
  return (
    <Box>
      <Typography variant="h1" className={styles.title}>
        Houses
      </Typography>
      <Typography variant="h2" className={styles.subtitle}>
        Please select the house to view it members:{' '}
      </Typography>
      <List className={styles.list}>
        {houses.map((house) => (
          <ListItem key={house.url} className={styles.listItem}>
            <a href={`/house/${house.url.split('/').pop()}`}>{house.name}</a>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
