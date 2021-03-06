// The primary JavaScript file that represents the main frontend part of the web application
// Integrates together the various components of the application: the homepage, the navbar, the login page, the signout page, etc.
// Makes use of react router to route to different components

import './App.css';
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import Navbar from './components/Navbar.js'
import LoginPage from './templates/LoginPage'; 
import RegisterPage from './templates/RegisterPage'; 
import UserProfile from './templates/UserProfile';
import UserBookings from './templates/UserBookings';
import DisplayHotels from './templates/ViewHotels'
import QuickBook from './templates/QuickBook'
import BookingConfirmation from './templates/BookConf'; 
import UserTracker from './templates/UserTracker'; 
import Signout from './templates/Signout'; 
import ViewHotel from './components/ViewHotel'; 
import SearchResults from './components/search'; 

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path='/search/q=:search_query' component={SearchResults}/>

					<Route path='/viewhotels/loc=:location' component={DisplayHotels}/>
					<Route path='/hotel/:id' component={ViewHotel}/>
						
					<Route path='/signout'>
						<Signout/>	
					</Route> 
					<Route path='/bookingconfirmation'>
						<BookingConfirmation/>
					</Route>
					<Route path='/usertracker'>
						<Navbar/>
						<UserTracker/>
					</Route>
					<Route path='/quickbook/:id' component={QuickBook}/>
					<Route path='/login'>
						<Navbar/>
						<LoginPage/>
					</Route>
					<Route path='/register'> 
						<Navbar/>
						<RegisterPage/>
					</Route>
					<Route path='/userprofile'>
						<Navbar/>
						<UserProfile/>
					</Route>
					<Route path='/userbookings'>
						<Navbar/>
						<UserBookings/>
					</Route>
					
					<Route path='/'> 
						<Navbar/>
						<Homepage/>
					</Route>

				</Switch>
			</div>
		</Router>
  	);
}

export default App;
