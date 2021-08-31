import React from 'react';
import {LoginWrapper} from './styles';
import backgroundImage from '@/assets/images/background.png';

export default function AuthLayout({children}) {
  return (
    <LoginWrapper background={backgroundImage}>
      {children}
    </LoginWrapper>
  )
}
