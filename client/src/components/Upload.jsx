import React from "react";
import axios from 'axios';

const Upload = () => {

    const [image, setImage] = React.useState(null);

    const upload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        axios.post('http://localhost:3001/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    return (
        <form onSubmit={upload}>
            <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />
            <button type="submit">submit</button>
        </form>
    )
}

export default Upload;