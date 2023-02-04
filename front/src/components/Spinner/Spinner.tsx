import './Spinner.scss'
import {Rings} from 'react-loader-spinner'

export const Spinner = () => {
	return (
    <div className="spinner">
      <Rings color="#63edffb3" />
    </div>
  );
}