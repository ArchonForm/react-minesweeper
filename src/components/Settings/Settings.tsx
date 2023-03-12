import {
  Box,
  Avatar,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { SetupData } from '../../interfaces'
import { SettingsProps } from './Settings.props'
import styles from './Settings.module.css'
import { Emoji } from '../../enums'

export const Settings = ({ handleSetData }: SettingsProps) => {
  const preset: Record<string, SetupData> = {
    beginner: {
      width: 8,
      height: 8,
      mines: 10,
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40,
    },
    expert: {
      width: 32,
      height: 16,
      mines: 100,
    },
  }

  const [nameValue, setNameValue] = useState<string>('')
  const [nameError, setNameError] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<string>('beginner')

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDifficulty(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nameValue) {
      setNameError(true)
      return
    }
    handleSetData(preset[difficulty], nameValue)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={styles.center}>
        <Box className={styles.box}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>{Emoji.Mine}</Avatar>
          <Typography
            sx={{ color: 'rgb(0,0,0,.6)' }}
            component='h1'
            variant='h5'
          >
            MineSweeper
          </Typography>
          <Paper className={styles.paper} elevation={3}>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl
                sx={{
                  width: '100%',
                }}
              >
                <TextField
                  id='outlined-basic'
                  label='Enter your name...'
                  variant='outlined'
                  size='small'
                  fullWidth
                  sx={{ marginBottom: '10px' }}
                  onChange={e => setNameValue(e.target.value)}
                  error={nameError}
                />
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'rgb(0,0,0,.6)',
                  }}
                  id='difficulty-group-label'
                >
                  Select Difficulty
                </Typography>
                <RadioGroup
                  aria-labelledby='difficulty-group-label'
                  defaultValue='beginner'
                  name='difficulty-buttons-group'
                >
                  <FormControlLabel
                    value='beginner'
                    control={<Radio />}
                    label='Beginner'
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value='intermediate'
                    control={<Radio />}
                    label='Intermediate'
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value='expert'
                    control={<Radio />}
                    label='Expert'
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Start Game
              </Button>
            </Box>
          </Paper>
        </Box>
      </div>
    </Container>
  )
}
