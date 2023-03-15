import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVolumeHigh,
    faWheelchair,
    faEarListen,
    faHandsAslInterpreting,
    faRestroom,
    faParking,
    faElevator
} from '@fortawesome/free-solid-svg-icons';

const featuresMap = {
    'Text-to-speech software': faVolumeHigh,
    'Wheelchair accessible': faWheelchair,
    'Assistive listening system': faEarListen,
    'Sign language': faHandsAslInterpreting,
    'Accessible restroom': faRestroom,
    'Accessible parking': faParking,
    'Elevator access': faElevator
};

const AccessibleFeatures = (props) => {

    const features = props.features;

    return (
        <ul role="list" className="mt-6 flex justify-center gap-x-6">
            {features.map((feature) => (
                <li>
                    <FontAwesomeIcon icon={featuresMap[feature.feature_name]} size="xl" />
                </li>
            ))}
        </ul>
    );
};

export default AccessibleFeatures;