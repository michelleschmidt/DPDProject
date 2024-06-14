import React, {useEffect} from "react";

interface Props {
    text: string;
    onHide: () => void;
}

const Notification = (props: Props) => {
    const {text, onHide} = props;

    const handleClose = () => {
        onHide();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            onHide();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onHide]);

    return (
        <>
            <div
                className={`fixed top-0 right-0 z-50 w-[300px] h-[100px] bg-primary-900 flex justify-center items-center font-montserrat shadow-lg transition-transform ease-in-out duration-500`}
                style={{zIndex: 9999}}
            >
                <div className="h-full w-[100px] flex justify-center items-center">
                    <p className="text-[50px] text-white text-center">!</p>
                </div>
                <p className="text-white">{text}</p>
                <div
                    className="ml-1 mr-8 cursor-pointer text-white flex justify-center items-center"
                    style={{fontSize: "18px", fontWeight: "bold"}}
                    onClick={handleClose}
                >
                    &#x2716;
                </div>
            </div>
        </>
    );
};

export default Notification;
