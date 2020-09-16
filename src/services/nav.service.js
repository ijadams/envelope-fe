import { Subject } from 'rxjs';

const subject = new Subject();

export const navService = {
    toggleNav: bool => subject.next({ active: bool }),
    getNav: () => subject.asObservable()
};
