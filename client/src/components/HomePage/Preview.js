// this component takes  our video and preview in homepage 

import { useEffect } from "react";
import "./Preview.scss";

export default function Preview() {
    useEffect(() => {
        initWebRTC();
    }, []);

    // audiotracks and videotracks are called here
    const initWebRTC = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true
            })
            .then((stream) => {
                let myVideo = document.getElementById("myVideo");

                if ("srcObject" in myVideo) {
                    myVideo.srcObject = stream;
                } else {
                    myVideo.src = window.URL.createObjectURL(stream);
                }

                myVideo.play();
            });
    };
    
    return (
        // video is displayed in this tag
        <div className="vidcontainer">
            <video className="edges" muted id="myVideo" src=""></video>
        </div>
    );
}