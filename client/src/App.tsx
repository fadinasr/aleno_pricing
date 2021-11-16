import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useTable} from 'react-table'
import axios from 'axios';
import TableComponent, {Styles} from './components/table';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UploadFile from './components/uploadFile';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import Modal from '@mui/material/Modal';

interface Item {
    advanced: string;
    enterprise: string;
    starter: string;
    tiers: string;
    _id: string;
    id: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function App() {
    const [items, setItems] = useState<Array<Item>>([{
        advanced: '',
        enterprise: '',
        starter: '',
        tiers: '',
        _id: '',
        id: '',
    }]);
    const [modalOpen, setModalOpen] = useState(false);
    const [uploaded, setUploaded] = useState();

    const getDataFromAPI = async () => {
        let url = 'api/all';
        let res = await axios.get(url);

        // Set items in state
        if (res.data && res.data.items) setItems(res.data.items);
    }

    useEffect(() => {
        getDataFromAPI();
    }, [uploaded])

    const columns = [
        {
            Header: 'Tiers',
            accessor: 'tiers'
        },
        {
            Header: 'Starter',
            accessor: 'starter'
        },
        {
            Header: 'Advanced',
            accessor: 'advanced'
        },
        {
            Header: 'Enterprise',
            accessor: 'enterprise'
        }
    ]

    return (
        <div className="App">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>Upload CSV</Button>
                </Grid>
                {
                    uploaded && <Grid item xs={12}>
                      <Styles>
                        <TableComponent
                            // @ts-ignore
                          data={items}
                          columns={columns}
                        />
                      </Styles>
                    </Grid>
                }
            </Grid>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UploadFile setUploaded={setUploaded} setModalOpen={setModalOpen}/>
                </Box>
            </Modal>
        </div>
    );
}

export default App;
