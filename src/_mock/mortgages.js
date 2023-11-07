import axios from 'axios';
import { useRecoilState } from 'recoil';

export const getMortgages = async () => {
    const mortgages = await axios.get('http://localhost:5000/api/mortgaged')
    console.log('Mortgages: ', mortgages)
    return mortgages.data
}

export const addMortgage = async (data) => {
    const mortgages = await axios.post('http://localhost:5000/api/mortgaged/add', data)
    console.log('Mortgages: ', mortgages)
    return mortgages.data
}

export const editMortgage = async (data) => {
    const mortgages = await axios.put(`http://localhost:5000/api/mortgaged/update/${data.id}`, data)
    console.log('Edit Mortgage ', mortgages)
    return mortgages.data
}
