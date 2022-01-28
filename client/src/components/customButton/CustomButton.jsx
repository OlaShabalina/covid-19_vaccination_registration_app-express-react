import './CustomButton.scss'

function CustomButton({ children, type, href, id }) {
  return (
    <a 
      href={href} 
      className="custom-button btn btn-outline-secondary mt-4 ms-3 button"
      type={type} 
      id={id}
    >
      {children}
    </a>
  )
}

export default CustomButton;
