    import React from 'react';
    import { Typography, Button, Box } from '@mui/material';
    import { Link } from 'react-router-dom';

    function NotFoundPage() {
      return (
        <Box  sx={{
           
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            bgcolor: '#f5f5f5',
            gridColumn: '1 / 13',
            
        }}>
          <Typography variant="h1" component="h2" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
            Go to Homepage
          </Button>
        </Box>
      );
    }

    export default NotFoundPage;