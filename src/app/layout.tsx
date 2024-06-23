import React from 'react';
import '../styles/global.css';
import ThemeProvider from 'src/providers/ThemeProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
