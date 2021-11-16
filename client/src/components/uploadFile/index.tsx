import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import React, {useState} from 'react';

interface Props {
    setUploaded: (results: any) => void;
    setModalOpen: (open: boolean) => void;
}

const UploadFile = (props: Props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    // @ts-ignore
    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
    }

    const handleSubmit = async () => {
        const formData = new FormData();

        // @ts-ignore
        formData.append('file', selectedFile);

        try {
            let result = await axios.post('/api/uploads/csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            props.setUploaded(result);
            props.setModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <input type="file" name="file" onChange={handleChange}/>
            <Button variant="contained" onClick={handleSubmit}>Upload CSV</Button>
        </Grid>
    )
}

export default UploadFile;
