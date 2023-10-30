const Loader = ({isLoading}) => {
    return <>
        {isLoading && <div className='d-flex w-100 justify-content-center align-items-center'>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>}
    </>
}

export default Loader