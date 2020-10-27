import {Subject} from 'rxjs';

const subject = new Subject();
const subjectArrow = new Subject();
const darkText = new Subject();
const activeIndex = new Subject();
const projectsLoaded = new Subject();
const projectsLength = new Subject();

export const navService = {
    toggleNav: bool => subject.next({active: bool}),
    toggleArrow: bool => subjectArrow.next({arrowActive: bool}),
    getNav: () => subject.asObservable(),
    getArrow: () => subjectArrow.asObservable(),
    setDarkText: bool => darkText.next({darkText: bool}),
    getDarkText: () => darkText.asObservable(),
    setActiveIndex: n => activeIndex.next({activeIndex: n}),
    getActiveIndex: () => activeIndex.asObservable(),
    setProjectsLoaded: n => projectsLoaded.next({projectsLoaded: n}),
    getProjectsLoaded: () => projectsLoaded.asObservable(),
    setProjectsLength: n => projectsLength.next({projectsLength: n}),
    getProjectsLength: () => projectsLength.asObservable(),
};
