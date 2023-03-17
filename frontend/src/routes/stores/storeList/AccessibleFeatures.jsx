import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVolumeHigh,
    faWheelchair,
    faEarListen,
    faHandsAslInterpreting,
    faRestroom,
    faParking,
    faElevator,
    faBraille
} from '@fortawesome/free-solid-svg-icons';

const featuresMap = {
    'Text-to-speech software': faVolumeHigh,
    'Wheelchair accessible': faWheelchair,
    'Assistive listening system': faEarListen,
    'Sign language': faHandsAslInterpreting,
    'Accessible restroom': faRestroom,
    'Accessible parking': faParking,
    'Elevator access': faElevator,
    'Braille': faBraille
};

const AccessibleFeatures = (props) => {

    const features = props.features;

    return (
        <ul role="list" className="mt-6 flex justify-center gap-x-6" aria-description="List of accessibility features for this store">
            {features.map((feature) => (
                <li key={feature.feature_name}>
                    <div className="group relative flex justify-center">
                        <FontAwesomeIcon icon={featuresMap[feature.feature_name]} size="xl" aria-label={feature.feature_name} />
                        <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{feature.feature_name}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AccessibleFeatures;