import {Subject} from 'rxjs';

const subject = new Subject();
const subjectArrow = new Subject();

export const navService = {
    toggleNav: bool => subject.next({active: bool}),
    toggleArrow: bool => subjectArrow.next({arrowActive: bool}),
    getNav: () => subject.asObservable(),
    getArrow: () => subjectArrow.asObservable()
};
