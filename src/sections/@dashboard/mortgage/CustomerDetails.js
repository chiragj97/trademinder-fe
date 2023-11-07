import * as React from 'react';
import { Box, Card, Link, Typography, Stack, TextField, FormControlLabel, Grid, Checkbox } from '@mui/material';

export default function CustomerDetails({ formValues, handleFormChange }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Customer Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Customer Name"
                        name="customerName"
                        value={formValues.customerName}
                        onChange={handleFormChange}
                        variant="standard"

                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="S/o, D/o, W/o"
                        name="inRelationWith"
                        value={formValues.inRelationWith}
                        onChange={handleFormChange}
                        variant="standard"

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="customerEmail"
                        value={formValues.customerEmail}
                        onChange={handleFormChange}
                        variant="standard"

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Contact No."
                        name="customerContactNo"
                        value={formValues.customerContactNo}
                        onChange={handleFormChange}
                        variant="standard"

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Alternate Contact No."
                        name="customerAlternateNo"
                        value={formValues.customerAlternateNo}
                        onChange={handleFormChange}
                        variant="standard"

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Id Proof No."
                        name="customerIdProofNo"
                        value={formValues.customerIdProofNo}
                        onChange={handleFormChange}
                        variant="standard"

                        helperText="Aadhar/PAN/DL"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="customerAddress"
                        value={formValues.customerAddress}
                        onChange={handleFormChange}
                        variant="standard"

                    />
                </Grid>
                {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
            </Grid>
        </Box>
    );
}