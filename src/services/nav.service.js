import {Subject} from 'rxjs';

const subject = new Subject();
const subjectArrow = new Subject();
const darkText = new Subject();

export const navService = {
    toggleNav: bool => subject.next({active: bool}),
    toggleArrow: bool => subjectArrow.next({arrowActive: bool}),
    setDarkText: bool => darkText.next({darkText: bool}),
    getNav: () => subject.asObservable(),
    getArrow: () => subjectArrow.asObservable(),
    getDarkText: () => darkText.asObservable()
};
