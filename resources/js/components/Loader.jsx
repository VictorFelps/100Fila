const Loader = ({isLoading}) => {
    return <>
        {isLoading && <div className='d-flex w-100 justify-content-center align-items-center'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
    </>
}

export default Loader