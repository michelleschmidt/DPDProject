import penIcon from "../../assets/icon/pen.svg";
import closeIcon from "../../assets/icon/close_white.svg";
import {useState} from "react";

export interface ProfileUpdateAttributeProps {
    initial: string,
    value: string,
    onChange: (value: string) => void,
    onUpdate: () => Promise<void>
}

function ProfileUpdateAttribute(props: ProfileUpdateAttributeProps) {

    const [updateMode, setUpdateMode] = useState<boolean>(false)

    function toggleUpdateMode() {
        if (!updateMode) {
            props.onChange(props.initial)
        }
        setUpdateMode(!updateMode)
    }

    function onSubmit() {
        props.onUpdate().then(() => {
            toggleUpdateMode()
        })
    }

    return (
        <div className={"flex items-center w-full h-[40px] space-x-5"}>
            {updateMode ? (
                <div onClick={toggleUpdateMode}
                     className={"w-[25px] h-[25px] flex items-center rounded-full cursor-pointer justify-center bg-primary-900"}>
                    <img width={15} src={closeIcon} alt={"close icon"}/>
                </div>
            ) : (
                <div onClick={toggleUpdateMode}
                     className={"w-[25px] h-[25px] flex items-center rounded-full cursor-pointer justify-center bg-primary-900"}>
                    <img width={10} src={penIcon} alt={"writing pencil"}/>
                </div>
            )}
            <div className={"h-[40px] flex-1"}>
                <input
                    onChange={e => props.onChange(e.target.value)}
                    className={"h-[40px] w-full px-4"} type={"text"} value={props.value} disabled={!updateMode}
                />
            </div>
            <button
                onClick={onSubmit}
                disabled={!updateMode}
                className={"h-[40px] flex items-center justify-center w-[100px] text-white " + (updateMode ? "bg-primary-900" : "bg-light-900")}>
                <span>Update</span>
            </button>
        </div>
    )
}

export default ProfileUpdateAttribute