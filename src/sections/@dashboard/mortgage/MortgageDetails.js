import * as React from 'react';
import { Box, Card, Link, Typography, Stack, TextField, FormControlLabel, Grid, Checkbox } from '@mui/material';

export default function MortgageDetails({ formValues, handleFormChange }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Mortgage Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Item Name"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='itemName'
                        value={formValues.itemName}
                        helperText="Eg. Rings, Necklace etc."
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="No. of Pieces"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='numPieces'
                        value={formValues.numPieces}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Weight (gms)"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='weightGms'
                        value={formValues.weightGms}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Weight (mg)"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='weightMg'
                        value={formValues.weightMg}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Principal Amount"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='principalAmount'
                        value={formValues.principalAmount}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Market Value"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='marketValue'
                        value={formValues.marketValue}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Interest Rate"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='interestRate'
                        value={formValues.interestRate}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Date of Mortgage"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                        name='dateOfMortgage'
                        value={formValues.dateOfMortgage}
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