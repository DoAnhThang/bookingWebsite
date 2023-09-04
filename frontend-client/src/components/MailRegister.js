function MailRegister() {
  return (
    <div className="container-fluid text-white text-center bg-darkBlue py-5">
      <div className="container px-0">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="Your Email"
            className="form-control me-3 py-3"
            style={{ maxWidth: "20rem" }}
          ></input>
          <button className="btn btn-primary py-3">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default MailRegister;
