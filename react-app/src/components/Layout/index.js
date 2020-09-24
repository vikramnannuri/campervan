import React from 'react';
import Container from 'react-bootstrap/Container'

const Layout = ({children}) => {
    return (<Container className="app-container">
        <h2>Campervan</h2>
        {children}
    </Container>)
}

export default Layout;