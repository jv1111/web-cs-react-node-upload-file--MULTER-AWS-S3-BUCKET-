import React from 'react';
import axios from 'axios';

const ReactUploadImage = () => {
    const [file, setFile] = React.useState(null);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }

    const onChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="myImage" onChange={onChange} />
            <button type="submit">Upload</button>
        </form>
    )
}

export default ReactUploadImage;