// Tyrkysový blok s tlačítkem „Popis všech cvičení“ a rozbalitelným seznamem lekcí
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import type { ActivityClass } from '../types'
import Icon from './Icon'
import RichText from './RichText'

interface ClassListAccordionProps {
  classes: ActivityClass[]
}

export function ClassListAccordion({ classes }: ClassListAccordionProps) {
  const [open, setOpen] = useState(false)
  const { classListButton, openIcon, closeIcon } = content.pages.activity

  return (
    <Box sx={{ backgroundColor: COLORS.teal, minHeight: fluid(360, 380), paddingTop: fluid(140, 150) }}>
      <Box sx={{ paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
        <ButtonBase
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          sx={{
            width: '100%',
            height: fluid(80, 84),
            borderRadius: fluid(40, 42),
            border: open ? 'none' : `1px solid ${COLORS.white}`,
            backgroundColor: open ? COLORS.dark : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: fluid(28, 30),
            paddingLeft: fluid(24, 26),
            paddingRight: fluid(24, 26),
            transition: 'background-color 200ms',
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: fluid(20, 21), lineHeight: fluid(24, 25), fontWeight: 500, color: COLORS.white }}
          >
            {classListButton}
          </Typography>
          <Icon src={open ? closeIcon : openIcon} size={open ? fluid(44, 46) : fluid(34, 36)} />
        </ButtonBase>
      </Box>

      <Collapse in={open}>
        <Box component="dl" sx={{ margin: 0, paddingTop: fluid(90, 96), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
          {classes.map((item) => (
            <Box key={item.name} sx={{ '& + &': { paddingTop: fluid(50, 54) } }}>
              <Typography
                component="dt"
                sx={{ fontSize: fluid(16, 17), lineHeight: fluid(28, 30), fontWeight: 700, color: COLORS.white }}
              >
                {item.name}
              </Typography>
              <RichText
                component="dd"
                html={item.text}
                sx={{ margin: 0, fontSize: fluid(16, 17), lineHeight: fluid(28, 30) }}
              />
            </Box>
          ))}
        </Box>
        <Box aria-hidden sx={{ height: fluid(100, 110) }} />
      </Collapse>
    </Box>
  )
}

export default ClassListAccordion
