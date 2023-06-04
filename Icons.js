import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faArrows, faDotCircle, faCog } from '@fortawesome/free-solid-svg-icons';
// import {} from '@fortawesome/free-regular-svg-icons';

library.add(
    faArrows,
    faDotCircle,
    faCog
)

export const StartPoint =  icon({ prefix: "fas", iconName: "arrows" }).html   
export const Target =  icon({ prefix: "fas", iconName: "dot-circle" }).html
export const Wheel =  icon({ prefix: "fas", iconName: "cog" }).html