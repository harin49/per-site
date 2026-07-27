import React from 'react';
import '../styles/global.css';
import ThemeProvider from 'src/providers/ThemeProvider';
import Nav from 'src/components/Nav';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
