import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Provider, useSelector,useDispatch } from 'react-redux';
import store from './Files/redux/Store';









const Home = lazy(() => import('./Files/Main_Components/Home'));
const About = lazy(() => import('./Files/Components/About'));
const Service = lazy(() => import('./Files/Service/Service'));
const ServiceD = lazy(() => import('./Files/Service/ServiceD'));
const Case = lazy(() => import('./Files/Case/Case'));
const CaseD = lazy(() => import('./Files/Case/CaseD'));
const Gallery = lazy(() => import('./Files/Components/Gallery'));
const List = lazy(() => import('./Files/Components/List'));
const Team = lazy(() => import('./Files/Components/Team'));
const Map = lazy(() => import('./Files/Components/Map'));
const Contact = lazy(() => import('./Files/Components/Contact'));
const Gimg = lazy(() => import('./Files/Components/Gimg'));
const Step = lazy(() => import('./Files/Components/Step'));
const Order = lazy(() => import('./Files/Main_Components/Order'));
const PDetails = lazy(() => import('./Files/Components/PDetails'));
const Checkout = lazy(() => import('./Files/Main_Components/Checkout'));
const Header = lazy(() => import('./Files/Components/Header'));
const Footer = lazy(() => import('./Files/Components/Footer'));
const Loader = lazy(() => import('./Files/Smallcompo/Loader'));
const Success = lazy(() => import('./Files/Smallcompo/Sucess'));
const Cancel = lazy(() => import('./Files/Smallcompo/Cancel'));
const Profile = lazy(() => import('./Files/Main_Components/Profile'));
const Plan = lazy(() => import('./Files/Smallcompo/Plan'));
const PaymentType = lazy(() => import('./Files/Main_Components/PaymentType'));
const Errorpage = lazy(() => import('./Files/Components/Errorpage'));



function App() {
 
  const userLogin = useSelector((state) => state.log.log);
  
  const rendom = useSelector((state) => state.Rendomurl.Rendomurl);
  

  const [load, setLoad] = useState(false);
  const [frendomurl, setFrendomurl] = useState("")
  const dispetch=useDispatch();
  // Uncomment this block if you need to show the loader initially
  useEffect(() => {
    rendom.forEach((val) => {
      setFrendomurl(val.rendomurl);
    });
  }, [rendom]);

  // useEffect(() => {
  //   setLoad(true);
  //   setTimeout(() => {
  //     setLoad(false);
  //   }, 2000);
  // }, []);
 

  

  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<Loader/>}>
          <BrowserRouter>
            <Routes>
              {load ? (
                <Route path="/" element={<Loader />} />
              ) : (
                <>
                  <Route exact path="/" element={<Home />} />
                  {userLogin.length === 0 || userLogin === undefined ? (
                    <Route path="/" element={<Home />} />
                  ) : (
                    <Route path="/" element={<Home />} />
                  )}
                  <Route path="Home" element={<Home />} />
                  <Route path="About" element={<About />} />
                  <Route path="Service" element={<Service />} />
                  <Route path="ServiceD" element={<ServiceD />} />
                  <Route path="Case" element={<Case />} />
                  <Route path="CaseD" element={<CaseD/>} />
                  <Route path="Gallery" element={<Gallery />} />
                  <Route path="List" element={<List />} />
                  <Route path="Team" element={<Team />} />
                  <Route path="Map" element={<Map />} />
                  <Route path="Contact" element={<Contact />} />
                  <Route path="Gimg" element={<Gimg />} />
                  <Route path="Step" element={<Step />} />
                  <Route path="Order" element={<Order />} />
                  {/* <Route path="PDetails/:ids" element={<PDetails />} /> */}
                  <Route path="PDetails" element={<PDetails />} />
                  <Route path="Checkout" element={<Checkout />} />
                  <Route path="Header" element={<Header />} />
                  <Route path="Footer" element={<Footer />} />
                  <Route path="Suc/:randomUrl" element={<Success />} />
                  <Route path="cancel/:randomUrl" element={<Cancel />} />
                  <Route path="Plan" element={<Plan />} />
                  <Route path="*" element={<Errorpage/>} />
                

                  {userLogin.length === 0 ? (
                    <Route path="Profile" element={<Home />} />
                  ) : (
                    <Route path="Profile" element={<Profile />} />
                  )}
                  <Route path="Profile" element={<Profile />} />
                  <Route path="PaymentType" element={<PaymentType />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
