import { Fax, Phone, Twitter, LocationCity, DynamicForm, Facebook, YouTube, Person, Policy, Title } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function ContactInfo({ rep }) {
    return (
        <>
            <Paper sx={{ padding: '20px 0', margin: '5px 0' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 1, md: 4 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>General:</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Person /> { rep.first_name ? `${rep.first_name} ${rep.last_name}` : 'N/A' }
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Policy /> Party: {rep.party || 'N/A'}
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Title /> {rep.title || 'N/A'}
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Paper sx={{ padding: '20px 0', margin: '5px 0' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 1, md: 4 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Contact:</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <DynamicForm /> { rep.contact_form ? <a rel="noreferrer" target="_blank" href={rep.contact_form}>Contact Form</a> : 'N/A' }
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Phone /> {rep.phone || 'N/A'}
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Fax /> {rep.fax || 'N/A'}
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ fontWeight: 'bold' }}>
                            <LocationCity /> {rep.office || 'N/A'}
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Paper sx={{ padding: '20px 0', margin: '5px 0' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 1, md: 4 }}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Social:</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Twitter /> @{rep.twitter_account || 'N/A'}
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <Facebook /> @{rep.facebook_account || 'N/A'}
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ fontWeight: 'bold' }}>
                            <YouTube /> @{rep.youtube_account || 'N/A'}
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

export default ContactInfo;
