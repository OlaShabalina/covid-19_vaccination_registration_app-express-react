import './ErrorPage.scss';
import CustomButton from '../customButton/CustomButton';

export default function ErrorPage() {
  return (
    <div className="container">
      <p className="text-center"> Something went wrong or this page doesn't exists.</p> 
      <div className="button-container">
          <CustomButton href="/" id="back-home-button">Back to the app</CustomButton>
      </div>
      <img className="rounded mx-auto d-block img-fluid" src="https://media.istockphoto.com/vectors/error-page-not-found-website-banner-vector-id654971856?k=6&m=654971856&s=612x612&w=0&h=vhEqSbb2hVtxvackiu2z8k-Ac5NlYPfzWgQRYY_9FEg=" alt="too bad" />
    </div>
  )
}
