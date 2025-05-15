import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUp, faCartShopping, faSquarePollVertical, faTrophy} from '@fortawesome/free-solid-svg-icons';

function BottomNav({ selected, onSelect }) {
    return (
        <div className="bottom-nav">
            <button
                className={selected === 'upgrades' ? 'active' : ''}
                onClick={() => onSelect('upgrades')}
            >
                <FontAwesomeIcon icon={faCircleUp} />
            </button>
            <button
                className={selected === 'achievement' ? 'active' : ''}
                onClick={() => onSelect('achievement')}
            >
                <FontAwesomeIcon icon={faTrophy} />
            </button>
            <button
                className={selected === 'stats' ? 'active' : ''}
                onClick={() => onSelect('stats')}
            >
                <FontAwesomeIcon icon={faSquarePollVertical} />
            </button>
        </div>
    );
}

export default BottomNav;
