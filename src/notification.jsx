import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener, requestPermission } from './firebase';

const Notification = () => {
    const [notification, setNotification] = useState({ title: '', body: '' });
    useEffect(() => {
        requestPermission();
        onMessageListener();
        const unsubscribe = onMessageListener().then((payload) => {
            console.log(payload)
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body,
            });
            toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
                duration: 3000,
                position: 'top-right',
            });
        });
        return () => {
            unsubscribe.catch((err) => console.log('failed: ', err));
        };
    }, []);
    return (
        <div>
            <Toaster />
        </div>
    );
}
export default Notification