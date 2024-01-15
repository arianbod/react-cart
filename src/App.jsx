// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalContext } from './Context';

function App() {
	const { isLoading } = useGlobalContext();

	return (
		<main>
			{isLoading && <div className='loading'></div>}
			{!isLoading && (
				<>
					<Navbar />
					<CartContainer />
				</>
			)}
		</main>
	);
}

export default App;
