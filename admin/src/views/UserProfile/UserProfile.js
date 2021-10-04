import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams} from "react-router-dom";

import { create } from "./_redux/userProfileAction";

const UserProfile = () => {
    // Form Data
    const formData = new FormData();
    
    const { id } = useParams();
    const history = useHistory()

    // States
    const [data, setData] = useState({
        name: '',
        website: '',
        linkedin: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        google_plus: '',
        quotes: ''
    });
    const [selectedFile, setSelectedFile] = useState({
        name: '',
        size: 0
    });
    const [isFileSelected, setIsFileSelected] = useState(false);
    const whoisState = useSelector(state => state.whois);

    const dispatch = useDispatch();

    // Handlers || Actions || Triggers
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setIsFileSelected(true);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        Object.entries(data).forEach(item => formData.append(item[0], item[1]));
        formData.append('file', selectedFile)
        for (var key of formData.entries()) {
            console.log(key[0], key[1])
        }
        dispatch(create(id, formData))
    };

    return (
        <main className="content container">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">My Account</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to='/admin'>Admin</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-3">
                                        <div className="nav flex-column nav-pills" id="my-account-tabs" role="tablist" aria-orientation="vertical">
                                            <a className="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Profile</a>
                                            <a className="nav-link" id="v-pills-payment-tab" data-toggle="pill" href="#v-pills-payment" role="tab" aria-controls="v-pills-payment" aria-selected="false">User Info</a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-9">
                                        <div className="tab-content" id="my-account-tabsContent">
                                            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                <h4 className="card-heading p-b-20">Profile</h4>
                                                <form>
                                                    <div className="form-group">
                                                        {(whoisState.currentUser && whoisState.currentUser.user_profile.profile_image_url)
                                                        ? <img src={whoisState.currentUser.user_profile.profile_image_url} className="w-50 rounded-circle" alt={whoisState.currentUser.user_profile.name} />
                                                        : <img src="/assets/img/avatars/default.png" className="w-50 rounded-circle" alt={whoisState.currentUser.username} />}
                                                        
                                                        <div className="file-upload">
                                                            <label htmlFor="file" className="btn btn-primary btn-rounded m-b-0 m-l-5 m-r-5">Upload</label>
                                                            <input type="file" className="file-upload__input" name="file" id="file" onChange={handleChangeFile} />
                                                        </div>
                                                        {/* <button className="btn btn-secondary btn-rounded">Delete</button> */}
                                                        {isFileSelected ? <p className="mt-3">Selected File: <b>{selectedFile.name}</b> - <b>{selectedFile.size/1000}</b> kB</p> : <p className="mt-3">No File Selected</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Your name</label>
                                                        <input type="text" className="form-control" value={data.name} onChange={handleChange} placeholder="Enter your name" name="name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Website</label>
                                                        <input type="text" className="form-control" value={data.website} onChange={handleChange} placeholder="Enter your website" name="website" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>LinkedIn</label>
                                                        <input type="text" className="form-control" value={data.linkedin} onChange={handleChange} placeholder="Enter your LinkedIn url" name="linkedin" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Facebook</label>
                                                        <input type="text" className="form-control" value={data.facebook} onChange={handleChange} placeholder="Enter your Facebook url" name="facebook" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Instagram</label>
                                                        <input type="text" className="form-control" value={data.instagram} onChange={handleChange} placeholder="Enter your Instagram url" name="instagram" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Twitter</label>
                                                        <input type="text" className="form-control" value={data.twitter} onChange={handleChange} placeholder="Enter your Twitter url" name="twitter" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>YouTube</label>
                                                        <input type="text" className="form-control" value={data.youtube} onChange={handleChange} placeholder="Enter your YouTube url" name="youtube" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Google Plus</label>
                                                        <input type="text" className="form-control" value={data.google_plus} onChange={handleChange} placeholder="Enter your Google+ url" name="google_plus" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Bio</label>
                                                        <textarea className="form-control" value={data.quotes} onChange={handleChange} rows="3" name="quotes" ></textarea>
                                                    </div>
                                                    <button onClick={handleSubmit} className="btn btn-primary btn-rounded">Update Profile</button>
                                                    <button onClick={() => history.push('/admin')} className="btn btn-secondary btn-rounded">Back</button>
                                                </form>
                                            </div>

                                            {/* <div className="tab-pane fade" id="v-pills-payment" role="tabpanel" aria-labelledby="v-pills-payment-tab">
                                                <h4 className="card-heading p-b-20">User Info</h4>
                                                <form>
                                                    <div className="form-group ">
                                                        <div className="custom-control custom-radio m-b-20">
                                                            <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                                                            <label className="custom-control-label" htmlFor="customRadioInline1">
                                                                <img className="max-w-50 m-r-15" src="../assets/img/payment-icons/Visa@2x.png" alt="" />
                                                                <img className="max-w-50 m-r-15" src="../assets/img/payment-icons/MasterCard@2x.png" alt="" />
                                                                <img className="max-w-50 m-r-15" src="../assets/img/payment-icons/Discover@2x.png" alt="" />
                                                                <img className="max-w-50 m-r-15" src="../assets/img/payment-icons/AmericanExpress@2x.png" alt="" /></label>
                                                        </div>
                                                        <div className="custom-control custom-radio m-b-20">
                                                            <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" />
                                                            <label className="custom-control-label" htmlFor="customRadioInline2"><img className="max-w-50 m-r-15" src="../assets/img/payment-icons/Paypal@2x.png" alt="" /></label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputCard">Card Number</label>
                                                        <input type="text" className="form-control" id="inputCard" placeholder="•••• •••• •••• 1234" />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputExpiration">Expiration</label>
                                                            <input type="text" className="form-control" id="inputExpiration" placeholder="MM / YY" />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputCvv">CVV</label>
                                                            <input type="text" className="form-control" id="inputCvv" placeholder="123" />
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-rounded">Update Profile</button>
                                                </form>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default UserProfile;