import React from 'react'
import ThemeContext from '@theme/theme-context'
import { NextUIThemes } from '@theme/index'

const useTheme = (): NextUIThemes => React.useContext<NextUIThemes>(ThemeContext)

export default useTheme
