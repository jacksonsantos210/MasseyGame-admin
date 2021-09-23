import React from 'react';
import '@/assets/css/login.css';
/* import {LoginWrapper} from './styles';
import backgroundImage from '@/assets/images/background.png'; */

export default function AuthLayout({children}) {
  return (
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        {children}
      </div>
    </main>
  )
}
