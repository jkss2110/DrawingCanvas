import { useEffect, useRef } from "react";

const useCanvas = draw =>{
    const canvasRef = useRef(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let framework = 0;
        let animationFrameId;

        const render = () => {
            framework++;
            draw(context,framework);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();
            return () => {
                window.cancelAnimationFrame(animationFrameId);
        };
    },[draw]);
    return canvasRef;
};
export default useCanvas;