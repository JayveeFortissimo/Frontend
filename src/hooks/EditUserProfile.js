import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Sidebars } from "../Store/Side.js";
import { user } from '../Store/Credentials.js';
import { useDispatch } from 'react-redux';

const EditProfileUser = () => {
    const dispatch = useDispatch();

    const [userPro, setUserPro] = useState({
        name: '',
        email: '',
        address: '',
        contact: '',
        password: ''
    });
   
    const [ID, setID] = useState(null);

    useEffect(() => {
        // Retrieve ID from localStorage
        const storedID = JSON.parse(localStorage.getItem("ID"));
        if (storedID) {
            setID(storedID);
        } else {
            toast.error("User ID not found in localStorage");
        }
    }, []);

    useEffect(() => {
        if (ID && ID.id) {
            // Fetch user profile or perform other setup if needed
        }
    }, [ID]);

    const handleProfile = (type, value) => {
        setUserPro(pros => ({
            ...pros,
            [type]: value
        }));
    };

    const Edits = async (e) => {
        e.preventDefault();
        if (!ID || !ID.id) return toast.error("User ID is not available");

        try {
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/user_can_Edit/${ID.id}`, {
                method: "PUT",
                body: JSON.stringify(userPro),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) return toast.error("Data could not be edited successfully");

            toast.success("Edited Successfully");
            dispatch(user.setUserData(data.result));
            dispatch(Sidebars.Editpro(false));

            setUserPro({ name: '', email: '', address: '', contact: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        Edits,
        handleProfile,
        userPro
    };
};

export default EditProfileUser;
