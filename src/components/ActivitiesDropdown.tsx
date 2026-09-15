// Rozbalovací panel se seznamem aktivit pod rychlou navigací (SPORT + REGENERACE)
import Box from '@mui/material/Box'
import { content } from '../content'
import { fluid } from '../fluid'
import NavSection from './NavSection'

interface ActivitiesDropdownProps {
  onNavigate?: () => void
}

export function ActivitiesDropdown({ onNavigate }: ActivitiesDropdownProps) {
  const sections = content.navSections.filter((section) => content.quickNav.activities.sections.includes(section.label))

  return (
    <Box component="nav" sx={{ paddingTop: fluid(30, 32), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
      {sections.map((section) => (
        <Box key={section.label} sx={{ '& + &': { paddingTop: fluid(24, 26) } }}>
          <NavSection section={section} alwaysOpen onNavigate={onNavigate} />
        </Box>
      ))}
    </Box>
  )
}

export default ActivitiesDropdown
