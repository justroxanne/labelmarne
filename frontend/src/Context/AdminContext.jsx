import React, {createContext, useState} from "react";
import storageService from "../services/storageService";

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(storageService.getItem('admin'));
    
    const storeAdmin = (adminData) => {
        storageService.setItem('admin', adminData);
        setAdmin(adminData);
    };
    
    return (
        <AdminContext.Provider value={{admin, storeAdmin}}>
        {children}
        </AdminContext.Provider>
    );
    }