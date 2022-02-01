import React from "react";
import CustomButton from "./custombutton";

export default function SomeButtons() {
    return (
        <>
        <CustomButton text="Sign up with Facebook" onPress={onFacebook} bgcolor="#E7EAF4" textcolor="#4765A9" />
        <CustomButton text="Sign up with Google" onPress={onGoogle}  bgcolor="#FAE9EA" textcolor="#DD4D44"/>
        </>
    )
}

const onFacebook = () => {
    console.warn("facebook")
}
const onGoogle = () => {
    console.warn("forgotPassword")
}