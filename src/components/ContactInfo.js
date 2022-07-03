import { Fax, Phone, Twitter } from '@mui/icons-material';
import { Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function ContactInfo({ rep }) {
    return (
        <Paper varient="outlined" sx={{ padding: '20px 0' }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 4 }}>
                    <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                        <Phone /> {rep.phone || 'N/A'}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                        <Fax /> {rep.fax || 'N/A'}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                        <Twitter /> @{rep.twitter_account || 'N/A'}
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default ContactInfo;
