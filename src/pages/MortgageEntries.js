import { Helmet } from 'react-helmet-async';
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    Stack,
    Button,
    Popover,
    MenuItem,
    Container,
    Typography,
    Grid,
    TextField
} from '@mui/material';
// components
import Iconify from '../components/iconify';
// mock
import { getMortgages } from '../_mock/mortgages';

// ----------------------------------------------------------------------

export default function MortgageEntries() {

    const [open, setOpen] = useState(null);
    const [openAddEntryPopup, setOpenAddEntryPopup] = useState(false)
    const [mortgages, setMortgages] = useState([]);
    const [formValues, setFormValues] = useState({
        customerName: '',
        inRelationWith: '',
        customerEmail: '',
        customerAddress: '',
        customerContactNo: '',
        customerAlternateNo: '',
        customerIdProofNo: '',
        itemName: '',
        numPieces: '',
        weightGms: '',
        weightMg: '',
        principalAmount: '',
        interestRate: '',
        marketValue: '',
        dateOfMortgage: new Date().toISOString().split('T')[0], // Default to current date
    });

    useEffect(() => {
        getMortgages().then((mortgages) => {
            setMortgages(mortgages)
        })
    }, [])

    const handleCloseMenu = () => {
        setOpenAddEntryPopup(null);
    };

    const handleAddEntry = () => {
        setOpenAddEntryPopup(true);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e, data) => {
        e.preventDefault()
        console.log('Data: ', formValues)
    }

    const filteredUsers = mortgages

    const columns = [
        { name: 'billNumber', label: 'Bill No.', options: { filter: true, sort: false } },
        { name: 'customerName', label: 'Name', options: { filter: true, sort: true } },
        { name: 'inRelationWith', label: 'S/o, D/o, W/o', options: { filter: true, sort: false } },
        { name: 'customerEmail', label: 'Email', options: { filter: true, sort: false } },
        { name: 'customerContactNo', label: 'Contact No.', options: { filter: true, sort: false } },
        { name: 'customerAlternateNo', label: 'Alternate No.', options: { filter: true, sort: false } },
        { name: 'customerAddress', label: 'Address', options: { filter: true, sort: false } },
        { name: 'customerIdProofNo', label: 'ID Proof', options: { filter: true, sort: false } },
        { name: 'itemName', label: 'Item Name', options: { filter: true, sort: false } },
        { name: 'numPieces', label: 'No. of Pieces', options: { filter: true, sort: false } },
        { name: 'principalAmount', label: 'Principal Amount', options: { filter: true, sort: false } },
        { name: 'interestRate', label: 'Interest', options: { filter: true, sort: false } },
        { name: 'marketValue', label: 'Market Value', options: { filter: true, sort: false } },
        { name: 'weightGms', label: 'Weight(gms)', options: { filter: true, sort: false } },
        { name: 'weightMg', label: 'Weight(mg)', options: { filter: true, sort: false } },
        { name: 'dateOfMortgage', label: 'Date', options: { filter: true, sort: false } },
        { name: '', label: 'Action', options: { filter: true, sort: false } },
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <>
            <Helmet>
                <title> Mortgages </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Mortgages
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddEntry}
                    >
                        Add New Entry
                    </Button>
                </Stack>

                <Card>
                    <MUIDataTable title="Mortgages" data={filteredUsers} columns={columns} options={options} />
                </Card>
            </Container>
            <Popover
                open={Boolean(openAddEntryPopup)}
                anchorEl={openAddEntryPopup}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 300, // Adjust the width as needed
                    },
                }}
            >
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Customer Name"
                                name="customerName"
                                value={formValues.customerName}
                                onChange={handleFormChange}
                                required
                            />
                        </Grid>
                        <Grid item x s={12}>
                            <TextField
                                fullWidth
                                label="S/o, D/o, W/o"
                                name="inRelationWith"
                                value={formValues.inRelationWith}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="customerEmail"
                                value={formValues.customerEmail}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        {/* Add more TextFields for other fields */}
                        <Grid item xs={12}>
                            <Button type="submit" onClick={handleFormSubmit} variant="contained" color="primary">
                                Add Entry
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Popover>


            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
