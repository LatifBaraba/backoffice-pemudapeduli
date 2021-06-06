import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_CLOUDINARY_URL}`;
const PRESET = `${process.env.REACT_APP_CLOUDINARY_PRESET}`;
const SIZE = `${process.env.REACT_APP_IMAGE_UPLOAD_LIMIT}`;

export function uploadImage(files) {
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

export function toIsoString(date) {
    console.log(date, 'date')
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}