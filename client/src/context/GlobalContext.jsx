import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "../service/helper";
import { useNavigate } from "react-router-dom";



export const globalState = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const navigae = useNavigate();

    const handleEdit = async (id, formdata) => {
        try {
            let headers = {
                "Content-Type": "multipart/form-data"
            }
            const res = await axios.put(`${BASE_URL}/update/${id}`, formdata, { headers });
            if (res.status === 201) {
                let newDoc = res.data.doc;
                let ind = data.findIndex((i) => i._id === id);
                data[ind] = newDoc;

            }
        } catch (e) {
            console.log("edit error", e)

        }
    }
    const handleUpdateStatus = async (id, status) => {
        try {

            const res = await axios.put(`${BASE_URL}/status/${id}`, { status: status });
            if (res.status === 201) {
                let newDoc = res.data.doc;
                let ind = data.findIndex((i) => i._id === id);
                data[ind] = newDoc;
                navigae("/");

            }
        } catch (e) {
            console.log("edit error", e)

        }
    }
    const handleadduser = async (formdata) => {
        try {
            let headers = {
                "Content-Type": "multipart/form-data"
            }
            const res = await axios.post(`${BASE_URL}/add-user`, formdata, { headers })

            if (res.status === 201) {
                setData([...data, res.data.doc])
                navigae("/");
            }

        } catch (e) {
            console.log("add-user error", e)

        }
    }
    const handledelete = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete/${id}`);
            if (res.status === 201) {
                let newList = data.filter((i) => i._id !== id);
                setData(newList);
            }

        } catch (e) {
            console.log("delete error", e)

        }
    }

    

    return (
        <globalState.Provider value={{ data, setData, handleadduser, handleEdit, handledelete, handleUpdateStatus }}>{children}</globalState.Provider>
    )
}