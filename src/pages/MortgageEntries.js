import { Helmet } from 'react-helmet-async';
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
    TextField,
    Stepper,
    Step,
    StepLabel,
    Box,
    Modal,
    IconButton
} from '@mui/material';
// components
import { mortgageState } from '../state/atoms/mortgageState';
import { MortgageDetails, CustomerDetails } from '../sections/@dashboard/mortgage';
import Iconify from '../components/iconify';
// mock
import { getMortgages, addMortgage, editMortgage } from '../_mock/mortgages';

// ----------------------------------------------------------------------

export default function MortgageEntries() {

    const [open, setOpen] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [openAddEntryPopup, setOpenAddEntryPopup] = useState(false)
    const [mortgages, setMortgages] = useRecoilState(mortgageState);
    const [isEditing, setIsEditing] = useState(false)
    const [formValues, setFormValues] = useState({
        shopId: '1f4c94d0-9c7e-4e9a-95d5-000000000002',
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
            setFormValues({ ...formValues, billNumber: mortgages.length + 1 })
        })
    }, [])

    const handleOpen = (event, tableMeta) => {
        setFormValues(filteredUsers[tableMeta.rowIndex])
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setFormValues({})
        setIsEditing(false)
        setOpen(null);
    };

    const handleCloseEntry = () => {
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

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (isEditing) {
            await editMortgage(formValues)
        } else {
            await addMortgage(formValues)
        }
        handleCloseEntry()
        await getMortgages()

    }

    function calculateTotalInterest(principalAmount, interestRate, fromDate) {
        const annualInterestRate = Number(interestRate)
        const currentDate = new Date();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const days = Math.round((currentDate - new Date(fromDate)) / millisecondsPerDay);
        const dailyInterestRate = annualInterestRate / 100 / 365;
        const totalInterest = Number(principalAmount) * ((1 + dailyInterestRate) ** days - 1);
        return parseFloat(totalInterest.toFixed(2))
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
        { name: 'principalAmount', label: 'Principal Amount', options: { filter: true, sort: true } },
        { name: 'interestRate', label: 'Interest', options: { filter: true, sort: true } },
        { name: 'marketValue', label: 'Market Value', options: { filter: true, sort: false } },
        { name: 'weightGms', label: 'Weight(gms)', options: { filter: true, sort: true } },
        { name: 'weightMg', label: 'Weight(mg)', options: { filter: true, sort: false } },
        { name: 'dateOfMortgage', label: 'Date', options: { filter: true, sort: true } },
        {
            name: '', label: 'Total Interest', options: {
                filter: true, sort: false,
                customBodyRender: (value, tableMeta) => {
                    const rowData = filteredUsers[tableMeta.rowIndex]
                    return (
                        <Typography variant="h6" gutterBottom>
                            ₹{calculateTotalInterest(rowData.principalAmount, rowData.interestRate, rowData.dateOfMortgage)}
                        </Typography>
                    )
                }
            }
        },
        {
            name: '', label: 'Action', options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    console.log(tableMeta)
                    return (
                        <IconButton size="large" color="inherit" onClick={(e) => handleOpen(e, tableMeta)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                    )
                }
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
    };

    const steps = [
        'Customer Details',
        'Mortgage Details',
    ];

    const style = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        maxWidth: '70%',
        border: '1px solid #000',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CustomerDetails formValues={formValues} handleFormChange={handleFormChange} />;
            case 1:
                return <MortgageDetails formValues={formValues} handleFormChange={handleFormChange} />
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = (e) => {
        if (activeStep === 1) {
            handleFormSubmit(e)
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleEditEntry = () => {
        setIsEditing(true)
        setOpenAddEntryPopup(true)
    }

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
            <Modal
                open={Boolean(openAddEntryPopup)}
                onClose={handleCloseEntry}
            >
                <Card sx={style}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <TextField label="Bill No." variant="standard" name="billNumber" value={isEditing ? formValues.billNumber : filteredUsers.length + 1} disabled />
                    </Box>
                    <Grid sx={{ px: 2 }} container spacing={2}>
                        {getStepContent(activeStep)}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3 }}
                                >
                                    {activeStep === steps.length - 1 ? isEditing ? 'Edit Entry' : 'Add Entry' : 'Next'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
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
                <MenuItem onClick={handleEditEntry}>
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
