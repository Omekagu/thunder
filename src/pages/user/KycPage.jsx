import React, { useState, useRef, useEffect } from 'react'
import { FaCamera, FaIdCard } from 'react-icons/fa'
import Image from 'next/image'
import MainHeader from '../../Components/User/MainHeader'

const Step1 = ({ onNext }) => (
  <div className='kyc-step'>
    <div className='kyc__icon-container'>
      <FaIdCard size={60} color='#6f5fbf' />
    </div>
    <h2 className='kyc__title'>Let's verify KYC</h2>
    <p className='kyc__subtitle'>
      Please submit the following documents to verify your profile.
    </p>
    <div className='kyc__options'>
      <button className='kyc__option' onClick={onNext}>
        Take a picture of your valid ID
      </button>
      <button className='kyc__option' onClick={onNext}>
        Take a selfie of yourself
      </button>
    </div>
    <p className='kyc__footer-link'>Why is this needed?</p>
  </div>
)

const Step2 = ({ onNext, onBack }) => {
  const [preview, setPreview] = useState(null)

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='kyc-step'>
      <h2 className='kyc__title'>Upload proof of your identity</h2>
      <p className='kyc__subtitle'>Please submit a document below</p>
      <div className='kyc__options'>
        <label className='kyc__option'>
          Upload ID Card
          <input
            type='file'
            hidden
            accept='image/*,application/pdf'
            onChange={handleFileChange}
          />
        </label>
        <label className='kyc__option'>
          Upload Passport
          <input
            type='file'
            hidden
            accept='image/*,application/pdf'
            onChange={handleFileChange}
          />
        </label>
        <label className='kyc__option'>
          Upload Driving Licence
          <input
            type='file'
            hidden
            accept='image/*,application/pdf'
            onChange={handleFileChange}
          />
        </label>
      </div>
      {preview && (
        <div className='kyc__preview'>
          <p>Preview:</p>
          <img
            src={preview}
            alt='Document Preview'
            className='kyc__preview-img'
          />
        </div>
      )}
      <div className='kyc__buttons'>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Continue</button>
      </div>
    </div>
  )
}

const Step3 = ({ onBack }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream
      })
      .catch(err => console.error('Camera error:', err))

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, 300, 300)
    const imageData = canvasRef.current.toDataURL('image/png')
    console.log('Captured Image:', imageData)
  }

  return (
    <div className='kyc-step kyc--camera'>
      <video ref={videoRef} autoPlay muted playsInline className='kyc__video' />
      <canvas
        ref={canvasRef}
        width='300'
        height='300'
        style={{ display: 'none' }}
      />

      <div className='kyc__instructions'>
        <p>Align your face in the middle</p>
        <span>Make sure your face is inside the box and capture a photo</span>
      </div>

      <button className='kyc__capture-btn' onClick={handleCapture}>
        📸
      </button>
      <div className='kyc__buttons'>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  )
}

const Step4 = () => (
  <div className='kyc-step'>
    <h2 className='kyc__title'>🎉 All Set!</h2>
    <p className='kyc__subtitle'>
      Your KYC information has been successfully submitted for verification.
      We’ll notify you shortly.
    </p>
    <div className='kyc__confirmation-icon'>✅</div>
  </div>
)

export default function KycPage () {
  const [step, setStep] = useState(1)

  return (
    <>
      <MainHeader />
      <div className='kyc-wrapper'>
        <div className='kyc-container'>
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Step3 onBack={() => setStep(2)} onNext={() => setStep(4)} />
          )}
          {step === 4 && <Step4 />}
        </div>
      </div>
    </>
  )
}
