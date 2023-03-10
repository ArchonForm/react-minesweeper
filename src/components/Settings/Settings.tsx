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
} from '@mui/material'
import React, { useState } from 'react'
import { SetupData } from '../../models'
import { SettingsProps } from './Settings.props'

export const Settings = ({ handleSetData, name }: SettingsProps) => {
  const presetData: Record<string, SetupData> = {
    beginner: {
      width: 10,
      height: 10,
      mines: 2,
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40,
    },
    expert: {
      width: 20,
      height: 20,
      mines: 99,
    },
  }

  const [difficulty, setDifficulty] = useState<string>('beginner')

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDifficulty(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSetData(presetData[difficulty], name)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className='center'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>💣</Avatar>
          <Typography
            sx={{ color: 'rgb(0,0,0,.6)' }}
            component='h1'
            variant='h5'
          >
            MineSweeper
          </Typography>
          <Paper
            sx={{
              marginTop: '1rem',
              padding: '1rem',
              width: '100%',
            }}
            elevation={3}
          >
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
                <Typography
                  sx={{
                    fontSize: '1.5rem',
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
