  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import styles from '../../page.module.css'

interface House {
  name: string
  currentLord: string
  swornMembers: string[]
}

export default async function HousePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const houseRes = await fetch(`https://anapioficeandfire.com/api/houses/${id}`)
  if (!houseRes.ok) {
    throw new Error(`Failed to fetch houses: ${houseRes.statusText}`)
  }
  const house: House = await houseRes.json()
  const membersRes = await Promise.all(
    house.swornMembers &&
      house.swornMembers.map((url: string) =>
        fetch(url).then((res) => res.json())
      )
  )

  const members = membersRes
  const noMembers = 'This house has no sworn members'
  return (
    <Box className={styles.titleContainer}>
      <Typography variant="h1" className={styles.title}>
        {house.name}
      </Typography>
      <Box className={styles.listContainer}>
        <Typography variant="h2" className={styles.subtitle}>
          SwornMembers:
        </Typography>
        <List className={styles.list}>
          {members &&
            members.map((member) => (
              <ListItem key={member.name} className={styles.listItem}>
                {`Full name: ${member.name}`}
                {' | '}
                {member.died && `(Died: ${member.died})`}
                {!member.died && `not dead`}
              </ListItem>
            ))}
          {members.length === 0 && <p>{noMembers}</p>}
        </List>
      </Box>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          <Button href={`/house`} className={styles.button}>
            Return to Houses
          </Button>
        </Typography>
      </Container>
    </Box>
  )
}
