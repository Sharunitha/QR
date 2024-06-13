import React, { useState } from 'react'
import '../components/QRCode.css'

export const QRCode = () => {
  const [img,setImg] =useState("");
  const [Loading,setLoading]=useState(false);
  const [qrData,setQrData]=useState("");
  const [qrSize,setQrSize]=useState("");

  async function generateQR(){
    setLoading(true);
    try{
       const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
       setImg(url);
    }catch(error){
        console.error("Error generating QR code ",error);
    }finally{
      setLoading(false);
    }
  }
  function downloadQR(){
      fetch(img).then((response)=>response.blob()).then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error)=>{
        console.error("Error downloading QRcode",error);
      });
  }
  return (
    <div className='app-container'>
        <h1>QR CODE GENERATER</h1>
        {Loading &&<p>Please wait...</p>}
        {img && <img src={img} alt='' className='QR-code-image'/>}
        <div>
            <label htmlFor='dataInput' className='input-label' >Data For QR code:</label>
            <input type='text' id='dataInput' value={qrData} placeholder='Enter data for QR code' onChange={(e)=>setQrData(e.target.value)}/>

            <label htmlFor='sizeInput' className='input-label'>Image size (e.g., 150):</label>
            <input type='text' id='sizeInput' value={qrSize} placeholder='Enter image size' onChange={(e)=>setQrSize(e.target.value)}/>

            <button className='generate-button' disabled={Loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQR}>Download QR Code </button>
        </div>
        <p className='footer'>Designed By <a href='https://www.linkedin.com/in/sharunitha01' >Sharu</a></p>

    </div>
  )
}
