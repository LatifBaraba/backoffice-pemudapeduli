import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_CLOUDINARY_URL}`;
const PRESET = `${process.env.REACT_APP_CLOUDINARY_PRESET}`;
const SIZE = `${process.env.REACT_APP_IMAGE_UPLOAD_LIMIT}`;

const uploadImage = (files) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", files);
        formData.append("upload_preset", PRESET);
        if(files.size < SIZE) {
            axios.post(URL, formData)
            .then((res) => {
                console.log(res)
                resolve({
                    message: "success",
                    response: res
                })
            })
            .catch((err) => {
                console.log(err)
                reject({
                    message: "failed",
                    response: err
                })
            })
        } else {
            toast.warn("Image Size Too Large !");
        }
        
    })
}

export default uploadImage